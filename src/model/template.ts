import type {Component} from "./components/component.abstract.js";
import type {Size} from "./enums/size.enum.js";
import type {Visitable} from "./visitable.interface.js";
import type {Visitor} from "./visitor.js";

export class Template implements Visitable {
    //all fields are optional here
    constructor(
        public fonts?: {[htmltag: string]: string},
        public colors?: {[htmltag: string]: string},
        public fontSizes?: {[htmltag: string]: string},
        public dimensions?: {[htmltag: string]: Size},
        public background?: string | undefined,
        public header?: Component,
        public footer?: Component,
    ) {}

    accept(visitor: Visitor): void {
        visitor.visitTemplate(this);
    }
}