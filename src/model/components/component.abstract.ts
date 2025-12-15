import type {Size} from "../enums/size.enum.js";

export abstract class Component {
    constructor(public size: Size) {}
}