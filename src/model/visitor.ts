import type {Template} from "./template.js";
import type {VideoComponent} from "./components/video-component.js";
import type {Slide} from "./slide.js";
import type {Diapo} from "./diapo.js";
import type {TextComponent} from "./components/text-component.js";
import type {ImageComponent} from "./components/image-component.js";
import type {FrameComponent} from "./components/frame-component.js";
import type {CodeComponent} from "./components/code-component.js";
import type {ReplaceAction} from "./actions/replace-action.js";
import type {DisplayAction} from "./actions/display-action.js";
import type {CodeHighlightAction} from "./actions/codehighlight-action.js";

export class Visitor {
    visitTemplate(template: Template): void {
    }

    visitVideoComponent(videoComponent: VideoComponent): void {
        console.log("VIDEO COMPONENT " + videoComponent.src);
    }

    visitSlide(slide: Slide) {}

    visitDiapo(diapo: Diapo) {}

    visitTextComponent(textComponent: TextComponent) {}

    visitImageComponent(imageComponent: ImageComponent) {
        console.log("IMAGE COMPONENT " + imageComponent.src);}

    visitFrameComponent(frameComponent: FrameComponent) {}

    visitCodeComponent(codeComponent: CodeComponent) {}

    visitReplaceAction(replaceAction: ReplaceAction) {}

    visitDisplayAction(displayAction: DisplayAction) {}

    visitCodeHighlightAction(codeHighlightAction: CodeHighlightAction) {}
}