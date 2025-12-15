import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";

export class CodeComponent extends Component {
    constructor(public content: string, size: Size = Size.DEFAULT) {
        super(size);
    }
}