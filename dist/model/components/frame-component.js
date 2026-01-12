import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import { Direction } from "../enums/direction.enum.js";
export class FrameComponent extends Component {
    components;
    direction;
    constructor(components, direction = Direction.VERTICAL, size = Size.DEFAULT) {
        super(size);
        this.components = components;
        this.direction = direction;
    }
    accept(visitor) {
        visitor.visitFrameComponent(this);
    }
}
//# sourceMappingURL=frame-component.js.map