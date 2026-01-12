import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import type { Visitor } from "../visitor.js";
export declare class VideoComponent extends Component {
    src: string;
    autoPlay: Boolean;
    constructor(src: string, autoPlay?: Boolean, size?: Size);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=video-component.d.ts.map