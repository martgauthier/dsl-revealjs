import * as fs from "fs";
import { URI } from "langium";
import { createSlideMLServices } from "./language-server/slide-ml-module.js";
import { buildDiapo } from "./generator/model-builder.js";
import { RevealVisitor } from "./generator/reveal-visitor.js";
import path from "path";
import { AssetResolver } from "./generator/asset-resolver.js";

async function resolveAssets(diapo: any, outputDir: string) {
    const resolver = new AssetResolver(outputDir);

    for (const slide of diapo.slides) {
        const slides =
            "subSlides" in slide ? slide.subSlides : [slide];

        for (const s of slides) {
            for (const component of s.components) {
                if ("src" in component && typeof component.src === "string") {
                    component.src = await resolver.resolve(component.src);
                }
            }
        }
    }
}

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

const outputDir = process.cwd();
await resolveAssets(diapo, outputDir);

// Génération Reveal.js
const visitor = new RevealVisitor();
diapo.accept(visitor);

// Écriture du HTML
fs.writeFileSync("index.html", visitor.getResult());
console.log("✅ index.html généré");
