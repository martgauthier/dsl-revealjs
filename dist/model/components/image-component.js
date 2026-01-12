import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
export class ImageComponent extends Component {
    src;
    alt;
    constructor(src, alt, size = Size.DEFAULT) {
        super(size);
        this.src = src;
        this.alt = alt;
    }
    accept(visitor) {
        visitor.visitImageComponent(this);
    }
}
//# sourceMappingURL=image-component.js.map