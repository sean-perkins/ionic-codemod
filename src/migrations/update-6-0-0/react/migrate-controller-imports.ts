import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { tsquery } from "@phenomnomnominal/tsquery";
import ts from "typescript";

import { createTsxImportStatement, removeImportSpecifiers } from "../../../utils/typescript";

const CONTROLLER_NAMES = [
  "menuController",
  "actionSheetController",
  "loadingController",
  "modalController",
  "pickerController",
  "popoverController",
  "toastController",
];

const CONTROLLER_IMPORT_DECLARATION_AST_QUERY = CONTROLLER_NAMES.map(controllerName => `ImportDeclaration:has([name="${controllerName}"])`).join(", ");

export const migrateControllerImports = (tree: Tree, context: SchematicContext) => {
  tree.getDir('src').visit(filePath => {
    if (filePath.endsWith('.tsx')) {
      const fileContent = tree.readText(filePath);
      let newContent = fileContent;
      if (fileContent) {
        const sourceFile = tsquery.ast(fileContent);
        // Queries all import declarations that include one of the controller identifiers.
        const controllerImports = tsquery.query<ts.ImportDeclaration>(sourceFile, CONTROLLER_IMPORT_DECLARATION_AST_QUERY, { visitAllChildren: true });
        if (controllerImports.length > 0) {
          context.logger.info(`Deprecated controller imports identified in: ${filePath}...`);
          /**
           * We cannot guarantee that all existing imports will exist in the new location (@ionic/core/components).
           * We will need to generate a new import declaration for the controllers. We can then check
           * if any remaining named imports exist on the previous import declaration and remove the import if it is empty.
           */

          for (const controllerImport of controllerImports) {

            const controllerNamedBindings = controllerImport.importClause?.namedBindings;

            const controllerImportSpecifiers: ts.ImportSpecifier[] = [];

            controllerNamedBindings?.forEachChild(node => {
              if (ts.isImportSpecifier(node)) {
                const importSpecifier = node as ts.ImportSpecifier;
                const importSpecifierName = importSpecifier.name.getText();

                if (CONTROLLER_NAMES.includes(importSpecifierName)) {
                  // We only want to add the import specifier if it is a controller.
                  controllerImportSpecifiers.push(importSpecifier);
                }
              }
            });

            if (controllerImportSpecifiers.length > 0) {
              const result = createTsxImportStatement('@ionic/core/components', ts.factory.createNamedImports(controllerImportSpecifiers), fileContent);

              newContent = tsquery.replace(newContent, CONTROLLER_IMPORT_DECLARATION_AST_QUERY, node => {
                if (ts.isImportDeclaration(node)) {
                  return removeImportSpecifiers(node, ...CONTROLLER_NAMES) + '\n' + result;
                }
                return node.getFullText();
              });

              tree.overwrite(filePath, newContent);
            }
          }
        }
      }
    }
  });
}