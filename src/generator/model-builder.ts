import {Diapo} from "../model/diapo.js";
import {Slide} from "../model/slide.js";
import {TextComponent} from "../model/components/text-component.js";
import {Size} from "../model/enums/size.enum.js";
import {VideoComponent} from "../model/components/video-component.js";
import {ImageComponent} from "../model/components/image-component.js";
import { LatexComponent } from "../model/components/latex-component.js";
import type {Component} from "../model/components/component.abstract.js";
import {CodeComponent} from "../model/components/code-component.js";
import {NestedSlide} from "../model/nestedSlide.js";
import {FrameComponent} from "../model/components/frame-component.js";
import {Direction} from "../model/enums/direction.enum.js";
import {TitleComponent} from "../model/components/title-component.js";
import {DisplayAction} from "../model/actions/display-action.js";
import type {Action} from "../model/actions/action.abstract.js";
import {HideAction} from "../model/actions/hide-action.js";
import {HighlightAction} from "../model/actions/highlight-action.js";
import {ReplaceAction} from "../model/actions/replace-action.js";
import {PlotComponent} from "../model/components/plot-component.js";

type ComponentBuilder = (ast:any) => Component;

const COMPONENT_BUILDERS : Record<string, ComponentBuilder> = {
  TextComponent: (ast) => {
    return new TextComponent(ast.value, sizeConverter(ast.size), buildActions(ast.actionBlock));
  },
  PlotComponent: (ast) => { return buildPlotComponent(ast)},
  TitleComponent: (ast) => new TitleComponent(ast.text, sizeConverter(ast.size), buildActions(ast.actionBlock)),
  VideoComponent: (ast) => new VideoComponent(ast.src, ast.autoPlay,sizeConverter(ast.size), buildActions(ast.actionBlock)),
  ImageComponent: (ast) => new ImageComponent(ast.src,sizeConverter(ast.size), buildActions(ast.actionBlock), ast.alt),
  CodeComponent: (ast) => new CodeComponent(dedent(ast.value), ast.language, sizeConverter(ast.size), buildActions(ast.actionBlock)),
  FrameComponent: (ast) => {
    const components = ast.components.map((c: any) => {
      const builder = COMPONENT_BUILDERS[c.$type];
      if (!builder) {
        throw new Error(`Unknown component type: ${c.$type}`);
      }
      return builder(c);
    });
    const direction = ast.direction === "horizontal" ? Direction.HORIZONTAL : Direction.VERTICAL;
    return new FrameComponent(components, direction,sizeConverter(ast.size), buildActions(ast.actionBlock));
  }
}


/**
 * Transforme l’AST Langium → modèle métier
 */
export function buildDiapo(diapoAst: any): Diapo {
  const slides = diapoAst.slides.map((abstractSlideAst: any) => {
    if(abstractSlideAst.$type === "Slide"){
      return buildSlide(abstractSlideAst);
    }
    return buildNestedSlide(abstractSlideAst)
  });
  return new Diapo(slides, undefined, diapoAst.annotationsEnabled ?? false);
}

function buildSlide(slideAst: any): Slide {
  const components = slideAst.components.map((c: any) => {
    const builder = COMPONENT_BUILDERS[c.$type];
    if (!builder) {
      throw new Error(`Unknown component type: ${c.$type}`);
    }
    return builder(c);
  });

  return new Slide(
      undefined as any, // transitionIn
      undefined as any, // transitionOut
      [],               // steps (actions)
      components        // components
  );
}

function buildNestedSlide(nestedSlideAst: any): NestedSlide {
  const subSlides = nestedSlideAst.subSlides.map((slideAst: any) => buildSlide(slideAst));

  return new NestedSlide(
      undefined as any, // transitionIn
      undefined as any, // transitionOut
      [],               // steps (actions)
      subSlides         // subSlides
  )
}

function buildActions(actionBlockAst: any): Action[] {
  if (!actionBlockAst) return [];

  return actionBlockAst.actions.map((a: any) => {
    switch (a.$type) {
      case "DisplayAction":
        return new DisplayAction(a.step ?? 1);
      case "HideAction":
        console.log("a.step : ", a.step);
        let h = new HideAction(a.step ?? 1);
        console.log("h",h);
        return h;
      case "HighlightAction": {
        const start = a.range.start;
        const end = a.range.end ?? start;
        return new HighlightAction(
            a.step ?? 1,
            start,
            end
        );
      }
      case "ReplaceAction":
        return new ReplaceAction(a.step ?? 1, a.update )

      default:
        throw new Error(`Unknown action: ${a.$type}`);
    }
  });
}

function buildPlotComponent(ast : any ){
  const functions: string[] = [];
  let domain: [number, number] | [any, any] = [-10, 10];
  let samples = 300;
  let xUnit = "";
  let yUnit = "";

  for (const prop of ast.properties ?? []) {
    switch (prop.$type) {
      case "PlotFunction":
        functions.push(prop.value);
        break;

      case "PlotDomain":
        domain = [prop.min, prop.max];
        break;

      case "PlotSamples":
        samples = prop.value;
        break;

      case "PlotXUnit":
        xUnit = prop.value;
        break;

      case "PlotYUnit":
        yUnit = prop.value;
        break;
    }
  }
  return new PlotComponent(
      functions,
      domain,
      samples,
      xUnit,
      yUnit,
      sizeConverter(ast.size),
      buildActions(ast.actionBlock)
  );
}

function dedent(text: string): string {
  const lines = text.replace(/\t/g, "  ").split("\n");
  // enlever lignes vides début / fin
  while (lines.length && lines[0]!.trim() === "") lines.shift();
  while (lines.length && lines[lines.length - 1]!.trim() === "") lines.pop();

  const indent = Math.min(
      ...lines
          .filter(l => l.trim())
          .map(l => l.match(/^ */)![0].length)
  );

  return lines.map(l => l.slice(indent)).join("\n");
}

function sizeConverter(size : string | undefined) : Size{
  if(size){
    switch (size) {
      case "XS":
        return Size.XS;
      case "S":
        return Size.S;
      case "M":
        return Size.M;
      case "L":
        return Size.L;
      case "XL":
        return Size.XL
    }
  }
  return Size.DEFAULT;
}