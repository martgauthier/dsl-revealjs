import type { Transition } from "./enums/transition.enum.js";
import type { Component } from "./components/component.abstract.js";
import type { Action } from "./actions/action.abstract.js";
import type { Visitable } from "./visitable.interface.js";
import type { Visitor } from "./visitor.js";
import { AbstractSlide } from "./AbstractSlide.js";
export declare class Slide extends AbstractSlide implements Visitable {
    transitionIn: Transition;
    transitionOut: Transition;
    steps: Action[][];
    components: Component[];
    constructor(transitionIn: Transition, transitionOut: Transition, steps: Action[][], components: Component[]);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=slide.d.ts.map