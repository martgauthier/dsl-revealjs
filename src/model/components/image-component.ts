import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";
import type {Visitable} from "../visitable.interface.js";
import type {Visitor} from "../visitor.js";
import type {Action} from "../actions/action.abstract.js";

export class ImageComponent extends Component {
    constructor(public src: string, size: Size = Size.DEFAULT,actions: Action[], public alt?: string) {
        super(size, actions);
    }

    accept(visitor: Visitor): void {
        visitor.visitImageComponent(this);
    }
}