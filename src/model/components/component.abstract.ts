import type {Size} from "../enums/size.enum.js";
import type {Visitable} from "../visitable.interface.js";
import type {Visitor} from "../visitor.js";

export abstract class Component implements Visitable {
    constructor(public size: Size) {}

    abstract accept(visitor: Visitor) : void;
}