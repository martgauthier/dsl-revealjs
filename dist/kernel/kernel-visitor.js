export class KernelVisitor {
    visitDiapo(diapo) {
    }
    visitSlide(slide) {
    }
    visitTemplate(template) {
    }
    /******************************************
     *                ACTIONS
     *
     *******************************************/
    visitCodeHighlightAction(codeHighlightAction) {
    }
    visitDisplayAction(displayAction) {
    }
    visitReplaceAction(replaceAction) {
    }
    /******************************************
     *                COMPONENTS
     *
     *******************************************/
    visitCodeComponent(codeComponent) {
    }
    visitFrameComponent(frameComponent) {
    }
    visitImageComponent(imageComponent) {
        console.log("IMAGE COMPONENT : " + imageComponent.src);
    }
    visitTextComponent(textComponent) {
    }
    visitVideoComponent(videoComponent) {
        console.log("VIDEO COMPONENT : " + videoComponent.src);
    }
}
//# sourceMappingURL=kernel-visitor.js.map