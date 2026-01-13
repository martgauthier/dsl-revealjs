import type {Component} from "../components/component.abstract.js";
import type {Visitable} from "../visitable.interface.js";
import type {Visitor} from "../visitor.js";

export abstract class Action implements Visitable {
    constructor(public step : number = 1) {}

    abstract accept(visitor: Visitor) : void;
}