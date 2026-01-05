
import type { Visitor } from "../model/visitor.js";
import { Diapo } from "../model/diapo.js";
import { Slide } from "../model/slide.js";
import { TextComponent } from "../model/components/text-component.js";
import type { CodeHighlightAction } from "../model/actions/codehighlight-action.js";
import type { DisplayAction } from "../model/actions/display-action.js";
import type { ReplaceAction } from "../model/actions/replace-action.js";
import type { CodeComponent } from "../model/components/code-component.js";
import {marked} from "marked";

export class RevealVisitor implements Visitor {
  

  private slidesHtml: string[] = [];
  private currentSlideContent: string[] = [];

  getResult(): string {
    return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reveal DSL</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css">
  <script src="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/reveal.js/plugin/highlight/highlight.js"></script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/plugin/highlight/monokai.css">

  <style>
    .reveal ul {
      display: inline-block;
      text-align: left;
    }
    .reveal code{
        display: inline-block;  
        text-align: left;
        padding:10px;
    }
  </style>
</head>
<body>

<div class="reveal">
  <div class="slides">
    ${this.slidesHtml.join("\n")}
  </div>
</div>

<script src="reveal.js/dist/reveal.js"></script>
<script>
  Reveal.initialize({
      plugins: [ RevealHighlight ]
    });
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
    this.currentSlideContent = [];

    for (const component of slide.components) {
      component.accept(this);
    }

    this.slidesHtml.push(`
<section>
  ${this.currentSlideContent.join("\n")}
</section>
    `);
  }

  async visitTextComponent(textComponent: TextComponent): Promise<void> {
    const html = marked.parse(textComponent.textContent) as string;
    this.currentSlideContent.push(html);
  }
  visitImageComponent(): void { }
  visitVideoComponent(): void { }
  visitFrameComponent(): void { }
  visitTemplate(): void { }
  visitCodeComponent(codeComponent: CodeComponent): void {
    this.currentSlideContent.push(`
<pre><code class="language-${codeComponent.language}">
${codeComponent.content}
</code></pre>
`);
  }
  visitReplaceAction(replaceAction: ReplaceAction): void {}
  visitDisplayAction(displayAction: DisplayAction): void {}
  visitCodeHighlightAction(codeHighlightAction: CodeHighlightAction): void {}

}
