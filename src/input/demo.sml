diapo {
  slide {
      code language typescript
  "visitDiapo(diapo: Diapo): void {
      for (const slide of diapo.slides) {
          slide.accept(this);
      }
  }"
    text "Example TypeScript"
    text "J'apparais en premier" {
        display in step 1
        hide in step 2
    }
    text "J'apparais en 2eme" {
            display in step 2
            hide in step 3
        }
  }

  nestedSlide {
    slide {
      text "Here is a nested Slide"
    }

    slide {
      text "Here is first subSlide"
    }

    slide {
      text "Here is a second one"
    }

    slide {
      text "And you found Rick !"
      video src "./assets/rick-roll.mp4" autoPlay
    }
  }

  slide {
    text "Second slide"
  }

  slide{
    video "./assets/rick-roll.mp4" autoPlay
  }

  slide{
    frame vertical {
      frame horizontal {
        text "top left"
        text "top right"
      }
      frame horizontal {
        text "bottom left"
        text "bottom right"
      }
    }
  }

  slide{
    image "https://picsum.photos/400/300"
  }

  slide{
    image "https://picsum.photos/400/300" alt "rick qui roll"
  }

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