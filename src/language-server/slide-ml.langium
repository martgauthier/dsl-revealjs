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

terminal SizeEnum:
  'XS' | 'S'  | 'M' | 'L' | 'XL';

// ===== UTILITIES =====
StringBinding:
  key=STRING '=>' value=STRING;

// ===== ENTRY =====
entry Model:
  (template=Template)?
  diapo=Diapo
;


// ===== TEMPLATE ======
Template:
  'use' 'template' (definition=TemplateDefinition | include=TemplateInclude);

TemplateInclude:
  value=STRING;

TemplateDefinition:
  '{' 
    sections+=TemplateSection*
  '}';

// below "Temp" stands for Template
TemplateSection: Temp_Header |
                  Temp_Footer |
                  Temp_Fonts |
                  Temp_Colors |
                  Temp_Background |
                  Temp_FontSizes |
                  Temp_Dimensions;

Temp_Header: 'header' '{' value=Component '}';

Temp_Footer: 'footer' '{' value=Component '}';

Temp_Fonts: 'fonts' '{' fontMappings+=StringBinding* '}';

Temp_Colors: 'colors' '{' colorMappings+=StringBinding* '}';

Temp_Background: 'background' '=>' backgroundValue=STRING;

Temp_FontSizes: 'fontSizes' '{' fontSizeMappings+=StringBinding* '}';

Temp_Dimensions: 'dimensions' '{' dimensionMappings+=SizeMapping* '}';

SizeMapping:
  key=STRING '=>' value=SizeEnum;

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
  'text' value=STRING actionBlock=ActionBlock?
;

VideoComponent:
  'video' src=STRING autoPlay?=('autoPlay')? actionBlock=ActionBlock?
;

ImageComponent:
  'image' src=STRING ('alt' alt=STRING)? actionBlock=ActionBlock?
;

CodeComponent:
    'code'
    'language' language=ID
    value=STRING
    actionBlock=ActionBlock?
;

FrameComponent:
  'frame' direction=DIRECTION '{'
    components+=Component*
    actionBlock=ActionBlock?
  '}'
;

ActionBlock:
  '{' actions+=Action* '}'
;

Action:
  DisplayAction | HideAction | HighlightAction | ReplaceAction
;

DisplayAction:
  'display' ('in' 'step' step=INT)?
;

HideAction:
  'hide' ('in' 'step' step=INT)?
;

HighlightAction:
  'highlight' 'lines' range=LineRange ('in' 'step' step=INT)?
;

ReplaceAction:
  'replace' 'by' update=STRING ('in' 'step' step=INT)?
;

LineRange:
  start=INT ('-' end=INT)?
;

terminal INT returns number:
  /[0-9]+/
;

hidden terminal WS: /\s+/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;