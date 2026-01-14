diapo {
  use template "./template_export.sml"

  slide {
    text "hddshdfe"
  }

  slide {
    title "Final test"
    plot {
      function "x^2"
      function "sin(x)"
      function "exp(x)"
      domain [ -3 , 3 ]
      samples 60
      xUnit "s"
      yUnit "f(s)"
    }
  }
}
