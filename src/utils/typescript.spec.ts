import ts from 'typescript';
import { createImportStatement, createTsxImportStatement } from './typescript';

describe('createTsxImportStatement()', () => {
  it('should create a TSX import statement', () => {
    const importPath = '@ionic/core/components';
    const namedImports = ts.factory.createNamedImports([
      ts.factory.createImportSpecifier(
        false,
        undefined,
        ts.factory.createIdentifier('menuController')
      ),
    ]);
    const sourceText = '';

    const result = createTsxImportStatement(
      importPath,
      namedImports,
      sourceText
    );

    expect(result).toEqual(
      `import { menuController } from "@ionic/core/components";`
    );
  });
});

describe('createImportStatement', () => {
  it('should create a TS import statement', () => {
    const importPath = '@ionic/core/components';
    const namedImports = ts.factory.createNamedImports([
      ts.factory.createImportSpecifier(
        false,
        undefined,
        ts.factory.createIdentifier('menuController')
      ),
    ]);
    const sourceText = '';

    const result = createImportStatement(importPath, namedImports, sourceText);

    expect(result).toEqual(
      `import { menuController } from "@ionic/core/components";`
    );
  });
});
