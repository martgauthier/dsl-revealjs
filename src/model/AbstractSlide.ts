import type {Transition} from "./enums/transition.enum.js";
import type {Action} from "./actions/action.abstract.js";
import type {Visitable} from "./visitable.interface.js";
import type {Visitor} from "./visitor.js";


export abstract class AbstractSlide implements Visitable{
    constructor(
        public transitionIn: Transition,
        public transitionOut: Transition) {
    }

    abstract accept(visitor : Visitor) : void;
}
