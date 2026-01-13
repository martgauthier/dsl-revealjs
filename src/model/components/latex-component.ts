import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import type { Visitor } from "../visitor.js";
import type {Action} from "../actions/action.abstract.js";

export class LatexComponent extends Component {
  constructor(
    public formula: string,
    size: Size = Size.DEFAULT,
    actions: Action[]
  ) {
    super(size, actions);
  }

  accept(visitor: Visitor): void {
    visitor.visitLatexComponent(this);
  }
}
