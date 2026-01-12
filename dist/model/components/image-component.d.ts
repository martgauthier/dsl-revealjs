import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import type { Visitor } from "../visitor.js";
export declare class ImageComponent extends Component {
    src: string;
    alt?: string | undefined;
    constructor(src: string, alt?: string | undefined, size?: Size);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=image-component.d.ts.map