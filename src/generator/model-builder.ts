import { Diapo } from "../model/diapo.js";
import { Slide } from "../model/slide.js";
import { TextComponent } from "../model/components/text-component.js";
import { Size } from "../model/enums/size.enum.js";
import {VideoComponent} from "../model/components/video-component.js";
import {ImageComponent} from "../model/components/image-component.js";
import { LatexComponent } from "../model/components/latex-component.js";

/**
 * Transforme l’AST Langium → modèle métier
 */
export function buildDiapo(diapoAst: any): Diapo {
  const slides = diapoAst.slides.map((slideAst: any) => buildSlide(slideAst));
  return new Diapo(slides);
}

function buildSlide(slideAst: any): Slide {
  const components = slideAst.components.map((c: any) => {
    if (c.$type === "TextComponent") {
      // Langium donne la string avec les guillemets → on les enlève
      const text = c.value;
      return new TextComponent(text, Size.DEFAULT);
    }else if (c.$type === "VideoComponent") {
      const src = c.src ;
      const autoPlay = c.autoPlay;
      return new VideoComponent(src, autoPlay, Size.DEFAULT);
    }else if (c.$type === "ImageComponent"){
      const src = c.src;
      const alt = c.alt;
      return new ImageComponent(src, alt, Size.DEFAULT);
    } else if (c.$type === "LatexComponent") {
      const formula = c.formula;
      return new LatexComponent(formula, Size.DEFAULT);
    }
    throw new Error("Unknown component type: " + c.$type);
  });

  return new Slide(
    undefined as any, // transitionIn 
    undefined as any, // transitionOut 
    components, // components
    []                // steps (actions)
  );
}
