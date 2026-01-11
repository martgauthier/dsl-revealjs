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
    text "Example TypeScript"
    code language typescript
"visitDiapo(diapo: Diapo): void {
    for (const slide of diapo.slides) {
        slide.accept(this);
    }
}"

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
    text """
# tring to write text
with multiple lines 
### if possible **bold**
    """
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
    text """
# tring to write text
with multiple lines 
### if possible **bold**
    """
  }

  slide {
  text "# Théorème de Pythagore"
  latex "a^2 + b^2 = c^2"
  text "Formule fondamentale en géométrie"

  text "# Fonction Gamma (cas particulier)"
  latex """
\int_{0}^{+\infty} x^{n} e^{-\lambda x} \, dx
= \frac{n!}{\lambda^{n+1}}, \quad \lambda > 0
"""
  text "Lien entre intégrales et factorielle"
}

}