import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";
import type {Visitable} from "../visitable.interface.js";
import type {Visitor} from "../visitor.js";

export class CodeComponent extends Component {
    constructor(public content: string, size: Size = Size.DEFAULT) {
        super(size);
    }

    accept(visitor: Visitor): void {
        visitor.visitCodeComponent(this);
    }
}