import type {Component} from "../components/component.abstract.js";

export abstract class Action {
    constructor(protected updatedComponent: Component) {}
}