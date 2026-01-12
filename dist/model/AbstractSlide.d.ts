import type { Transition } from "./enums/transition.enum.js";
import type { Action } from "./actions/action.abstract.js";
import type { Visitable } from "./visitable.interface.js";
import type { Visitor } from "./visitor.js";
export declare abstract class AbstractSlide implements Visitable {
    transitionIn: Transition;
    transitionOut: Transition;
    steps: Action[][];
    constructor(transitionIn: Transition, transitionOut: Transition, steps: Action[][]);
    abstract accept(visitor: Visitor): void;
}
//# sourceMappingURL=AbstractSlide.d.ts.map