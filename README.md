# Pour lancer
Installer les dépendances :
```
npm i
```
Fichier input: src/input/demo.sml

```
diapo {
  slide {
    text "Hello DSL"
  }

  slide {
    text "Second slide"
  }
}

```
Génerer le parseur + Génerer le html ( index.html à la racine )
```
npm start
```

Structure du projet:
```
dsl-revealjs/
├─ src/
│  ├─ input/              # Fichiers .sml (DSL)
│  ├─ language-server/    # Grammaire Langium + config
│  ├─ generator/          # AST → HTML (Reveal.js)
│  ├─ model/              # Modèle métier (Diapo, Slide, Component)
│  └─ main.ts             # Point d’entrée du compilateur
├─ index.html             # HTML généré
├─ package.json
└─ tsconfig.json

```

Fonctionnement global:
```
.sml (DSL)
   ↓
Langium (parser)
   ↓
AST (Abstract Syntax Tree)
   ↓
Model Builder (objets métier)
   ↓
Reveal Visitor
   ↓
index.html (Reveal.js)

```