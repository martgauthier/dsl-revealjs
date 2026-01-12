import type { Visitor } from "../model/visitor.js";
import { Diapo } from "../model/diapo.js";
import { Slide } from "../model/slide.js";
import { TextComponent } from "../model/components/text-component.js";
import type { CodeHighlightAction } from "../model/actions/codehighlight-action.js";
import type { DisplayAction } from "../model/actions/display-action.js";
import type { ReplaceAction } from "../model/actions/replace-action.js";
import type { CodeComponent } from "../model/components/code-component.js";
import type { VideoComponent } from "../model/components/video-component.js";
import type { ImageComponent } from "../model/components/image-component.js";
import type { NestedSlide } from "../model/nestedSlide.js";
import type { FrameComponent } from "../model/components/frame-component.js";
import type { LatexComponent } from "../model/components/latex-component.js";
import type { TitleComponent } from "../model/components/title-component.js";
export declare class RevealVisitor implements Visitor {
    devServerMode: boolean;
    constructor(devServerMode?: boolean);
    private annotationsEnabled;
    private slidesHtml;
    private currentSlideContent;
    private isNestedSlide;
    getResult(): string;
    normalizeMultiline(text: string): string;
    visitDiapo(diapo: Diapo): void;
    visitSlide(slide: Slide): void;
    visitNestedSlide(nestedSlide: NestedSlide): void;
    visitTextComponent(textComponent: TextComponent): Promise<void>;
    visitImageComponent(imageComponent: ImageComponent): void;
    visitVideoComponent(videoComponent: VideoComponent): void;
    visitFrameComponent(FrameComponent: FrameComponent): void;
    visitTemplate(): void;
    visitCodeComponent(codeComponent: CodeComponent): void;
    visitReplaceAction(replaceAction: ReplaceAction): void;
    visitDisplayAction(displayAction: DisplayAction): void;
    visitCodeHighlightAction(codeHighlightAction: CodeHighlightAction): void;
    visitLatexComponent(latexComponent: LatexComponent): void;
    visitTitleComponent(titleComponent: TitleComponent): void;
}
//# sourceMappingURL=reveal-visitor.d.ts.map