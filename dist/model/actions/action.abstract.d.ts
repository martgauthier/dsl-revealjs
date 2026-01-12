import type { Component } from "../components/component.abstract.js";
import type { Visitable } from "../visitable.interface.js";
import type { Visitor } from "../visitor.js";
export declare abstract class Action implements Visitable {
    protected updatedComponent: Component;
    constructor(updatedComponent: Component);
    abstract accept(visitor: Visitor): void;
}
//# sourceMappingURL=action.abstract.d.ts.map