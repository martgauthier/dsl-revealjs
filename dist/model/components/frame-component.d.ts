import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import { Direction } from "../enums/direction.enum.js";
import type { Visitor } from "../visitor.js";
export declare class FrameComponent extends Component {
    components: Component[];
    direction: Direction;
    constructor(components: Component[], direction?: Direction, size?: Size);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=frame-component.d.ts.map