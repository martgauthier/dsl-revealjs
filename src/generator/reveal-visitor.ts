
import type { Visitor } from "../model/visitor.js";
import { Diapo } from "../model/diapo.js";
import { Slide } from "../model/slide.js";
import { TextComponent } from "../model/components/text-component.js";
import type { CodeHighlightAction } from "../model/actions/codehighlight-action.js";
import type { DisplayAction } from "../model/actions/display-action.js";
import type { ReplaceAction } from "../model/actions/replace-action.js";
import type { CodeComponent } from "../model/components/code-component.js";

export class RevealVisitor implements Visitor {
  

  private slidesHtml: string[] = [];

  getResult(): string {
    return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reveal DSL</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css">
  <script src="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js"></script>
</head>
<body>

<div class="reveal">
  <div class="slides">
    ${this.slidesHtml.join("\n")}
  </div>
</div>

<script src="reveal.js/dist/reveal.js"></script>
<script>
  Reveal.initialize();
</script>

</body>
</html>
    `;
  }

  visitDiapo(diapo: Diapo): void {
    for (const slide of diapo.slides) {
      slide.accept(this);
    }
  }

  visitSlide(slide: Slide): void {
    const content: string[] = [];

    for (const component of slide.components) {
      if (component instanceof TextComponent) {
        content.push(`<p>${component.text}</p>`);
      }
    }

    this.slidesHtml.push(`
<section>
  ${content.join("\n")}
</section>
    `);
  }

  // --- Non utilisés en V0 ---
  visitTextComponent(): void { }
  visitImageComponent(): void { }
  visitVideoComponent(): void { }
  visitFrameComponent(): void { }
  visitTemplate(): void { }
  visitCodeComponent(codeComponent: CodeComponent): void {}
  visitReplaceAction(replaceAction: ReplaceAction): void {}
  visitDisplayAction(displayAction: DisplayAction): void {}
  visitCodeHighlightAction(codeHighlightAction: CodeHighlightAction): void {}
  
}
