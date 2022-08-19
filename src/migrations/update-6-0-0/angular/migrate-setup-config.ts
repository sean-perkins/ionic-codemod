import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { tsquery } from '@phenomnomnominal/tsquery';
import {
  ArrayLiteralExpression,
  ExpressionStatement,
  ImportDeclaration,
  ObjectLiteralExpression,
} from 'typescript';

const SETUP_CONFIG_AST_QUERY =
  'ExpressionStatement > CallExpression:has(Identifier[name="setupConfig"])';
const IMPORTS_SETUP_CONFIG_AST_QUERY =
  'ImportDeclaration:has(Identifier[name="setupConfig"])';

const IONIC_MODULE_AST_QUERY =
  'ArrayLiteralExpression:has(Identifier[name="IonicModule"])';

const SETUP_CONFIG_ARGS_AST_QUERY =
  'CallExpression:has(Identifier[name="setupConfig"]) > ObjectLiteralExpression';

export const migrateSetupConfig = (tree: Tree, context: SchematicContext) => {
  tree.getDir('src').visit((filePath) => {
    if (filePath.endsWith('.ts')) {
      const fileContent = tree.readText(filePath);
      let newContent = fileContent;
      if (fileContent) {
        const sourceFile = tsquery.ast(fileContent);
        // We query the setupConfig() expression statement to see if it exists.
        const setupConfigExpression = tsquery.query<ExpressionStatement>(
          sourceFile,
          SETUP_CONFIG_AST_QUERY,
          { visitAllChildren: true }
        )[0];
        if (setupConfigExpression) {
          // Then we query the import statement to make sure it is imported from @ionic/core.
          const setupConfigImportDeclaration = tsquery.query<ImportDeclaration>(
            sourceFile,
            IMPORTS_SETUP_CONFIG_AST_QUERY,
            { visitAllChildren: true }
          )[0];
          if (
            setupConfigImportDeclaration.moduleSpecifier
              .getText()
              .includes('@ionic/core')
          ) {
            context.logger.info(
              `Deprecated setupConfig() usage identified in: ${filePath}...`
            );

            const setupConfigLiteralExpression =
              tsquery.query<ObjectLiteralExpression>(
                sourceFile,
                SETUP_CONFIG_ARGS_AST_QUERY,
                { visitAllChildren: true }
              );
            const setupConfigArguments =
              setupConfigLiteralExpression[0].getFullText();

            // We query the IonicModule array literal from the @NgModule imports.
            const importsArray = tsquery.query<ArrayLiteralExpression>(
              sourceFile,
              IONIC_MODULE_AST_QUERY,
              { visitAllChildren: true }
            )[0];
            if (importsArray) {
              /**
               * Replaces the usage of `IonicModule` with `IonicModule.forRoot()`, accepting the same
               * parameters as the current`setupConfig()` expression.
               */
              newContent = tsquery.replace(
                fileContent,
                IONIC_MODULE_AST_QUERY,
                (node: ArrayLiteralExpression) => {
                  if (node.getFullText().includes('IonicModule')) {
                    return `${node
                      .getFullText()
                      .replace(
                        'IonicModule',
                        `IonicModule.forRoot(${setupConfigArguments})`
                      )}`;
                  }
                  return node.getFullText();
                }
              );
            }

            // Remove the setupConfig() call.
            newContent =
              newContent.slice(0, setupConfigExpression.getStart()) +
              newContent.slice(setupConfigExpression.getEnd() + 1);

            // Remove the setupConfig import.
            newContent =
              newContent.slice(0, setupConfigImportDeclaration.getStart()) +
              newContent.slice(setupConfigImportDeclaration.getEnd());

            // Print the output to check our results
            context.logger.info(newContent);
            tree.overwrite(filePath, newContent);
          }
        }
      }
    }
  });
};
