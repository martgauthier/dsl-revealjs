import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
export class TextComponent extends Component {
    textContent;
    constructor(textContent, size = Size.DEFAULT) {
        super(size);
        this.textContent = textContent;
    }
    accept(visitor) {
        visitor.visitTextComponent(this);
    }
}
//# sourceMappingURL=text-component.js.map