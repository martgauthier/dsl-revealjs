diapo {
slide{
    image "https://picsum.dev/300/300"{
        replace by "https://picsum.dev/200/200" in step 1
        hide in step 7
    }
    image "https://picsum.dev/200/200"{
            replace by "https://picsum.dev/300/300" in step 2
            hide in step 7
        }
}
  slide{
    text "Animations"
    frame vertical{
        text "Display animation"{
            display in step 1
        }
        text "Replace animation"{
            display in step 4
        }
        text "And lastly... hide animation"{
            display in step 8
        }
        frame horizontal{
            image "https://picsum.dev/300/200"{
                display in step 3
                replace by "./assets/frog.jpg" in step 5
                hide in step 9
            }
            video "./assets/flower.mp4" {
                display in step 2
                replace by "./rick-roll.mp4" in step 6
                hide in step 9
            }
            image "https://picsum.dev/200/300"{
                display in step 3
                replace by "./assets/frog.jpg" in step 7
                hide in step 9
            }
        }
    }
  }
}