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

  slide{
    video "./assets/rick-roll.mp4" autoPlay
  }

  slide{
    video "./assets/rick-roll.mp4"
  }

  slide{
    image "https://picsum.photos/400/300"
  }

  slide{
    image "https://picsum.photos/400/300" alt "rick qui roll"
  }
}
