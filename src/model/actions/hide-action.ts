import {Action} from "./action.abstract.js";
import type {Component} from "../components/component.abstract.js";
import type {Visitor} from "../visitor.js";

export class HideAction extends Action {
    constructor(step : number = 1) {
        super(step);
    }
}