import {Action} from "./action.abstract.js";
import type {Component} from "../components/component.abstract.js";

export class CodeHighlightAction extends Action {
    constructor(updatedComponent: Component, public highlightedLines: number[]) {
        super(updatedComponent);
    }
}