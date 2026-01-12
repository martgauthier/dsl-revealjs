import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
export class TitleComponent extends Component {
    text;
    constructor(text, size = Size.DEFAULT) {
        super(size);
        this.text = text;
    }
    accept(visitor) {
        visitor.visitTitleComponent(this);
    }
}
//# sourceMappingURL=title-component.js.map