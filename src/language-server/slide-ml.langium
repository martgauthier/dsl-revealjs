grammar SlideML

// ===== TERMINALS =====
terminal ML_STRING: 
  '"""' -> '"""'
;

terminal STRING:
  '"' ('\\' . | !('\\' | '"'))* '"'
;


terminal DIRECTION: 
  'vertical' | 'horizontal'
;

terminal AnnotationsEnabled:
  'enable annotations';

// ===== UTILITIES =====
StringValue returns string:
  STRING | ML_STRING
;

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

SizeEnum returns string:
  'XL' | 'L' | 'M' | 'S' | 'XS'
;
Diapo:
  'diapo' '{'
    annotationsEnabled=AnnotationsEnabled?
    slides+=AbstractSlide*
  '}'
;


AbstractSlide:
  Slide | NestedSlide
;

NestedSlide:
  'nestedSlide' '{'
    subSlides+=Slide*
  '}'
;

Slide:
  'slide' '{'
    components+=Component*
  '}'
;

Component:
  (TextComponent | VideoComponent | ImageComponent | CodeComponent |
  FrameComponent | LatexComponent | TitleComponent) size=SizeEnum?
;

TextComponent:
  'text' value=StringValue
;

VideoComponent:
  'video' 'src' src=STRING autoPlay?=('autoPlay')?
;

ImageComponent:
  'image' src=STRING ('alt' alt=STRING)?
;

CodeComponent:
  'code'
  value=STRING
;

FrameComponent:
  'frame' direction=DIRECTION '{'
    components+=Component*
  '}'
;

LatexComponent:
  'latex' formula=StringValue
;

TitleComponent:
  'title' text=STRING
;

hidden terminal WS: /\s+/;
hidden terminal NEWLINE: /\r?\n/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;