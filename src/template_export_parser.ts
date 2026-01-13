import * as fs from "fs";
import { URI } from "langium";
import { createSlideMLServices } from "./language-server/slide-ml-module.js";
import { buildTemplateFromDefinition } from "./generator/model-builder.js";
import { RevealVisitor } from "./generator/reveal-visitor.js";
import path from "path";
import { Template } from './model/template.js';

export function parseTemplateFromFile(filePath: string): Template {
    // Créer Langium
    const { shared } = createSlideMLServices();

    if(!fs.existsSync(filePath)) {
        throw new Error(`Template file not found: ${filePath}`);
    }

    // Lire le fichier DSL
    const input = fs.readFileSync(filePath, "utf-8");

    // Créer le document Langium
    const document = shared.workspace.LangiumDocumentFactory.fromString(
        input,
        URI.file(filePath)
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
        throw new Error("Parsing failed");
    }

    if(!ast.templateExport) {
        throw new Error("The file does not contain a template export");
    }

    const template = buildTemplateFromDefinition(ast.templateExport.definition);

    if(!template) {
        throw new Error("Template could not be built from definition");
    }

    return template;
}