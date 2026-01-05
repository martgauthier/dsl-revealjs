diapo {
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