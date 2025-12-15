import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";

export class VideoComponent extends Component {
    constructor(public src: string, size: Size = Size.DEFAULT) {
        super(size);
    }
}