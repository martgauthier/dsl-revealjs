import type {Transition} from "./enums/transition.enum.js";
import type {Component} from "./components/component.abstract.js";
import type {Action} from "./actions/action.abstract.js";

export class Slide {
    constructor(
        public transitionIn: Transition,
        public transitionOut: Transition,
        public components: Component[],
        public steps: Action[][]
        ){}
}