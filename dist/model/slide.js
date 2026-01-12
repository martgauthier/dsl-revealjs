import { AbstractSlide } from "./AbstractSlide.js";
export class Slide extends AbstractSlide {
    transitionIn;
    transitionOut;
    steps;
    components;
    constructor(transitionIn, transitionOut, steps, components) {
        super(transitionIn, transitionOut, steps);
        this.transitionIn = transitionIn;
        this.transitionOut = transitionOut;
        this.steps = steps;
        this.components = components;
    }
    accept(visitor) {
        visitor.visitSlide(this);
    }
}
//# sourceMappingURL=slide.js.map