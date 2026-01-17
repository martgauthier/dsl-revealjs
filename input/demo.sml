diapo {
  use template "./template_export.sml"
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
            }
            frame vertical{
                latex "f(x)=x^2" [green]
                latex "f(x)=sin(x)" [brown]
                latex "f(x)=exp(x)" [pink]
            }
        }
  }
}
