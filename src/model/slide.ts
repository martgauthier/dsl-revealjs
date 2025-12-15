import type {Transition} from "./enums/transition.enum.js";
import type {Component} from "./components/component.abstract.js";
import type {Action} from "./actions/action.abstract.js";
import type {Visitable} from "./visitable.interface.js";
import type {Visitor} from "./visitor.js";

export class Slide implements Visitable {
    constructor(
        public transitionIn: Transition,
        public transitionOut: Transition,
        public components: Component[],
        public steps: Action[][]
        ){}

    accept(visitor: Visitor): void {
        visitor.visitSlide(this);
    }
}