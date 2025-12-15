import {Action} from "./action.abstract.js";
import type {Component} from "../components/component.abstract.js";

export class DisplayAction extends Action {
    constructor(updatedComponent: Component, public shouldDisplay: boolean) {
        super(updatedComponent);
    }
}