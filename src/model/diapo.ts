import type {Slide} from "./slide.js";
import type {Template} from "./template.js";
import type {Visitable} from "./visitable.interface.js";
import type {Visitor} from "./visitor.js";

export class Diapo implements Visitable{
    constructor(
        public slides: Slide[],
        public template?: Template
    ) {}

    accept(visitor: Visitor): void {
        visitor.visitDiapo(this);
    }
}