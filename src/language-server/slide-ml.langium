grammar SlideML

// ===== TERMINALS =====
terminal STRING:
  '"' ('\\' . | !('\\' | '"'))* '"'
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

hidden terminal WS: /\s+/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;