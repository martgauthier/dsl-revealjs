import type { Component } from "./components/component.abstract.js";
import type { Size } from "./enums/size.enum.js";
import type { Visitable } from "./visitable.interface.js";
import type { Visitor } from "./visitor.js";
export declare class Template implements Visitable {
    fonts?: {
        [htmltag: string]: string;
    } | undefined;
    colors?: {
        [htmltag: string]: string;
    } | undefined;
    fontSizes?: {
        [htmltag: string]: string;
    } | undefined;
    dimensions?: {
        [htmltag: string]: Size;
    } | undefined;
    background?: string | undefined;
    header?: Component | undefined;
    footer?: Component | undefined;
    constructor(fonts?: {
        [htmltag: string]: string;
    } | undefined, colors?: {
        [htmltag: string]: string;
    } | undefined, fontSizes?: {
        [htmltag: string]: string;
    } | undefined, dimensions?: {
        [htmltag: string]: Size;
    } | undefined, background?: string | undefined, header?: Component | undefined, footer?: Component | undefined);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=template.d.ts.map