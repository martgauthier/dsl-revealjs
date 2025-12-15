import {Action} from "./action.abstract.js";
import type {Component} from "../components/component.abstract.js";

export class ReplaceAction extends Action {
    constructor(updatedComponent: Component, public componentToReplaceWith: Component) {
        super(updatedComponent);
    }
}