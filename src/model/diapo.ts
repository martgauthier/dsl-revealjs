import type {Slide} from "./slide.js";
import type {Template} from "./template.js";
import type {Visitable} from "./visitable.interface.js";
import type {Visitor} from "./visitor.js";
import type {AbstractSlide} from "./AbstractSlide.js";

export class Diapo implements Visitable{
    constructor(
        public slides: AbstractSlide[],
        public template?: Template,
        public annotationsEnabled: boolean = false,
        public title : String = "Reveal Presentation",
        public pageNumbering: boolean = false
    ) {}

    accept(visitor: Visitor): void {
        visitor.visitDiapo(this);
    }
}