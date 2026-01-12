import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
export class VideoComponent extends Component {
    src;
    autoPlay;
    constructor(src, autoPlay = false, size = Size.DEFAULT) {
        super(size);
        this.src = src;
        this.autoPlay = autoPlay;
    }
    accept(visitor) {
        visitor.visitVideoComponent(this);
    }
}
//# sourceMappingURL=video-component.js.map