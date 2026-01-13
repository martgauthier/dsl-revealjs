import {Diapo} from "../model/diapo.js";
import {Slide} from "../model/slide.js";
import {TextComponent} from "../model/components/text-component.js";
import {Size} from "../model/enums/size.enum.js";
import {VideoComponent} from "../model/components/video-component.js";
import {ImageComponent} from "../model/components/image-component.js";
import type {Component} from "../model/components/component.abstract.js";
import {CodeComponent} from "../model/components/code-component.js";
import {NestedSlide} from "../model/nestedSlide.js";
import {FrameComponent} from "../model/components/frame-component.js";
import {Direction} from "../model/enums/direction.enum.js";
import {DisplayAction} from "../model/actions/display-action.js";
import type {Action} from "../model/actions/action.abstract.js";
import {HideAction} from "../model/actions/hide-action.js";
import {HighlightAction} from "../model/actions/highlight-action.js";
import {ReplaceAction} from "../model/actions/replace-action.js";

type ComponentBuilder = (ast:any) => Component;

const COMPONENT_BUILDERS : Record<string, ComponentBuilder> = {
  TextComponent: (ast) => {
    return new TextComponent(ast.value, Size.DEFAULT,buildActions(ast.actionBlock));
  },
  VideoComponent: (ast) => new VideoComponent(ast.src, ast.autoPlay, Size.DEFAULT,buildActions(ast.actionBlock)),
  ImageComponent: (ast) => new ImageComponent(ast.src, Size.DEFAULT,buildActions(ast.actionBlock),ast.alt),
  CodeComponent: (ast) => new CodeComponent(dedent(ast.value), ast.language, Size.DEFAULT,buildActions(ast.actionBlock)),
  FrameComponent: (ast) => {
    const components = ast.components.map((c: any) => {
      const builder = COMPONENT_BUILDERS[c.$type];
      if (!builder) {
        throw new Error(`Unknown component type: ${c.$type}`);
      }
      return builder(c);
    });
    const direction = ast.direction === "horizontal" ? Direction.HORIZONTAL : Direction.VERTICAL;
    return new FrameComponent(components, direction, Size.DEFAULT,buildActions(ast.actionBlock));
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
  return new Diapo(slides);
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

