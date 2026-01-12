import {Action} from "./action.abstract.js";
import type {Component} from "../components/component.abstract.js";
import type {Visitor} from "../visitor.js";

export class HighlightAction extends Action {
    constructor(step: number,
                public startLine: number,
                public endLine: number) {
        super(step);
    }

    accept(visitor: Visitor): void {
        visitor.visitCodeHighlightAction(this);
    }
}