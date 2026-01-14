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
  (TextComponent | PlotComponent | VideoComponent | ImageComponent | CodeComponent |
  FrameComponent | LatexComponent | TitleComponent ) size=SizeEnum?
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

PlotComponent:
    'plot' '{'
      properties+=PlotProperty*
    '}'
    actionBlock=ActionBlock?
  ;

PlotProperty
  : PlotFunction
  | PlotDomain
  | PlotSamples
  | PlotXUnit
  | PlotYUnit
  ;

PlotFunction
  : 'function' value=STRING
  ;

PlotDomain
  : 'domain' '[' min=UNQUOTED_NO_SPACES ',' max=UNQUOTED_NO_SPACES ']'
  ;

PlotSamples
  : 'samples' value=UNQUOTED_NO_SPACES
  ;

PlotXUnit
  : 'xUnit' value=STRING
  ;

PlotYUnit
  : 'yUnit' value=STRING
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

hidden terminal WS: /\s+/;
hidden terminal NEWLINE: /\r?\n/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
terminal ARROW:
  '=>';
terminal UNQUOTED_NO_SPACES:
  /[^\s\r\n]+/;