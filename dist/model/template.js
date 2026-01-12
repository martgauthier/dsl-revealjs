export class Template {
    fonts;
    colors;
    fontSizes;
    dimensions;
    background;
    header;
    footer;
    //all fields are optional here
    constructor(fonts, colors, fontSizes, dimensions, background, header, footer) {
        this.fonts = fonts;
        this.colors = colors;
        this.fontSizes = fontSizes;
        this.dimensions = dimensions;
        this.background = background;
        this.header = header;
        this.footer = footer;
    }
    accept(visitor) {
        visitor.visitTemplate(this);
    }
}
//# sourceMappingURL=template.js.map