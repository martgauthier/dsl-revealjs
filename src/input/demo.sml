diapo {
  slide {
    text "Example TypeScript"
    code language typescript
"visitDiapo(diapo: Diapo): void {
    for (const slide of diapo.slides) {
        slide.accept(this);
    }
}"

  }

  slide {
    text "Second slide"
  }
}
