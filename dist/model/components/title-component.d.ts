import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import type { Visitable } from "../visitable.interface.js";
import type { Visitor } from "../visitor.js";
export declare class TitleComponent extends Component implements Visitable {
    text: String;
    constructor(text: String, size?: Size);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=title-component.d.ts.map