import type {Template} from "./template.js";
import type {VideoComponent} from "./components/video-component.js";
import type {Slide} from "./slide.js";
import type {Diapo} from "./diapo.js";
import type {TextComponent} from "./components/text-component.js";
import type {ImageComponent} from "./components/image-component.js";
import type {FrameComponent} from "./components/frame-component.js";
import type {CodeComponent} from "./components/code-component.js";
import type {HideAction} from "./actions/hide-action.js";
import type {DisplayAction} from "./actions/display-action.js";
import type {HighlightAction} from "./actions/highlight-action.js";
import type { NestedSlide } from "./nestedSlide.js";
import type {ReplaceAction} from "./actions/replace-action.js";

export interface Visitor {
    visitTemplate(template: Template): void;

    visitVideoComponent(videoComponent: VideoComponent): void;

    visitSlide(slide: Slide): void;

    visitNestedSlide(subSlide: NestedSlide): void;

    visitDiapo(diapo: Diapo): void;

    visitTextComponent(textComponent: TextComponent): void;

    visitImageComponent(imageComponent: ImageComponent): void;

    visitFrameComponent(frameComponent: FrameComponent): void;

    visitCodeComponent(codeComponent: CodeComponent): void;

    visitHideAction(hideAction: HideAction): void;

    visitDisplayAction(displayAction: DisplayAction): void;

    visitCodeHighlightAction(codeHighlightAction: HighlightAction): void;

    visitReplaceAction(replaceAction: ReplaceAction): void;
}