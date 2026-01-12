import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import type { Visitor } from "../visitor.js";
import type { CodeLanguage } from "../enums/code-language.enum.js";
export declare class CodeComponent extends Component {
    content: string;
    language: CodeLanguage;
    constructor(content: string, language: CodeLanguage, size?: Size);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=code-component.d.ts.map