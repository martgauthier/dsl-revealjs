import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";

export class TextComponent extends Component {
    constructor(public text: string, size: Size = Size.DEFAULT) {
        super(size);
    }
}