import {Action} from "./action.abstract.js";
import type {Component} from "../components/component.abstract.js";
import type {Visitor} from "../visitor.js";
import type {Visitable} from "../visitable.interface.js";

export class DisplayAction extends Action {
    constructor(updatedComponent: Component, public shouldDisplay: boolean) {
        super(updatedComponent);
    }

    accept(visitor: Visitor): void {
        visitor.visitDisplayAction(this);
    }
}