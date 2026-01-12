import type { Visitor } from "../model/visitor.js";
import type { TextComponent } from "../model/components/text-component.js";
import type { Template } from "../model/template.js";
import type { VideoComponent } from "../model/components/video-component.js";
import type { Slide } from "../model/slide.js";
import type { ReplaceAction } from "../model/actions/replace-action.js";
import type { ImageComponent } from "../model/components/image-component.js";
import type { CodeComponent } from "../model/components/code-component.js";
import type { CodeHighlightAction } from "../model/actions/codehighlight-action.js";
import type { FrameComponent } from "../model/components/frame-component.js";
import type { DisplayAction } from "../model/actions/display-action.js";
import type { Diapo } from "../model/diapo.js";
export declare class KernelVisitor implements Visitor {
    visitDiapo(diapo: Diapo): void;
    visitSlide(slide: Slide): void;
    visitTemplate(template: Template): void;
    /******************************************
     *                ACTIONS
     *
     *******************************************/
    visitCodeHighlightAction(codeHighlightAction: CodeHighlightAction): void;
    visitDisplayAction(displayAction: DisplayAction): void;
    visitReplaceAction(replaceAction: ReplaceAction): void;
    /******************************************
     *                COMPONENTS
     *
     *******************************************/
    visitCodeComponent(codeComponent: CodeComponent): void;
    visitFrameComponent(frameComponent: FrameComponent): void;
    visitImageComponent(imageComponent: ImageComponent): void;
    visitTextComponent(textComponent: TextComponent): void;
    visitVideoComponent(videoComponent: VideoComponent): void;
}
//# sourceMappingURL=kernel-visitor.d.ts.map