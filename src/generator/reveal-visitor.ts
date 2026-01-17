
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
import {ReplaceAction} from "../model/actions/replace-action.js";
import type {LatexComponent} from "../model/components/latex-component.js";
import type { Template } from "../model/template.js";
import type {TitleComponent} from "../model/components/title-component.js";
import {Size} from "../model/enums/size.enum.js";
import type {PlotComponent} from "../model/components/plot-component.js";
import { Transition } from "../model/enums/transition.enum.js";


export class RevealVisitor implements Visitor {
  constructor(public devServerMode: boolean = false) {}

  diapoTitle : String = "";
  pageNumberingEnabled : boolean = false;
  private annotationsEnabled : boolean = false;
  private slidesHtml: string[] = [];
  private currentSlideContent: string[] = [];
  private isNestedSlide: boolean = false;
  hasTemplate: boolean = false;
  templateStyle: string = "";
  templateHeader: string = "";
  templateFooter: string = "";

  private textIdCounter = 0;
  private imageIdCounter = 0;
  private videoIdCounter = 0;


  getResult(): string {
    return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${this.diapoTitle}</title>
  <link rel="stylesheet" href="./public/reveal/dist/reveal.css">
  <link rel="stylesheet" href="./public/reveal/plugin/highlight/monokai.css">
  <script src="./public/reveal/dist/reveal.js"></script>
  <script src="./public/reveal/plugin/highlight/highlight.js"></script>
  <script src="./public/mathjax/tex-mml-chtml.js" defer></script>
  <script src="./public/mathjs/math.js"></script>
  
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
  .reveal {
    font-family: 'Inter', sans-serif;
  }
  
  :root {
        --r-block-margin: 20px;
        --r-code-font: monospace;
    }
        
    .reveal section>ul {
      display: inline-block;
      text-align: left;
    }
    
    .vertical-frame {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      gap: 5px;
    }

    .horizontal-frame {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      gap: 5px;
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

    .template-header, .template-footer {
      position: absolute;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      max-height: 15%;
    }

    .template-header {
      top: 0;
    }
    .template-footer {
      bottom: 0;
    }
    ${this.templateStyle}

    .XS-video { width: 5em; height: auto; }
    .S-video  { width: 10em; height: auto; }
    .M-video  { width: 20em; height: auto; }
    .L-video  { width: 30em; height: auto; }
    .XL-video { width: 35em; height: auto; }

    .XS-image { width: 5em; height: auto; }
    .S-image  { width: 10em; height: auto; }
    .M-image  { width: 20em; height: auto; }
    .L-image  { width: 30em; height: auto; }
    .XL-image { width: 35em; height: auto; }

    .XS-horizontal-frame { width: 25%; }
    .S-horizontal-frame  { width: 33%; }
    .M-horizontal-frame  { width: 50%; }
    .L-horizontal-frame  { width: 75%; }
    .XL-horizontal-frame { width: 100%; }

    .XS-vertical-frame { height: 25%; }
    .S-vertical-frame  { height: 33%; }
    .M-vertical-frame  { height: 50%; }
    .L-vertical-frame  { height: 75%; }
    .XL-vertical-frame { height: 100%; }

    .XS-code { max-width: 30em; font-size: 0.7em; }
    .S-code  { max-width: 45em; font-size: 0.8em; }
    .M-code  { max-width: 60em; font-size: 1em; }
    .L-code  { max-width: 75em; font-size: 1.1em; }
    .XL-code { max-width: 90em; font-size: 1.2em; }

    .XS-latex { font-size: 0.6em; }
    .S-latex  { font-size: 0.8em; }
    .M-latex  { font-size: 1em; }
    .L-latex  { font-size: 1.3em; }
    .XL-latex { font-size: 1.6em; }
    
    @font-face {
        font-family: 'Inter';
        src: url('./public/reveal/dist/theme/fonts/inter/Inter-Regular.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Inter';
        src: url('./public/reveal/dist/theme/fonts/inter/Inter-Italic.woff2') format('woff2');
        font-weight: 400;
        font-style: italic;
    }

    @font-face {
        font-family: 'Inter';
        src: url('./public/reveal/dist/theme/fonts/inter/Inter-Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Inter';
        src: url('./public/reveal/dist/theme/fonts/inter/Inter-BoldItalic.woff2') format('woff2');
        font-weight: 700;
        font-style: italic;
    }
  </style>

</head>
<body>

<div class="reveal">
  ${this.hasTemplate ? `<div class="template-header">${this.templateHeader}</div>` : ""}
  <div class="slides">
    ${this.slidesHtml.join("\n")}
  </div>
  ${this.hasTemplate ? `<div class="template-footer">${this.templateFooter}</div>` : ""}
</div>

<!-- Reveal JS -->
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/dist/reveal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5/plugin/highlight/highlight.js"></script>
<!-- Script pour les animations de replace : -->
<script>
const replaceMemory = new Map();

function rememberInitialState(el) {
  if (replaceMemory.has(el)) return;

  if (el.tagName === 'IMG') {
    replaceMemory.set(el, el.src);
  } else if (el.tagName === 'VIDEO') {
    const source = el.querySelector('source');
    replaceMemory.set(el, source ? source.src : null);
  } else {
    replaceMemory.set(el, el.textContent);
  }
}

function restoreInitialState(el) {
  if (!replaceMemory.has(el)) return;

  const value = replaceMemory.get(el);

  if (el.tagName === 'IMG') {
    el.src = value;
  } else if (el.tagName === 'VIDEO') {
    const source = el.querySelector('source');
    if (source && value) {
      source.src = value;
      el.load();
    }
  } else {
    el.textContent = value;
  }
}

Reveal.on('fragmentshown', e => {
  const f = e.fragment;
  if (f.dataset.replaceText) {
    const [selector, newText] = f.dataset.replaceText.split('|');
    const el = document.querySelector(selector);
    if (!el) return;

    rememberInitialState(el);
    el.textContent = newText;
  }
  if (f.dataset.replaceImage) {
    const [selector, newSrc] = f.dataset.replaceImage.split('|');
    const el = document.querySelector(selector);
    if (!el) return;

    rememberInitialState(el);
    el.src = newSrc;
  }
  if (f.dataset.replaceVideo) {
    const [selector, newSrc] = f.dataset.replaceVideo.split('|');
    const el = document.querySelector(selector);
    if (!el) return;

    const source = el.querySelector('source');
    if (!source) return;

    rememberInitialState(el);
    source.src = newSrc;
    el.load();
    el.play();
  }
});

Reveal.on('fragmenthidden', e => {
  const f = e.fragment;

  if (f.dataset.replaceText) {
    const [selector] = f.dataset.replaceText.split('|');
    const el = document.querySelector(selector);
    if (el) restoreInitialState(el);
  }

  if (f.dataset.replaceImage) {
    const [selector] = f.dataset.replaceImage.split('|');
    const el = document.querySelector(selector);
    if (el) restoreInitialState(el);
  }

  if (f.dataset.replaceVideo) {
    const [selector] = f.dataset.replaceVideo.split('|');
    const el = document.querySelector(selector);
    if (el) restoreInitialState(el);
  }
});
</script>

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
      ],
      hash: true,
      slideNumber: ${this.pageNumberingEnabled ? `true` : `false`}
    });
</script>
${(this.devServerMode) ? '<script src="./dev-server-reload.js"></script>' : ''}

</body>
</html>
    `;
  }

  normalizeMultiline(text: string): string {
    // enlever les """ au début et à la fin
    let result = text.replace(/^"""/, '').replace(/"""$/, '');

    const lines = result.split('\n');
    if (lines.length === 0) return text;

    // enlever lignes vides début / fin
    while (lines.length && lines[0]!.trim() === '') lines.shift();
    while (lines.length && lines[lines.length - 1]!.trim() === '') lines.pop();

    // détecter indentation minimale
    const indent = Math.min(
      ...lines
        .filter(l => l.trim().length > 0)
        .map(l => l.match(/^ */)?.[0].length ?? 0)
    );

    return lines.map(l => l.slice(indent)).join('\n');
  }

  visitDiapo(diapo: Diapo): void {
    if(diapo.template){
      diapo.template.accept(this);
    }
    this.diapoTitle = diapo.title;
    this.pageNumberingEnabled = diapo.pageNumbering;
    this.annotationsEnabled = diapo.annotationsEnabled ?? false;
    for (const slide of diapo.slides) {
      this.isNestedSlide = false;
      slide.accept(this);
    }
  }

  getTransitionAttrbute(slide: Slide): string {
    if (slide.transitionIn === Transition.DEFAULT &&
        slide.transitionOut === Transition.DEFAULT){
      return "";
    } 
    const inPart = slide.transitionIn !== Transition.DEFAULT ? `${slide.transitionIn}-in` : "default-in";
    const outPart = slide.transitionOut !== Transition.DEFAULT ? `${slide.transitionOut}-out` : "default-out";
    return ` data-transition="${inPart} ${outPart}"`;
  }

  visitSlide(slide: Slide): void {
    this.currentSlideContent = [];

    for (const component of slide.components) {
      component.accept(this);
    }

    if(!this.isNestedSlide){
      this.slidesHtml.push(
        `<section ${this.getTransitionAttrbute(slide)} ${this.hasTemplate ? 'class="slide"' : ''}>
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
          `<section ${this.getTransitionAttrbute(subslide)} ${this.hasTemplate ? 'class="slide"' : ''}>
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
    const id = `text-${this.textIdCounter++}`;
    const normalized = this.normalizeMultiline(textComponent.textContent);
    const html = marked.parse(normalized) as string;
    const htmlWithoutP = html
        .replace(/^<p>/, '');
    let fontSizeStyle = "";
    if (textComponent.size !== Size.DEFAULT) {
      fontSizeStyle = `font-size: ${textComponent.size};`;
    }
    let baseHtml;
    if(htmlWithoutP.includes("<ul>")) {
      baseHtml = `<div id="${id}" style="${fontSizeStyle}">${htmlWithoutP}</div>`;
    }
    else{
      if(textComponent.color) {
        baseHtml = `<p id="${id}" style="color: ${textComponent.color}; ${fontSizeStyle}">${htmlWithoutP}`;
      } else {
        baseHtml = `<p id="${id}" style="${fontSizeStyle}">${htmlWithoutP}`;
      }
    }

    const replaceActions = textComponent.actions.filter(
        a => a instanceof ReplaceAction
    ) as ReplaceAction[];

    const nonReplaceActions = textComponent.actions.filter(
        a => !(a instanceof ReplaceAction)
    );
      const hasDisplay = nonReplaceActions.some(a => a instanceof DisplayAction);
      const hasHide = nonReplaceActions.some(a => a instanceof HideAction);

    const displayedHtml = this.renderFragments(
        baseHtml,
        nonReplaceActions
    );
    const replaceFragments = replaceActions.map(replace => `
<span class="fragment"
      data-fragment-index="${replace.step-1}"
      data-replace-text="#${id}|${replace.updatedContent}">
</span>
`).join("\n");

    this.currentSlideContent.push(
        displayedHtml + replaceFragments
    );
  }

  visitImageComponent(imageComponent: ImageComponent): void {

    const id = `image-${this.imageIdCounter++}`;
    let sizeClass = "";
    if(imageComponent.size !== Size.DEFAULT) {
      sizeClass =  `${this.sizeToLetter(imageComponent.size)}-image`;
    }
    const baseHtml = `
<img id="${id}"
     src="${imageComponent.src}"
     alt="${imageComponent.alt ?? ""}"
     class="${sizeClass}">
`;

    const replaceActions = imageComponent.actions.filter(
        a => a instanceof ReplaceAction
    ) as ReplaceAction[];

    const nonReplaceActions = imageComponent.actions.filter(
        a => !(a instanceof ReplaceAction)
    );
      const hasDisplay = nonReplaceActions.some(a => a instanceof DisplayAction);
      const hasHide = nonReplaceActions.some(a => a instanceof HideAction);

      const displayedHtml = this.renderFragments(
        baseHtml,
        nonReplaceActions
    );

    const replaceFragments = replaceActions.map(replace => `
<span class="fragment"
      data-fragment-index="${replace.step-1}"
      data-replace-image="#${id}|${replace.updatedContent}">
</span>
`).join("\n");

    this.currentSlideContent.push(
        displayedHtml + replaceFragments
    );
  }

  visitVideoComponent(videoComponent: VideoComponent): void {

    const id = `video-${this.videoIdCounter++}`;
    let sizeClass = "";
    if(videoComponent.size !== Size.DEFAULT) {
      sizeClass = `${this.sizeToLetter(videoComponent.size)}-video`;
    }
    const baseHtml = `
<video id="${id}" controls ${videoComponent.autoPlay ? "muted autoplay" : ""} class="${sizeClass}">
  <source src="${videoComponent.src}" type="video/mp4">
</video>
`;

    const replaceActions = videoComponent.actions.filter(
        a => a instanceof ReplaceAction
    ) as ReplaceAction[];

    const nonReplaceActions = videoComponent.actions.filter(
        a => !(a instanceof ReplaceAction)
    );
    const hasDisplay = nonReplaceActions.some(a => a instanceof DisplayAction);
    const hasHide = nonReplaceActions.some(a => a instanceof HideAction);


    const displayedHtml = this.renderFragments(
    baseHtml,
    nonReplaceActions
    );

    const replaceFragments = replaceActions.map(replace => `
<span class="fragment"
      data-fragment-index="${replace.step-1}"
      data-replace-video="#${id}|${replace.updatedContent}">
</span>
`).join("\n");

    this.currentSlideContent.push(
        displayedHtml + replaceFragments
    );
  }


  visitFrameComponent(frameComponent: FrameComponent): void {
    const frameClass =
        frameComponent.direction === Direction.VERTICAL
            ? "vertical-frame"
            : "horizontal-frame";
    
    let sizeClass = "";
    if(frameComponent.size !== Size.DEFAULT) {
      sizeClass = `${this.sizeToLetter(frameComponent.size)}-${frameClass}`;
    }

    const frameContent: string[] = [];

    for (const component of frameComponent.components) {
      component.accept(this);
      frameContent.push(this.currentSlideContent.pop()!);
    }

    const content = `
    <div class="${frameClass} ${sizeClass}">
      ${frameContent.join("\n")}
    </div>
  `;

    const fragments = this.renderFragments(
        content,
        frameComponent.actions
    );
    this.currentSlideContent.push(fragments);
  }

  visitTemplate(template: Template): void {
    this.hasTemplate = true;
    let templateStyle = "";
    if(template.fonts){
      for(const tag in template.fonts){
        templateStyle += `${tag} { font-family: ${template.fonts[tag]}; }\n`;
      }
    }
    if(template.colors){
      for(const tag in template.colors){
        templateStyle += `${tag} { color: ${template.colors[tag]}; }\n`;
      }
    }
    if(template.fontSizes){
      for(const tag in template.fontSizes){
        templateStyle += `${tag} { font-size: ${template.fontSizes[tag]}; }\n`;
      }
    }
    if(template.dimensions){
      for(const tag in template.dimensions){
        let sizeValue = this.letterToSize(template.dimensions[tag]?.valueOf());
        templateStyle += `${tag} { width: ${sizeValue}; height: ${sizeValue}; }\n`;
      }
    }
    if(template.background){
      templateStyle += `.slide { background: ${template.background}; }\n`;
    }
    this.templateStyle = templateStyle;

    if(template.header){
      template.header.accept(this);
      this.templateHeader = this.currentSlideContent.pop() || "";
    }
    if(template.footer){
      template.footer.accept(this);
      this.templateFooter = this.currentSlideContent.pop() || "";
    }
  }

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

    let sizeClass = "";
    if(codeComponent.size !== Size.DEFAULT) {
      sizeClass = `${this.sizeToLetter(codeComponent.size)}-code`;
    }

    const dataLineNumbersJoined =
        dataLineNumbers.length > 0
            ? `data-line-numbers="|${dataLineNumbers.join("|")}"`
            : "";

    const dataFragmentIndexes = highlights2.map(h => {
        return h.step-1;
    });
    const dataFragmentIndexesJoined = dataFragmentIndexes.length > 0
        ? `data-fragment-index="${dataFragmentIndexes.join("|")}"`
        : "";
    const content = `
<pre class=${sizeClass}>
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
    <div>
      <span class="fragment fade-out"
            data-fragment-index="${hide.step - 1}">
        ${content}
      </span>
    </div>
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
  visitReplaceAction(replaceAction: ReplaceAction) {}

  visitLatexComponent(latexComponent: LatexComponent): void {
      const formula = this.normalizeMultiline(latexComponent.formula);

      let sizeClass = "";
      if(latexComponent.size !== Size.DEFAULT) {
        sizeClass = `${this.sizeToLetter(latexComponent.size)}-latex`;
      }

      if(latexComponent.color) {
        this.currentSlideContent.push(`
  <div style="color: ${latexComponent.color};" class="${sizeClass}">
    \\[
      ${formula}
    \\]
  </div>
  `);
      }
      else {
      this.currentSlideContent.push(`
  <div class="${sizeClass}">
    \\[
      ${formula}
    \\]
  </div>
  `);
      }
  }
  sizeToLetter(size: Size): string {
    let sizeLetter = "";
    switch (size) {
      case Size.XL:
         sizeLetter = "XL";
         break;
      case Size.L:
        sizeLetter =  "L";
        break;
      case Size.M:
        sizeLetter =  "M";
        break;
      case Size.S:
        sizeLetter =  "S";
        break;
      default:
        sizeLetter =  "XS";
    }
    return sizeLetter;
  }
  letterToSize(letter: any): Size {
    switch (letter) {
      case "XL":
        return Size.XL;
      case "L":
        return Size.L;
      case "M":
        return Size.M;
      case "S":
        return Size.S;
      default:
        return Size.XS;
    }
  }
  visitTitleComponent(titleComponent: TitleComponent) {
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
    if(titleComponent.color) {
      this.currentSlideContent.push(`<h${titleNumber} style="color: ${titleComponent.color};">${titleComponent.text}</h${titleNumber}>`);
    }
    else {
      this.currentSlideContent.push(`<h${titleNumber}>${titleComponent.text}</h${titleNumber}>`);
    }
  }

    visitPlotComponent(plot: PlotComponent): void {
        const id = `plot-${Math.random().toString(36).slice(2)}`;
        const functions = plot.functions;
        const functionsJs = plot.functions
            .map(f => `math.compile("${f.expr}")`)
            .join(",");
        const colors = functions
            .map(f =>{
                return `"${f.color ?? "black"}"`;
            } )
            .join(",");
        let width: number;
        let height: number;
        switch(plot.size) {
          case Size.XL:
            width = 1080;
            height = 720;
            break;
          case Size.L:
            width = 900;
            height = 600;
            break;
          case Size.M:
            width = 720;
            height = 480;
            break;
          case Size.S:
            width = 540;
            height = 360;
            break;
          case Size.XS:
            width = 360;
            height = 240;
            break;
          default:
            width = 720;
            height = 480;
        }
        const canvasHtml = `
    <canvas id="${id}" width="${width}" height="${height}"></canvas>

    <script>
      (function() {
        const exprs = [${functionsJs}];
        const colors = [${colors}]

        const xmin = ${plot.domain[0]};
        const xmax = ${plot.domain[1]};
        const samples = ${plot.samples};

        const xs = [];
        const ys = exprs.map(() => []);

        for (let i = 0; i <= samples; i++) {
          const x = xmin + (i / samples) * (xmax - xmin);
          xs.push(x);
          exprs.forEach((e, idx) => {
            ys[idx].push(e.evaluate({ x }));
          });
        }

        const canvas = document.getElementById("${id}");
        const ctx = canvas.getContext("2d");

        const padding = 70;
        const w = canvas.width - 2 * padding;
        const h = canvas.height - 2 * padding;

        const allY = ys.flat();
        const ymin = Math.min(...allY);
        const ymax = Math.max(...allY);

        const mapX = x =>
          padding + ((x - xmin) / (xmax - xmin)) * w;

        const mapY = y =>
          padding + h - ((y - ymin) / (ymax - ymin)) * h;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "14px sans-serif";
        ctx.strokeStyle = "#888";
        ctx.fillStyle = "#ccc";

        // Axes passant par (0,0)
        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = 1;
        
        // Axe Y (x = 0)
        if (xmin <= 0 && xmax >= 0) {
          const x0 = mapX(0);
          ctx.beginPath();
          ctx.moveTo(x0, padding);
          ctx.lineTo(x0, padding + h);
          ctx.stroke();
        }
        
        // Axe X (y = 0)
        if (ymin <= 0 && ymax >= 0) {
          const y0 = mapY(0);
          ctx.beginPath();
          ctx.moveTo(padding, y0);
          ctx.lineTo(padding + w, y0);
          ctx.stroke();
        }

        // Graduations
        const ticks = 5;

        for (let i = 0; i <= ticks; i++) {
          const x = xmin + (i / ticks) * (xmax - xmin);
          const px = mapX(x);
          ctx.fillText(x.toFixed(1), px - 12, padding + h + 22);
        }

        for (let i = 0; i <= ticks; i++) {
          const y = ymin + (i / ticks) * (ymax - ymin);
          const py = mapY(y);
          ctx.fillText(y.toFixed(1), padding - 48, py + 4);
        }

        // Unités
        ctx.fillText("x (${plot.xUnit})", padding + w / 2 - 15, canvas.height - 20);
        ctx.save();
        ctx.translate(20, padding + h / 2 + 20);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("f(x) (${plot.yUnit})", 0, 0);
        ctx.restore();

        // Courbes
        

        ys.forEach((curve, idx) => {
          ctx.strokeStyle = colors[idx] ?? "black";
          ctx.lineWidth = 2;
          ctx.beginPath();

          curve.forEach((y, i) => {
            const cx = mapX(xs[i]);
            const cy = mapY(y);
            i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
          });

          ctx.stroke();
        });
      })();
    </script>
  `;

        this.currentSlideContent.push(
            this.renderFragments(canvasHtml, plot.actions)
        );
    }
}
