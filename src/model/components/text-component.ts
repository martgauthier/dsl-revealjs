import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";
import type {Visitor} from "../visitor.js";
import type {Action} from "../actions/action.abstract.js";

export class TextComponent extends Component {
    constructor(public textContent: string, public color: string | undefined, size: Size = Size.DEFAULT, actions: Action[]) {
        super(size,actions);
    }

    accept(visitor: Visitor): void {
        visitor.visitTextComponent(this);
    }
}