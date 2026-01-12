import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import type { Visitor } from "../visitor.js";
export declare class LatexComponent extends Component {
    formula: string;
    constructor(formula: string, size?: Size);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=latex-component.d.ts.map