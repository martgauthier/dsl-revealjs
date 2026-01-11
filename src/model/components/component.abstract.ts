import type {Size} from "../enums/size.enum.js";
import type {Visitable} from "../visitable.interface.js";
import type {Visitor} from "../visitor.js";
import type {Action} from "../actions/action.abstract.js";

export abstract class Component implements Visitable {
    constructor(public size: Size, public actions: Action[]) {}

    abstract accept(visitor: Visitor) : void;
}