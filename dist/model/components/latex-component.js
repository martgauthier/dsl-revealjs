import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
export class LatexComponent extends Component {
    formula;
    constructor(formula, size = Size.DEFAULT) {
        super(size);
        this.formula = formula;
    }
    accept(visitor) {
        visitor.visitLatexComponent(this);
    }
}
//# sourceMappingURL=latex-component.js.map