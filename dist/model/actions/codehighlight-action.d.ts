import { Action } from "./action.abstract.js";
import type { Component } from "../components/component.abstract.js";
import type { Visitor } from "../visitor.js";
export declare class CodeHighlightAction extends Action {
    highlightedLines: number[];
    constructor(updatedComponent: Component, highlightedLines: number[]);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=codehighlight-action.d.ts.map