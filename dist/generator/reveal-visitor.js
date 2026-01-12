import { Diapo } from "../model/diapo.js";
import { Slide } from "../model/slide.js";
import { TextComponent } from "../model/components/text-component.js";
import { marked } from "marked";
import { Direction } from "../model/enums/direction.enum.js";
import { Size } from "../model/enums/size.enum.js";
export class RevealVisitor {
    devServerMode;
    constructor(devServerMode = false) {
        this.devServerMode = devServerMode;
    }
    annotationsEnabled = false;
    slidesHtml = [];
    currentSlideContent = [];
    isNestedSlide = false;
    getResult() {
        return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reveal DSL</title>
  <link rel="stylesheet" href="./public/reveal/dist/reveal.css">
  <link rel="stylesheet" href="./public/reveal/plugin/highlight/monokai.css">
  <script src="./public/reveal/dist/reveal.js"></script>
  <script src="./public/reveal/plugin/highlight/highlight.js"></script>
  <script src="./public/mathjax/tex-chtml.js"></script>
  

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/plugin/highlight/monokai.css">
  ${this.annotationsEnabled ?
            `<!-- Font awesome is required for the chalkboard plugin -->
        <script src="./public/fontawesome/js/all.min.js"></script>
        <link rel="stylesheet" href="./public/fontawesome/css/all.min.css">
        <!-- Custom controls plugin is used to for opening and closing annotation modes. -->
        <script src="./public/reveal/plugin/customcontrols/plugin.js"></script>
        <link rel="stylesheet" href="./public/reveal/plugin/customcontrols/style.css">
        <!-- Chalkboard plugin -->
        <script src="./public/reveal/plugin/chalkboard/plugin.js"></script>
        <link rel="stylesheet" href="./public/reveal/plugin/chalkboard/style.css">` : ''}

  
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
      gap: 10px;
    }
  </style>

</head>
<body>

<div class="reveal">
  <div class="slides">
    ${this.slidesHtml.join("\n")}
  </div>
</div>

<script>
  Reveal.initialize({
      ${this.annotationsEnabled ?
            `customcontrols: {
        controls: [
          { icon: '<i class="fa fa-pen-square"></i>',
            title: 'Tableau à craie (B)',
            action: 'RevealChalkboard.toggleChalkboard();'
          },
          { icon: '<i class="fa fa-pen"></i>',
            title: 'Prendre des notes (C)',
            action: 'RevealChalkboard.toggleNotesCanvas();'
          }
        ]
      },
      chalkboard: {},` : ''}
      plugins: [ 
          RevealHighlight,
          ${this.annotationsEnabled ? `RevealChalkboard, RevealCustomControls` : ""} 
      ]
    });
</script>
${(this.devServerMode) ? '<script src="./dev-server-reload.js"></script>' : ''}

</body>
</html>
    `;
    }
    normalizeMultiline(text) {
        // enlever les """ au début et à la fin
        let result = text.replace(/^"""/, '').replace(/"""$/, '');
        const lines = result.split('\n');
        if (lines.length === 0)
            return text;
        // enlever lignes vides début / fin
        while (lines.length && lines[0].trim() === '')
            lines.shift();
        while (lines.length && lines[lines.length - 1].trim() === '')
            lines.pop();
        // détecter indentation minimale
        const indent = Math.min(...lines
            .filter(l => l.trim().length > 0)
            .map(l => l.match(/^ */)?.[0].length ?? 0));
        return lines.map(l => l.slice(indent)).join('\n');
    }
    visitDiapo(diapo) {
        this.annotationsEnabled = diapo.annotationsEnabled ?? false;
        for (const slide of diapo.slides) {
            this.isNestedSlide = false;
            slide.accept(this);
        }
    }
    visitSlide(slide) {
        this.currentSlideContent = [];
        for (const component of slide.components) {
            component.accept(this);
        }
        if (!this.isNestedSlide) {
            this.slidesHtml.push(`<section>
                ${this.currentSlideContent.join("\n")}
              </section>`);
        }
    }
    visitNestedSlide(nestedSlide) {
        this.isNestedSlide = true;
        let nestedSlidesContent = [];
        for (const subslide of nestedSlide.subSlides) {
            subslide.accept(this);
            const subSlideContent = `<section>
            ${this.currentSlideContent.join("\n")}
          </section>`;
            nestedSlidesContent.push(subSlideContent);
        }
        this.slidesHtml.push(`<section>
          ${nestedSlidesContent.join("\n")}
        </section>`);
    }
    async visitTextComponent(textComponent) {
        const normalized = this.normalizeMultiline(textComponent.textContent);
        const html = marked.parse(normalized);
        this.currentSlideContent.push(html);
    }
    visitImageComponent(imageComponent) {
        const content = `<img src="${imageComponent.src}" alt="${imageComponent.alt ? imageComponent.alt : ""}">`;
        this.currentSlideContent.push(content);
    }
    visitVideoComponent(videoComponent) {
        const content = `<video controls ${videoComponent.autoPlay ? "data-autoplay" : ""} src="${videoComponent.src}"></video>`;
        this.currentSlideContent.push(content);
    }
    visitFrameComponent(FrameComponent) {
        const frameClass = FrameComponent.direction === Direction.VERTICAL ? "vertical-frame" : "horizontal-frame";
        let frameContent = [];
        for (const component of FrameComponent.components) {
            component.accept(this);
            frameContent.push(this.currentSlideContent.pop());
        }
        this.currentSlideContent.push(`
      <div class="${frameClass}">
        ${frameContent.join("\n")}
      </div>
    `);
    }
    visitTemplate() { }
    visitCodeComponent(codeComponent) {
        this.currentSlideContent.push(`
<pre><code class="language-${codeComponent.language}">
${codeComponent.content}
</code></pre>
`);
    }
    visitReplaceAction(replaceAction) { }
    visitDisplayAction(displayAction) { }
    visitCodeHighlightAction(codeHighlightAction) { }
    visitLatexComponent(latexComponent) {
        const formula = this.normalizeMultiline(latexComponent.formula);
        this.currentSlideContent.push(`
    <div>
      \\[
        ${formula}
      \\]
    </div>
  `);
    }
    visitTitleComponent(titleComponent) {
        let titleNumber = "1"; // Size.DEFAULT
        switch (titleComponent.size) {
            case Size.XL:
                titleNumber = "1";
                break;
            case Size.L:
                titleNumber = "2";
                break;
            case Size.M:
                titleNumber = "3";
                break;
            case Size.S:
                titleNumber = "4";
                break;
            case Size.XS:
                titleNumber = "5";
        }
        this.currentSlideContent.push(`<h${titleNumber}>${titleComponent.text}</h${titleNumber}>`);
    }
}
//# sourceMappingURL=reveal-visitor.js.map