import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import type { Visitor } from "../visitor.js";

export class LatexComponent extends Component {
  constructor(
    public formula: string,
    size: Size = Size.DEFAULT
  ) {
    super(size);
  }

  accept(visitor: Visitor): void {
    visitor.visitLatexComponent(this);
  }
}
