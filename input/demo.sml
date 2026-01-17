diapo {
  use template "./template_export.sml"
  enable annotations
  slide {
    title "Hi there !" XS
    text "Here is a RevealJS presentation written with our own DSL !" L
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
      text "And you found Rick ! (yes, you can also put videos)"
      video "./assets/rick-roll.mp4" autoPlay
    }
  }


  slide {
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

  slide {
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
    transition in zoom out zoom
    title "Make transitions"
  }

  slide {
    transition in fade out fade
    title "Display Animations"
    text "Hello"{
      display in step 1
    }
  }

  slide {
    title "Hide Animations"
    text "Goodbye"{
      hide in step 1
    }
  }
  slide {
    title "Replace Animations"
    text "1..." {
      replace by "...2" in step 1
    }
  }


  slide {
    title "Highlight Code Animations"
    code language javascript
    "const components = ast.components.map((c: any) => {
     const builder = COMPONENT_BUILDERS[c.$type];
     if (!builder) {
       throw new Error(`Unknown component type: ${c.$type}`);
     }
     return builder(c);
  });" {
      highlight lines 1 in step 1
      highlight lines 2 in step 2
      highlight lines 3 in step 3
      highlight lines 4 in step 4
    }
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