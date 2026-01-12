import { Action } from "./action.abstract.js";
import type { Component } from "../components/component.abstract.js";
import type { Visitor } from "../visitor.js";
export declare class ReplaceAction extends Action {
    componentToReplaceWith: Component;
    constructor(updatedComponent: Component, componentToReplaceWith: Component);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=replace-action.d.ts.map