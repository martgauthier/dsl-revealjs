tabTitle "SlideML Demo"
use template "./template_final_demo.sml"
enable annotations
enable page numbering

slide {
    title "SlideML Demonstration" XL
    text "**A complete demonstration of all the features implemented in our project**" [#4266B8] L
    text """Hajar El Gholabzouri
     Amelie Muller
     Gauthier Martin
     Camille Antonios"""  M
}

slide {
    transition in fade out fade
    title "What we implemented :" XL
    text
"""
1. Basic Elements
   - Text, Images, Videos, Code
   - Nested Slides
   - Layouts using Frames
2. Mathematical Expressions
   - LaTeX formulas
   - Plots with multiple functions
3. Animations & Actions
   - Display & Hide
   - Replace
   - Highlight
4. Slide Transitions
5. Templates
6. Annotations
7. Development Add-on
""" S
}

slide {
    transition in concave out concave
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
            video "./assets/rick-roll.mp4" autoPlay M
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
    transition in convex out convex
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
    transition in fade out fade
    title "2. Mathematical Expressions"
    text "**1st 'A la carte' feature**" [#4266B8] L

    text "We decided to push this feature further by the implementation of plots. Plots may contain multiple function definitions, with explicit color customization for each function :"
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
    transition in zoom out zoom
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
    transition in fade out fade
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
            } M

            video "./assets/rick-roll.mp4" {
                display in step 3
            } M
        }

        frame horizontal {
            text "This whole frame disappears at step 5"{
                display in step 4
            }
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

        image "./assets/frog.jpg" {
            replace by "./assets/flower.webp" in step 3
        } M

        video "./assets/rick-roll.mp4" {
            replace by "./assets/flower.mp4" in step 4
        } M
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
    text "All animation types can be combined seamlessly within a single slide. Multiple animations can also be apply to a single component." M
    text "This is an exemple of images evolving with the code highlights" {
        display in step 1
        hide in step 6
    }
    frame horizontal {
        image "https://illustoon.com/photo/7252.png" {
            display in step 1
            replace by "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/LC220MY-FRONT/220x220mm-clariana-mid-yellow-square-120gsm-peel-&-seal-.jpg" in step 3
            replace by "https://illustoon.com/photo/thum/7258.png" in step 4
            hide in step 6
        } XS

        code language python
"
def changeColor(value):
    newColor = yellow
    result = newColor+value
    return result
" {
            display in step 1
            highlight lines 1 in step 2
            highlight lines 2 in step 3
            highlight lines 3 in step 4
            highlight lines 4 in step 5
            hide in step 6
        } XS
    }
}


slide {
    transition in fade out slide
    title "8. Transitions Between Slides"
    text "**Slide transitions**" [#4266B8] L

    text """ Throughout the presentation, we have illustrated that different transition types can be applied between slides.
Transitions are defined at the slide level using two distinct properties: transition in and transition out """ M

    text """
All transitions are strongly typed using a dedicated enumeration:
- zoom
- fade
- concave
- convex
- slide
""" M

    text """
If no transition is explicitly defined, the DEFAULT value is applied.
If a single transition is provided, it is interpreted as the entry transition.
""" M

}


slide {
    transition fade
    title "9. Templates in SlideML"
    text "**Design choice: templates written in the DSL**" [#4266B8] L
    text "
Templates define a reusable and professional visual identity.
They separate presentation style from content and ensure
consistency across all slides.
" M
    frame horizontal {
    frame vertical {


    text """
Templates may optionally define headers, footers, colors,
backgrounds, fonts, dimensions and font sizes.
Headers and footers are rendered outside slides to avoid
duplication.
""" M
    text """
SlideML supports two ways of defining templates:
- Including an external template file written in SlideML
- Defining the template directly inside the slide deck definition
""" M


}
    code
        language sml
        "
        export template {

          header {
            title 'SlideML' L
          }

          colors {
            p  => black
            h1 => #020617
            h2 => #4266B8
          }

          fonts {
            h1 => Montserrat
            h2 => Montserrat
            p  => Inter
          }

          footer {
            text 'Université Côte d’Azur · DSL 2025–2026' S
          }

          background => '#E7ECF6'
        }
        " S
    }
}


slide {
    transition fade
    title "10. Development Add-on"
    text "**Live-reloading for SlideML**" [#4266B8] L

    text """
To facilitate slide deck development, we implemented a dedicated add-on
providing a live-reloading experience, similar to modern web frameworks.
""" M

    text """
The add-on automatically recompiles the slide deck whenever:
- the grammar is modified
- the slide content changes
- the template file is updated
""" M
    text """
It runs a local development server to display the presentation in a browser,
shows compilation errors in a clear and styled way, and indicates when the
development server is active.
""" M

}


slide {
    transition zoom
        title "Thank you for your attention !"
}