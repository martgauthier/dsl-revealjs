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

type ComponentBuilder = (ast:any) => Component;

const COMPONENT_BUILDERS : Record<string, ComponentBuilder> = {
  TextComponent: (ast) => {
    return new TextComponent(ast.value, sizeConverter(ast.size));
  },
  TitleComponent: (ast) => new TitleComponent(ast.text, sizeConverter(ast.size)),
  VideoComponent: (ast) => new VideoComponent(ast.src, ast.autoPlay, sizeConverter(ast.size)),
  ImageComponent: (ast) => new ImageComponent(ast.src, ast.alt, sizeConverter(ast.size)),
  CodeComponent: (ast) => new CodeComponent(dedent(ast.value), ast.language, sizeConverter(ast.size)),
  FrameComponent: (ast) => {
    const components = ast.components.map((c: any) => {
      const builder = COMPONENT_BUILDERS[c.$type];
      if (!builder) {
        throw new Error(`Unknown component type: ${c.$type}`);
      }
      return builder(c);
    });
    const direction = ast.direction === "horizontal" ? Direction.HORIZONTAL : Direction.VERTICAL;
    return new FrameComponent(components, direction, sizeConverter(ast.size));
  },
  LatexComponent: (ast) => new LatexComponent(ast.formula, sizeConverter(ast.size))
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