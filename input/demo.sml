diapo {
  use template "./template_export.sml"

  slide {
    transition in zoom out zoom
    text "hddshdfe"
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
      text "1..."{
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
}