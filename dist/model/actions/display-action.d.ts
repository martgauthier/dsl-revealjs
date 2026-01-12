import { Action } from "./action.abstract.js";
import type { Component } from "../components/component.abstract.js";
import type { Visitor } from "../visitor.js";
export declare class DisplayAction extends Action {
    shouldDisplay: boolean;
    constructor(updatedComponent: Component, shouldDisplay: boolean);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=display-action.d.ts.map