grammar SlideML

// ===== TERMINALS =====
terminal STRING:
  '"' ('\\' . | !('\\' | '"'))* '"'
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
    slides+=Slide*
  '}'
;

Slide:
  'slide' '{'
    components+=Component*
  '}'
;

Component:
  TextComponent | VideoComponent | ImageComponent | CodeComponent
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