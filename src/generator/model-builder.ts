import { Diapo } from "../model/diapo.js";
import { Slide } from "../model/slide.js";
import { TextComponent } from "../model/components/text-component.js";
import { Size } from "../model/enums/size.enum.js";
import {CodeComponent} from "../model/components/code-component.js";

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
    }
    else if (c.$type === "CodeComponent"){
      return new CodeComponent(dedent(c.value), c.language, Size.DEFAULT);
    }
  });

  return new Slide(
    undefined as any, // transitionIn 
    undefined as any, // transitionOut 
    components, // components
    []                // steps (actions)
  );
}

function dedent(text: string): string {
  const lines = text.replace(/\t/g, "  ").split("\n");
  console.log("lines", lines);

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

