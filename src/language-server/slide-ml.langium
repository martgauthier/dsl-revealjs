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
  TextComponent
;

TextComponent:
  'text' value=STRING
;
