grammar SlideML

// ===== TERMINALS =====
terminal STRING:
  '"' ('\\' . | !('\\' | '"'))* '"'
;

terminal DIRECTION: 
  'vertical' | 'horizontal'
;

terminal ID:
  /[a-zA-Z_][a-zA-Z0-9_]*/
;

// ===== ENTRY =====
entry Model:
  diapo=Diapo
;

// ===== STRUCTURE =====
Diapo:
  'diapo' '{'
    slides+=AbstractSlide*
  '}'
;

AbstractSlide:
  Slide | NestedSlide
;

Slide:
  'slide' '{'
    components+=Component*
  '}'
;

NestedSlide:
  'nestedSlide' '{'
    subSlides+=Slide*
  '}'
;

Component:
  TextComponent | VideoComponent | ImageComponent | CodeComponent |
  FrameComponent
;

TextComponent:
  'text' value=STRING
;

VideoComponent:
  'video' src=STRING autoPlay?=('autoPlay')?
;

ImageComponent:
  'image' src=STRING ('alt' alt=STRING)?
;

CodeComponent:
    'code'
    'language' language=ID
    value=STRING
;

FrameComponent:
  'frame' direction=DIRECTION '{'
    components+=Component*
  '}'
;