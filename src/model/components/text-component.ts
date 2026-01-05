import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";
import type {Visitor} from "../visitor.js";

export class TextComponent extends Component {
    constructor(public textContent: string, size: Size = Size.DEFAULT) {
        super(size);
    }

    accept(visitor: Visitor): void {
        visitor.visitTextComponent(this);
    }
}