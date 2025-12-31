import {Component} from "./component.abstract.js";
import {Size} from "../enums/size.enum.js";
import {Direction} from "../enums/direction.enum.js";
import type {Visitor} from "../visitor.js";

export class FrameComponent extends Component {
    constructor(public components: Component, public direction: Direction = Direction.VERTICAL, size: Size = Size.DEFAULT) {
        super(size);
    }

    accept(visitor: Visitor): void {
        visitor.visitFrameComponent(this);
    }
}