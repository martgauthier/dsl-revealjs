diapo {
  slide {
    text "# Hi there !"
    text "Here is a RevealJS presentation written with our own DSL !"
  }
  
  slide {
    text "And you found Rick ! (yes, you can also put videos)"
    video src "./assets/rick-roll.mp4" 
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