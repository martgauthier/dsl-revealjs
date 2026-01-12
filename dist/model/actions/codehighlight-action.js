import { Action } from "./action.abstract.js";
export class CodeHighlightAction extends Action {
    highlightedLines;
    constructor(updatedComponent, highlightedLines) {
        super(updatedComponent);
        this.highlightedLines = highlightedLines;
    }
    accept(visitor) {
        visitor.visitCodeHighlightAction(this);
    }
}
//# sourceMappingURL=codehighlight-action.js.map