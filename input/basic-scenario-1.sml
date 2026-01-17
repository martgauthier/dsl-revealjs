use template "./template_eiffage.sml"

slide {
  title "Construction Project"
  text "Current Status : Ongoing"
  image "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyMJlf8bQvPxdd9AvlFwuhuqsezm_lxod9v_s2UzL5JFD0u1ApSTG8w4njjRxnnlR_mKpJAsPrUTpe0HOkUTFJ2B52ISnB3ZlJcgKoikeRPCKGZlhNlTYcDEl0Jv8HQofMKAwR9=s680-w680-h510-rw" M
}

slide {
  title "Outline"
  text """1. Work done
    - Some work example
    - Some illustration
  2. Video 
  3. Conclusion""" M
}

nestedSlide {
  slide {
    title "Work done"
    text "Some example of work done up to now" {
      display in step 2
    }
    text "some other example" {
      display in step 3
    }
  }

  slide {
    text "no image displayed" {
      replace by "image displayed" in step 2
    }
    image "https://www.franceassureurs.fr/wp-content/uploads/2022/08/4628-fiche-pratique-risques-btp.jpg" {
      display in step 2
    }
  }
}

slide {
  title "Video"
  video "./assets/rick-roll.mp4" autoPlay
}

slide {
  title "Conclusion"
}