diapo {
  slide {
    text "# Hello DSL"
    text "**Bold text**"
    text "- item 1\n- item 2\n- item 3"
    text "`inline code`"
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
