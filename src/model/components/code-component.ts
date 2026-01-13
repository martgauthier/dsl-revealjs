import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";
import type {Visitor} from "../visitor.js";
import type {CodeLanguage} from "../enums/code-language.enum.js";
import type {Action} from "../actions/action.abstract.js";

export class CodeComponent extends Component {
    constructor(public content: string, public language: CodeLanguage, size: Size = Size.DEFAULT, actions: Action[]) {
        super(size, actions);
    }

    accept(visitor: Visitor): void {
        visitor.visitCodeComponent(this);
    }

}