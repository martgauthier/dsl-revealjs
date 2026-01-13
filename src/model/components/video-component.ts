import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";
import type {Visitable} from "../visitable.interface.js";
import type {Visitor} from "../visitor.js";
import type {Action} from "../actions/action.abstract.js";

export class VideoComponent extends Component {
    constructor(public src: string, public autoPlay: Boolean = false, size: Size = Size.DEFAULT, actions: Action[]) {
        super(size, actions);
    }

    accept(visitor: Visitor): void {
        visitor.visitVideoComponent(this);
    }
}