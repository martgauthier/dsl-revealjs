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

UnquotedStringBinding:
  key=UNQUOTED_NO_SPACES ARROW value=UNQUOTED_NO_SPACES;

// ===== ENTRY =====
entry Model:
  diapo=Diapo | templateExport=TemplateExport
;


// ===== TEMPLATE ======
TemplateDefinitionOrInclude:
  'use' 'template' (definition=TemplateDefinition | include=TemplateInclude);

TemplateExport:
  'export' 'template' definition=TemplateDefinition
;

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

Temp_Fonts: 'fonts' '{' fontMappings+=UnquotedStringBinding+ '}';

Temp_Colors: 'colors' '{' colorMappings+=UnquotedStringBinding+ '}';

Temp_Background: 'background' ARROW backgroundValue=STRING;

Temp_FontSizes: 'fontSizes' '{' fontSizeMappings+=UnquotedStringBinding+ '}';

Temp_Dimensions: 'dimensions' '{' dimensionMappings+=SizeMapping+ '}';

SizeMapping:
  key=UNQUOTED_NO_SPACES ARROW value=SizeEnum;

// ===== STRUCTURE =====

SizeEnum returns string:
  'XL' | 'L' | 'M' | 'S' | 'XS'
;

Diapo:
  'diapo' title=StringValue? '{'
    template=TemplateDefinitionOrInclude?
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
  'text' value=StringValue actionBlock=ActionBlock?
;

VideoComponent:
  'video' 'src' src=STRING autoPlay?=('autoPlay')? actionBlock=ActionBlock?
;

ImageComponent:
  'image' src=STRING ('alt' alt=STRING)? actionBlock=ActionBlock?
;

CodeComponent:
    'code'
    'language' language=UNQUOTED_NO_SPACES
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
  'display' ('in' 'step' step=UNQUOTED_NO_SPACES)?
;

HideAction:
  'hide' ('in' 'step' step=UNQUOTED_NO_SPACES)?
;

HighlightAction:
  'highlight' 'lines' range=LineRange ('in' 'step' step=UNQUOTED_NO_SPACES)?
;

ReplaceAction:
  'replace' 'by' update=STRING ('in' 'step' step=UNQUOTED_NO_SPACES)?
;

LineRange:
  start=UNQUOTED_NO_SPACES ('-' end=UNQUOTED_NO_SPACES)?
;

LatexComponent:
  'latex' formula=StringValue
  actionBlock=ActionBlock?
;

TitleComponent:
  'title' text=STRING
  actionBlock=ActionBlock?
;

terminal ARROW:
  '=>';
terminal UNQUOTED_NO_SPACES:
  /[^\s\r\n]+/;

hidden terminal WS: /\s+/;
hidden terminal NEWLINE: /\r?\n/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;