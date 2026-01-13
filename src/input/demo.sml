diapo {
  enable annotations

  slide {
    title "Hi there !" 'XS'
    text "Here is a RevealJS presentation written with our own DSL !" 'L'
  }
  slide {
    transition in zoom out zoom
    title "Zoom Slide"
  }
  slide {
    transition in fade out fade
    title "Fade slide"
  }
  slide {
    transition in zoom
    title "zoom slide"
    
  }
  slide {
    transition in zoom out zoom
    title  "zoom in zoom out"
  }

  slide {
    transition out none
    title "no transition"
  }



  slide{
    text "You can make layouts"
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
    text "put images"
    image "https://picsum.photos/400/300" alt "image aléatoire"
  }

  slide {
    text "Present code"
    code language typescript
"visitDiapo(diapo: Diapo): void {
    for (const slide of diapo.slides) {
        slide.accept(this);
    }
}"
  }

  slide {
    text "# Write in Markdown"
    text "**Bold text**"
    text "- item 1\n- item 2\n- item 3"
    text "`inline code`"
  }

  slide {
    text "Or write Formulas"
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