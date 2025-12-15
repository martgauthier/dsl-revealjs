import type {Component} from "../components/component.abstract.js";
import type {Visitable} from "../visitable.interface.js";
import type {Visitor} from "../visitor.js";

export abstract class Action implements Visitable {
    constructor(protected updatedComponent: Component) {}

    abstract accept(visitor: Visitor) : void;
}