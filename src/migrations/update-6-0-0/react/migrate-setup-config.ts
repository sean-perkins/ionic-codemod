import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { tsquery } from '@phenomnomnominal/tsquery';
import {
  createPrinter,
  createSourceFile,
  EmitHint,
  ExpressionStatement,
  factory,
  ImportDeclaration,
  NewLineKind,
  ObjectLiteralExpression,
  ScriptKind,
  ScriptTarget,
} from 'typescript';

const SETUP_CONFIG_AST_QUERY =
  'ExpressionStatement > CallExpression:has(Identifier[name="setupConfig"])';
const IMPORTS_SETUP_CONFIG_AST_QUERY =
  'ImportDeclaration:has(Identifier[name="setupConfig"])';

export const migrateSetupConfig = (tree: Tree, context: SchematicContext) => {
  tree.getDir('src').visit((filePath) => {
    if (filePath.endsWith('.tsx')) {
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
              .includes('@ionic/react')
          ) {
            context.logger.info(
              `Deprecated setupConfig() usage identified in: ${filePath}...`
            );

            // Replace setupConfig with the new setupIonicConfig method.
            newContent = tsquery.replace(
              newContent,
              SETUP_CONFIG_AST_QUERY,
              (node: ExpressionStatement) => {
                const setupConfigAst = tsquery.ast(node.getFullText());
                const setupConfigExpression =
                  tsquery.query<ObjectLiteralExpression>(
                    setupConfigAst,
                    'CallExpression > ObjectLiteralExpression'
                  )[0];

                const setupIonicConfigExpressionStatement =
                  factory.createExpressionStatement(
                    factory.createCallExpression(
                      factory.createIdentifier('setupIonicConfig'),
                      undefined,
                      [setupConfigExpression]
                    )
                  );

                const resultFile = createSourceFile(
                  'update.tsx',
                  node.getFullText(),
                  ScriptTarget.Latest,
                  true,
                  ScriptKind.TSX
                );
                const printer = createPrinter({
                  newLine: NewLineKind.LineFeed,
                });

                const result = printer.printNode(
                  EmitHint.Unspecified,
                  setupIonicConfigExpressionStatement,
                  resultFile
                );

                return result;
              }
            );

            // Replace the import statement.
            newContent = tsquery.replace(
              newContent,
              IMPORTS_SETUP_CONFIG_AST_QUERY,
              (node: ImportDeclaration) => {
                return node
                  .getFullText()
                  .replace(`setupConfig`, `setupIonicConfig`);
              }
            );

            tree.overwrite(filePath, newContent);
          }
        }
      }
    }
  });
};
