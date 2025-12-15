import type { Visitor } from "./visitor.js";

export interface Visitable {
    accept(visitor: Visitor): void;
}