import type {Slide} from "./slide.js";
import type {Template} from "./template.js";

export class Diapo {
    constructor(
        public slides: Slide[],
        public template?: Template
    ) {}
}