grammar SlideML

// ===== TERMINALS =====
terminal STRING:
  '"' ('\\' . | !('\\' | '"'))* '"'
;

// ===== ENTRY =====
entry Model:
  diapo=Diapo
;

// ===== STRUCTURE =====
Diapo:
  'diapo' '{'
    slides+=Slide*
  '}'
;

Slide:
  'slide' '{'
    components+=Component*
  '}'
;

Component:
  TextComponent | VideoComponent | ImageComponent
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
