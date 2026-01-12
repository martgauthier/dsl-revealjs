import type { Transition } from "./enums/transition.enum.js";
import type { Action } from "./actions/action.abstract.js";
import type { Visitable } from "./visitable.interface.js";
import type { Visitor } from "./visitor.js";
import { AbstractSlide } from "./AbstractSlide.js";
import type { Slide } from "./slide.js";
export declare class NestedSlide extends AbstractSlide implements Visitable {
    transitionIn: Transition;
    transitionOut: Transition;
    steps: Action[][];
    subSlides: Slide[];
    constructor(transitionIn: Transition, transitionOut: Transition, steps: Action[][], subSlides: Slide[]);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=nestedSlide.d.ts.map