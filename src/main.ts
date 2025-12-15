import {Visitor} from "./model/visitor.js";
import type {Component} from "./model/components/component.abstract.js";
import {VideoComponent} from "./model/components/video-component.js";
import {ImageComponent} from "./model/components/image-component.js";

let visitor = new Visitor();

let componentArray: Component[] = [];
let videoComponent = new VideoComponent("testurl");
let imageComponent = new ImageComponent("testimage");

componentArray.push(videoComponent);
componentArray.push(imageComponent);

for(let component of componentArray) {
    component.accept(visitor);
}