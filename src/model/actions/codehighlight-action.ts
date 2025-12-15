import {Action} from "./action.abstract.js";
import type {Component} from "../components/component.abstract.js";
import type {Visitor} from "../visitor.js";
import type {Visitable} from "../visitable.interface.js";

export class CodeHighlightAction extends Action {
    constructor(updatedComponent: Component, public highlightedLines: number[]) {
        super(updatedComponent);
    }

    accept(visitor: Visitor): void {
        visitor.visitCodeHighlightAction(this);
    }
}