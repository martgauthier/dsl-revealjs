diapo "DSL Demo" {
  use template "./template_export.sml"
  enable annotations
  slide {
    title "Hi there !" XS
    text "Here is a RevealJS presentation written with our own DSL !" L
  }

  nestedSlide {
    slide {
      transition in concave out convex
      text "Here is a nested Slide" XS
    }

    slide {
      transition convex
      text "Here is first subSlide"
    }

    slide {
      text "Here is a second one"
    }

    slide {
      text "And you found Rick ! (yes, you can also put videos)"
      video "./assets/rick-roll.mp4" autoPlay XS
    }
  }


  slide {
    text "You can make layouts"
    frame vertical {
      frame horizontal {
        text "top left"
        text "top right"
      } M
      frame horizontal {
        text "bottom left"
        text "bottom right"
      } L
    } XL
  }

  slide {
    text "put images"
    image "https://picsum.photos/400/300" alt "image aléatoire" M
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
    } S
  }
  slide {
    title "Complete plot"
    frame horizontal{
      plot {
        function "x^2" [green]
        function "sin(x)" [brown]
        function "exp(x)" [pink]
        domain [ -3 , 3 ]
        samples 60
        xUnit "x"
        yUnit "f(x)"
      } S
      frame vertical{
        latex "f(x)=x^2" [green]
        latex "f(x)=sin(x)" [brown]
        latex "f(x)=exp(x)" [pink]
      }
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