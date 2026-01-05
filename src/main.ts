import * as fs from "fs";
import { URI } from "langium";
import { createSlideMLServices } from "./language-server/slide-ml-module.js";
import { buildDiapo } from "./generator/model-builder.js";
import { RevealVisitor } from "./generator/reveal-visitor.js";

// Créer Langium
const { shared } = createSlideMLServices();

// Lire le fichier DSL
const input = fs.readFileSync("src/input/demo.sml", "utf-8");

// Créer le document Langium
const document = shared.workspace.LangiumDocumentFactory.fromString(
    input,
    URI.file("demo.sml")
);

// Parser (et linker)
shared.workspace.DocumentBuilder.build([document], { validation: false });

// Récupérer l’AST
const ast = document.parseResult?.value as any;
if (!ast) {
    console.error("❌ Parsing failed");
    process.exit(1);
}

// AST → modèle métier
const diapo = buildDiapo(ast.diapo);

// Génération Reveal.js
const visitor = new RevealVisitor();
diapo.accept(visitor);

// Écriture du HTML
fs.writeFileSync("index.html", visitor.getResult());
console.log("✅ index.html généré");
