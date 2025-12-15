import {Action} from "./action.abstract.js";
import type {Component} from "../components/component.abstract.js";
import type {Visitor} from "../visitor.js";
import type {Visitable} from "../visitable.interface.js";

export class ReplaceAction extends Action {
    constructor(updatedComponent: Component, public componentToReplaceWith: Component) {
        super(updatedComponent);
    }

    accept(visitor: Visitor): void {
        visitor.visitReplaceAction(this);
    }
}