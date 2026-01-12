export class Diapo {
    slides;
    template;
    annotationsEnabled;
    constructor(slides, template, annotationsEnabled = false) {
        this.slides = slides;
        this.template = template;
        this.annotationsEnabled = annotationsEnabled;
    }
    accept(visitor) {
        visitor.visitDiapo(this);
    }
}
//# sourceMappingURL=diapo.js.map