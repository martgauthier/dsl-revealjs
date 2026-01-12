import type { Size } from "../enums/size.enum.js";
import type { Visitable } from "../visitable.interface.js";
import type { Visitor } from "../visitor.js";
export declare abstract class Component implements Visitable {
    size: Size;
    constructor(size: Size);
    abstract accept(visitor: Visitor): void;
}
//# sourceMappingURL=component.abstract.d.ts.map