import { AbstractSlide } from "./AbstractSlide.js";
export class NestedSlide extends AbstractSlide {
    transitionIn;
    transitionOut;
    steps;
    subSlides;
    constructor(transitionIn, transitionOut, steps, subSlides) {
        super(transitionIn, transitionOut, steps);
        this.transitionIn = transitionIn;
        this.transitionOut = transitionOut;
        this.steps = steps;
        this.subSlides = subSlides;
    }
    accept(visitor) {
        visitor.visitNestedSlide(this);
    }
}
//# sourceMappingURL=nestedSlide.js.map