import type { Template } from "./template.js";
import type { Visitable } from "./visitable.interface.js";
import type { Visitor } from "./visitor.js";
import type { AbstractSlide } from "./AbstractSlide.js";
export declare class Diapo implements Visitable {
    slides: AbstractSlide[];
    template?: Template | undefined;
    annotationsEnabled: boolean;
    constructor(slides: AbstractSlide[], template?: Template | undefined, annotationsEnabled?: boolean);
    accept(visitor: Visitor): void;
}
//# sourceMappingURL=diapo.d.ts.map