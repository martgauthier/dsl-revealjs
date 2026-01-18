# Pour lancer
Installer les dépendances :
```
npm i
```

Pour générer le parseur :
```
npm run generate
```

Une fois le parseur généré, pour compiler la présentation `input/demo.sml` :
```
npm start
```

Pour lancer l'addon de live-reloading :
```
npm run dev
```

qui va vous proposer une URL à ouvrir dans votre navigateur.

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

Structure du projet:
```
dsl-revealjs/
├─ input/              # Fichiers .sml (DSL)
├─ outout/             # Dossier contenant la présentation   et tous ses assets
├─ src/
|  ├─ dev-server/         # code de l'addon
│  ├─ language-server/    # Grammaire Langium + config
│  ├─ generator/          # AST → HTML (Reveal.js)
│  ├─ model/              # Modèle métier (Diapo, Slide, Component)
│  └─ main.ts             # Point d’entrée du compilateur
|  └─ template_export_parser.ts # fichier permettant la lecture des fichiers d'export de template
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
