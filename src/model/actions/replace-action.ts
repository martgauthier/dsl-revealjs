import {Action} from "./action.abstract.js";
import type {Visitor} from "../visitor.js";

export class ReplaceAction extends Action {
    public updatedContent: string;
    constructor( step : number = 1, updatedContent : string) {
        super(step);
        this.updatedContent = updatedContent;
    }

    accept(visitor: Visitor): void {
        visitor.visitReplaceAction(this);
    }
}