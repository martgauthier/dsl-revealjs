
import type { Visitor } from "../model/visitor.js";
import { Diapo } from "../model/diapo.js";
import { Slide } from "../model/slide.js";
import { TextComponent } from "../model/components/text-component.js";
import { HighlightAction } from "../model/actions/highlight-action.js";
import { HideAction } from "../model/actions/hide-action.js";
import type { CodeComponent } from "../model/components/code-component.js";
import { marked } from "marked";
import type {VideoComponent} from "../model/components/video-component.js";
import type {ImageComponent} from "../model/components/image-component.js";
import type {NestedSlide} from "../model/nestedSlide.js";
import type { FrameComponent } from "../model/components/frame-component.js";
import { Direction } from "../model/enums/direction.enum.js";
import type {Action} from "../model/actions/action.abstract.js";
import {DisplayAction} from "../model/actions/display-action.js";

export class RevealVisitor implements Visitor {


  private slidesHtml: string[] = [];
  private currentSlideContent: string[] = [];
  private isNestedSlide: boolean = false;

  getResult(): string {
    return `
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reveal DSL</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/highlight/monokai.css">
    
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    
    
    <style>
        :root {
            --r-block-margin: 20px;
            --r-code-font: monospace;
        }
        .reveal ul {
          display: inline-block;
          text-align: left;
        }
       
        .vertical-frame {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
    
        .horizontal-frame {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-items: center;
          gap: 10px;
        }
        
        .reveal pre {
            display: block;
            position: relative;
            width: 90%;
            margin: var(--r-block-margin) auto;
            text-align: left;
            font-size: 1em;
            font-family: var(--r-code-font);
            line-height: 1.2em;
            word-wrap: break-word;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
        }

        .reveal code {
            font-family: var(--r-code-font);
            text-transform: none;
            tab-size: 2;
        }

        .reveal pre code {
            display: block;
            padding: 5px;
            overflow: auto;
            max-height: 400px;
            word-wrap: normal;
        }

        .reveal .code-wrapper {
            white-space: normal;
        }

        .reveal .code-wrapper code {
            white-space: pre;
        }
    </style>
</head>
<body>

<div class="reveal">
  <div class="slides">
    ${this.slidesHtml.join("\n")}
  </div>
</div>

<!-- Reveal JS -->
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/highlight/highlight.js"></script>

<script>
    Reveal.initialize({
        hash: true,
        slideNumber: true,
        plugins: [ RevealHighlight ]
    });
</script>
</body>
</html>
    `;
  }


  visitDiapo(diapo: Diapo): void {
    for (const slide of diapo.slides) {
      this.isNestedSlide = false;
      slide.accept(this);
    }
  }

  visitSlide(slide: Slide): void {
    this.currentSlideContent = [];

    for (const component of slide.components) {
      component.accept(this);
    }

    if(!this.isNestedSlide){
          this.slidesHtml.push(
              `<section>
                ${this.currentSlideContent.join("\n")}
              </section>`
          );
    }

  }

  visitNestedSlide(nestedSlide: NestedSlide) {
    this.isNestedSlide = true;
    let nestedSlidesContent = [];

    for (const subslide of nestedSlide.subSlides) {
      subslide.accept(this);
      const subSlideContent =
          `<section>
            ${this.currentSlideContent.join("\n")}
          </section>`;
      nestedSlidesContent.push(subSlideContent);
    }
    this.slidesHtml.push(
        `<section>
          ${nestedSlidesContent.join("\n")}
        </section>`);
  }

  async visitTextComponent(textComponent: TextComponent): Promise<void> {
    const html = marked.parse(textComponent.textContent) as string;

    const fragments = this.renderFragments(
        html,
        textComponent.actions
    );

    this.currentSlideContent.push(fragments);
  }

