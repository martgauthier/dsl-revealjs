import type {Transition} from "./enums/transition.enum.js";
import type {Component} from "./components/component.abstract.js";
import type {Action} from "./actions/action.abstract.js";
import type {Visitable} from "./visitable.interface.js";
import type {Visitor} from "./visitor.js";
import {AbstractSlide} from "./AbstractSlide.js";
import type {Slide} from "./slide.js";

export class NestedSlide extends AbstractSlide implements Visitable {
    constructor(
        public transitionIn: Transition,
        public transitionOut: Transition,
        public subSlides: Slide[]
    ){
        super(transitionIn, transitionOut);
    }

    accept(visitor: Visitor): void {
        visitor.visitNestedSlide(this);
    }
}