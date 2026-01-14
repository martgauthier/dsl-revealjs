import { Component } from "./component.abstract.js";
import { Size } from "../enums/size.enum.js";
import type { Visitor } from "../visitor.js";
import type { Action } from "../actions/action.abstract.js";

export class PlotComponent extends Component {
    functions: string[];
    domain: [number, number];
    samples: number;
    xUnit: string;
    yUnit: string;

    constructor(
        functions: string[],
        domain: [number, number] = [-10, 10],
        samples: number = 300,
        xUnit: string = "",
        yUnit: string = "",
        size: Size = Size.DEFAULT,
        actions: Action[] = []
    ) {
        super(size, actions);
        this.functions = functions;
        this.domain = domain;
        this.samples = samples;
        this.xUnit = xUnit;
        this.yUnit = yUnit;
    }

    accept(visitor: Visitor): void {
        visitor.visitPlotComponent(this);
    }
}
