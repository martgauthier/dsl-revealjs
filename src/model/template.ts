import type {Component} from "./components/component.abstract.js";
import type {Size} from "./enums/size.enum.js";

export class Template {
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
}