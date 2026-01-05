grammar SlideML

// ===== TERMINALS =====
terminal ML_STRING: 
  '"""' -> '"""'
;

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
StringValue returns string:
  STRING | ML_STRING
;
Component:
  TextComponent | VideoComponent | ImageComponent | LatexComponent
;

TextComponent:
  'text' value=StringValue
;

VideoComponent:
  'video' src=STRING autoPlay?=('autoPlay')?
;

ImageComponent:
  'image' src=STRING ('alt' alt=STRING)?
;

LatexComponent:
  'latex' formula=StringValue
;