import type {Transition} from "./enums/transition.enum.js";
import type {Component} from "./components/component.abstract.js";
import type {Action} from "./actions/action.abstract.js";
import type {Visitable} from "./visitable.interface.js";
import type {Visitor} from "./visitor.js";
import type {NestedSlide} from "./nestedSlide.js";
import {AbstractSlide} from "./AbstractSlide.js";

export class Slide extends AbstractSlide implements Visitable {
    constructor(
        public transitionIn: Transition,
        public transitionOut: Transition,
        public components: Component[],
        ){
        super(transitionIn, transitionOut);
    }

    accept(visitor: Visitor): void {
        visitor.visitSlide(this);
    }
}