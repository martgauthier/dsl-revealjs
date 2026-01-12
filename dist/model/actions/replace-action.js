import { Action } from "./action.abstract.js";
export class ReplaceAction extends Action {
    componentToReplaceWith;
    constructor(updatedComponent, componentToReplaceWith) {
        super(updatedComponent);
        this.componentToReplaceWith = componentToReplaceWith;
    }
    accept(visitor) {
        visitor.visitReplaceAction(this);
    }
}
//# sourceMappingURL=replace-action.js.map