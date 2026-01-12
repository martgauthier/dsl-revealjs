import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import type { Visitor } from "../visitor.js";
export declare class TextComponent extends Component {
    textContent: string;
    constructor(textContent: string, size?: Size);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=text-component.d.ts.map