tabTitle "SlideML Demo"
use template "./template_final_demo.sml"
enable annotations
enable page numbering

slide {
    title "SlideML Demonstration" XL
    text "A complete demonstration of all the features implemented in our project" [#4266B8] L
    text """Hajar El Gholabzouri
     Amelie Muller
     Gauthier Martin
     Camille Antonios"""  M
}

slide {
    title "What we implemented :" XL
    text
"""
- Basic Elements :
  - Basic components : text, images, videos, code
  - Nested Slides
  - Beautiful layouts using Frames
- Mathematical Expressions
- Animations & Transitions
- Annotations
""" XL
}

slide {
    title "1. Basic Elements"
    text "**Basic components**" [#4266B8] L
    text "We implemented multiple types of basic elements which are essential to create great presentations :" M
    frame horizontal {
        frame vertical {
            text "Images :" L
            image "https://picsum.photos/400/300" M
        }
        frame vertical {
            text "Videos :" L
            video "./assets/rick-roll.mp4" autoPlay XS
        }
        frame vertical {
            text "Text :" L
            text "with multiple color..." [darkred] M
            text "<u>***..and multiple styles***</u>" M
        }
    }
}
nestedSlide {
    slide {
        transition in concave out convex
        title "1. Basic Elements"
        text "**Nested Slides**" [#4266B8] L
        text "We introduced *Nested Slides* to explain further information on a subject" L
        text "Click on the downward arrow on the bottom-right corner of the slide to explore !"
    }

    slide {
      transition convex
      text "Here is first subSlide..." L
    }

    slide {
      text "... and here is a second one !" L
    }
}


nestedSlide {
    slide {
        title "1. Basic Elements"
        text "**Flexible Layouts**" [#4266B8] L
        text "We introduced horizontal and vertical layouts to enable users to place the components where they want" L
        text "This is an example of a images placed in a horizontal layout:"
        frame horizontal {
            image "https://picsum.photos/200/200"
            image "https://picsum.photos/200/200"
            image "https://picsum.photos/200/200"
        }
    }

    slide {
        text "And this is an example of a images placed in a vertical layout:"
        frame vertical {
            image "https://picsum.photos/150/150"
            image "https://picsum.photos/150/150"
            image "https://picsum.photos/150/150"
        }
    }
    slide {
            text "By combining layouts, we can get cool results, such as grids:"
            frame vertical {
                frame horizontal{
                    image "https://picsum.photos/100/100"
                    image "https://picsum.photos/100/100"
                    image "https://picsum.photos/100/100"
                }
                frame horizontal{
                    image "https://picsum.photos/100/100"
                    image "https://picsum.photos/100/100"
                    image "https://picsum.photos/100/100"
                }
                frame horizontal{
                    image "https://picsum.photos/100/100"
                    image "https://picsum.photos/100/100"
                    image "https://picsum.photos/100/100"
                }
            }
        }
}

slide {
    title "2. Mathematical Expressions"
    text "**1st 'A la carte' feature**" [#4266B8] L

    text "Users can also present mathematical concepts such as theorems and more complex formulas :"
    frame horizontal {
        latex "a^2 + b^2 = c^2"
        latex """
        \int_{0}^{+\infty} x^{n} e^{-\lambda x} \, dx
        = \frac{n!}{\lambda^{n+1}}, \quad \lambda > 0
        """
        latex """
        \mathbb{E}\left[ e^{i \theta X} \right]
        =
        \int_{-\infty}^{+\infty}
        e^{i \theta x} f_X(x)\, dx
        """
    }
}

slide {
    title "2. Mathematical Expressions"
    text "**1st 'A la carte' feature**" [#4266B8] L

    text "Plots may contain multiple function definitions, with explicit color customization for each function :"
    frame horizontal{
       plot {
         function "x^2" [#f59e0b]
         function "sin(x)" [#ee2677]
         function "exp(x)" [#166534]
         domain [ -3 , 3 ]
         samples 60
         xUnit "x"
         yUnit "f(x)"
       } S
       frame vertical{
         latex "f(x)=x^2" [#f59e0b]
         latex "f(x)=sin(x)" [#ee2677]
         latex "f(x)=exp(x)" [#166534]
       }
    }
}

slide {
    title "3. Annotations"
    text "**2nd 'A la carte' feature**" [#4266B8] L
    text "Using the two pencil icons placed on the bottom left of the slides, users can draw in multiple colors to give live explanations of their content :"
    frame horizontal {
        frame vertical {
            image "./assets/pencil.png" XS
            text "This icon enable the user to directly draw annotations on the slides"
        }
        frame vertical {
            image "./assets/pencil_box.png" XS
            text "This icon enable the user to draw annotations on a blackboard"
        }
    }
}

slide {
    title "4. Display & Hide Actions"
    text "**Animations on multiple components**" [#4266B8] L
    text "The display and hide actions allow step-by-step control over the appearance of components." M

    frame vertical {
        frame horizontal{
            text "This text appears at step 1" {
                display in step 1
            }

            image "https://picsum.photos/300/200" {
                display in step 2
            } S

            video "./assets/rick-roll.mp4" {
                display in step 3
            } S
        }

        frame horizontal {
            text "This whole frame disappears at step 5"
        } {
            hide in step 5
        }
    }
}

slide {
    title "5. Replace Action"
    text "**Dynamic content replacement**" [#4266B8] L
    text "The replace action enables dynamic content updates without changing slide structure." M

    frame horizontal {

        text "Initial text content" {
            replace by "Updated text content" in step 2
        }

        image "https://picsum.photos/200/200" {
            replace by "https://picsum.photos/200/300" in step 3
        }

        video "./assets/rick-roll.mp4" {
            replace by "./assets/rick-roll.mp4" in step 4
        }
    }
}


slide {
    title "6. Code & Highlight Action"
    text "**Code animations**" [#4266B8] L
    text "Code blocks can be animated using highlight actions to guide explanations." M

    code language java
"
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println('Hello SlideML');
    }
}
" {
            highlight lines 1 in step 1
            highlight lines 2-3 in step 2
        }
}

slide {
    title "7. Combining All Animations"
    text "**Complex animation scenarios**" [#4266B8] L
    text "All animation types can be combined seamlessly within a single slide." M

    frame vertical {

        text "This text appears first" {
            display in step 1
        }

        text "This text will be replaced" {
            replace by "This text has been replaced" in step 3
        }

        image "https://picsum.photos/250/150" {
            display in step 2
            hide in step 5
        }

        code
            language python
"
def square(x):
    return x * x
" {
                display in step 4
                highlight lines 1 in step 5
            }
    }
}



slide {
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
    text "Hello" {
      display in step 1
    }
}

slide {
    title "Hide Animations"
    text "Goodbye" {
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
