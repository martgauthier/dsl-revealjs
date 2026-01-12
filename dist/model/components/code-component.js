import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
export class CodeComponent extends Component {
    content;
    language;
    constructor(content, language, size = Size.DEFAULT) {
        super(size);
        this.content = content;
        this.language = language;
    }
    accept(visitor) {
        visitor.visitCodeComponent(this);
    }
}
//# sourceMappingURL=code-component.js.map