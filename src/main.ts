import * as fs from "fs";
import { URI } from "langium";
import { createSlideMLServices } from "./language-server/slide-ml-module.js";
import { buildDiapo } from "./generator/model-builder.js";
import { RevealVisitor } from "./generator/reveal-visitor.js";
import path from "path";
import { AssetResolver } from "./generator/asset-resolver.js";

const INPUT_FILE_PATH = "input/demo.sml";

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
const input = fs.readFileSync(INPUT_FILE_PATH, "utf-8");

// Créer le document Langium
const document = shared.workspace.LangiumDocumentFactory.fromString(
    input,
    URI.file(INPUT_FILE_PATH.split("/")[INPUT_FILE_PATH.split("/").length - 1] as string)
);

// Parser (et linker)
shared.workspace.DocumentBuilder.build([document], { validation: false });

// Récupérer l’AST
const ast = document.parseResult?.value as any;

if (document.parseResult.lexerErrors && document.parseResult.lexerErrors.length > 0) {
    console.error("❌ Erreurs de lexing :");
    for (const error of document.parseResult.lexerErrors) {
        console.error(error.message);
    }
}
if (document.parseResult.parserErrors && document.parseResult.parserErrors.length > 0) {
    console.error("❌ Erreurs de parsing :");
    for (const error of document.parseResult.parserErrors) {
        console.error(error.message);
    }
}

if (!ast) {
    console.error("❌ Parsing failed");
    process.exit(1);
}

// AST → modèle métier
const diapo = buildDiapo(ast.diapo, path.resolve(INPUT_FILE_PATH));

const isDevMode = process.argv.includes("--dev-mode");
const outputDir = path.join(process.cwd(), "output");
await resolveAssets(diapo, outputDir);

// Génération Reveal.js
const visitor = new RevealVisitor(isDevMode);
diapo.accept(visitor);

// Écriture du HTML
fs.writeFileSync("output/index.html", visitor.getResult());
console.log("✅ index.html généré");
