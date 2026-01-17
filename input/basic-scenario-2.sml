tabTitle "Intro to Python"

slide {
    title "Introduction to Python"
}

slide {
    title "Example of code"
    frame horizontal {
        image "https://illustoon.com/photo/7252.png" {
            display in step 1
            replace by "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/LC220MY-FRONT/220x220mm-clariana-mid-yellow-square-120gsm-peel-&-seal-.jpg" in step 2
            replace by "https://illustoon.com/photo/thum/7258.png" in step 3
        } XS

        code language python 
"squareColor='blue'
squareColor='yellow'
squareColor='green' " {
            highlight lines 1 in step 1
            highlight lines 2 in step 2
            highlight lines 3 in step 3
        } XS
    }
}

nestedSlide {
    slide {
      frame vertical {
        title "Some slides with text and pictures"
        frame horizontal {
          text "Some text and picture" 
          image "https://illustoon.com/photo/7252.png" M
        }
        frame horizontal {
          image "https://illustoon.com/photo/thum/7258.png" M
          text "Some other text and other picture"
        }
      }
    }

    slide {
      title "Many pictures"
      frame vertical {
        frame horizontal {
          image "https://illustoon.com/photo/thum/7258.png" S
          image "https://illustoon.com/photo/thum/7258.png" S
          image "https://illustoon.com/photo/thum/7258.png" S
        }
        frame horizontal {
          image "https://illustoon.com/photo/thum/7258.png" S
          text  "and a text" XL
          image "https://illustoon.com/photo/thum/7258.png" S
        }
        frame horizontal {
          image "https://illustoon.com/photo/thum/7258.png" S
          image "https://illustoon.com/photo/thum/7258.png" S
          image "https://illustoon.com/photo/thum/7258.png" S
        }
      }
    }
    
}