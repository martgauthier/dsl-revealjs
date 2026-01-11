import {Action} from "./action.abstract.js";
import type {Component} from "../components/component.abstract.js";
import type {Visitor} from "../visitor.js";

export class CodeHighlightAction extends Action {
    constructor() {
        super();
    }

    accept(visitor: Visitor): void {
        visitor.visitCodeHighlightAction(this);
    }
}