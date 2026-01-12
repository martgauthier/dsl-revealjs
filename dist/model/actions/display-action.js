import { Action } from "./action.abstract.js";
export class DisplayAction extends Action {
    shouldDisplay;
    constructor(updatedComponent, shouldDisplay) {
        super(updatedComponent);
        this.shouldDisplay = shouldDisplay;
    }
    accept(visitor) {
        visitor.visitDisplayAction(this);
    }
}
//# sourceMappingURL=display-action.js.map