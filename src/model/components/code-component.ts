import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";
import type {Visitor} from "../visitor.js";
import type {CodeLanguage} from "../enums/code-language.enum.js";

export class CodeComponent extends Component {
    constructor(public content: string, public language: CodeLanguage, size: Size = Size.DEFAULT) {
        super(size);
    }

    accept(visitor: Visitor): void {
        visitor.visitCodeComponent(this);
    }
}