  visitImageComponent(imageComponent: ImageComponent): void {
    const content = `
    <img 
      src="${imageComponent.src}" 
      alt="${imageComponent.alt ?? ""}"
    >
  `;

    const fragments = this.renderFragments(
        content,
        imageComponent.actions
    );

    this.currentSlideContent.push(fragments);
  }

  visitVideoComponent(videoComponent: VideoComponent): void {
    const content = `
    <video 
      controls 
      ${videoComponent.autoPlay ? "data-autoplay" : ""}
      src="${videoComponent.src}">
    </video>
  `;

    const fragments = this.renderFragments(
        content,
        videoComponent.actions
    );

    this.currentSlideContent.push(fragments);
  }
  visitFrameComponent(frameComponent: FrameComponent): void {
    const frameClass =
        frameComponent.direction === Direction.VERTICAL
            ? "vertical-frame"
            : "horizontal-frame";

    const frameContent: string[] = [];

    for (const component of frameComponent.components) {
      component.accept(this);
      frameContent.push(this.currentSlideContent.pop()!);
    }

    const content = `
    <div class="${frameClass}">
      ${frameContent.join("\n")}
    </div>
  `;

    const fragments = this.renderFragments(
        content,
        frameComponent.actions
    );
    this.currentSlideContent.push(fragments);
  }



  visitTemplate(): void { }
  visitCodeComponent(codeComponent: CodeComponent): void {

    const highlights = codeComponent.actions
        .filter(a => a instanceof HighlightAction)
        .sort((a, b) => a.step - b.step) as HighlightAction[];

    let highlights2 = highlights;
    const dataLineNumbers = highlights.map(h => {
      if (h.startLine === h.endLine) {
        return `${h.startLine}`;
      }
      return `${h.startLine}-${h.endLine}`;
    });

    const dataLineNumbersJoined =
        dataLineNumbers.length > 0
            ? `data-line-numbers="|${dataLineNumbers.join("|")}"`
            : "";
    console.log("highlights2 : ", highlights2);
    const dataFragmentIndexes = highlights2.map(h => {
      return h.step-1;
    });
    const dataFragmentIndexesJoined = dataFragmentIndexes.length > 0
        ? `data-fragment-index="${dataFragmentIndexes.join("|")}"`
        : "";
    console.log("dataFrag : ", dataFragmentIndexes);
    const content = `
<pre>
  <code class="language-${codeComponent.language}"
        data-trim
        ${dataLineNumbersJoined} ${dataFragmentIndexesJoined}>
${codeComponent.content}
  </code>
</pre>
`;

    const display = codeComponent.actions.find(a => a instanceof DisplayAction);
    const hide = codeComponent.actions.find(a => a instanceof HideAction);

    this.currentSlideContent.push(
        this.renderFragments(
            content,
            [display, hide].filter(Boolean) as Action[]
        )
    );
  }


  private renderFragments(
      content: string,
      actions: Action[]
  ): string {
    const display = actions.find(a => a instanceof DisplayAction);
    const hide = actions.find(a => a instanceof HideAction);

    if (!display && !hide) {
      return content;
    }

    if (display && !hide) {
      return `
      <div class="fragment fade-in"
           data-fragment-index="${display.step - 1}">
        ${content}
      </div>
    `;
    }

    if (!display && hide) {
      return `
      <span class="fragment fade-out"
            data-fragment-index="${hide.step - 1}">
        ${content}
      </span>
    `;
    }

    if (display && hide) {
      const displayIndex = display.step - 1;
      const hideIndex = Math.max(
          hide.step - 1,
          displayIndex + 1
      );

      return `
      <div class="fragment fade-in"
           data-fragment-index="${displayIndex}">
        <span class="fragment fade-out"
              data-fragment-index="${hideIndex}">
          ${content}
        </span>
      </div>
    `;
    }

    return content;
  }

  visitCodeHighlightAction(codeHighlightAction: HighlightAction): void {}
  visitDisplayAction(displayAction: DisplayAction): void {}
  visitHideAction(hideAction: HideAction): void {}

}
