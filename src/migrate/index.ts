import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
// import { tsquery } from '@phenomnomnominal/tsquery';
// import { Framework, JsonSchemaForNpmPackageJsonFiles } from '../types';

// import { updateDependency, updateScript } from '../utils/manipulate';
import { parseFramework, readPackageJson } from '../utils/parse';

import migrate_6_0_0 from '../migrations/update-6-0-0';

interface Options {
  to: string;
}

// function migrateDependencies(framework: Framework, version: string, packageJson: JsonSchemaForNpmPackageJsonFiles) {
//   switch (version) {
//     case '6.0.0':
//       switch (framework) {
//         case 'angular':
//           if (packageJson.dependencies) {
//             updateDependency(packageJson.dependencies, '@ionic/angular', '7.0.0');
//           }
//           break;
//         case 'react':
//           if (packageJson.dependencies) {
//             updateDependency(packageJson.dependencies, '@ionic/react', '6.0.0');
//             updateDependency(packageJson.dependencies, '@ionic/react-router', '6.0.0');
//             updateDependency(packageJson.dependencies, 'react', '18.0.0');
//             updateDependency(packageJson.dependencies, 'react-dom', '18.0.0');

//             if (packageJson.scripts) {
//               updateScript(packageJson.scripts, 'test', `react-scripts test --transformIgnorePatterns 'node_modules/(?!(@ionic/react|@ionic/react-router|@ionic/core|@stencil/core|ionicons)/)'`);
//             }
//           }
//           break;
//         case 'vue':
//           if (packageJson.dependencies) {
//             updateDependency(packageJson.dependencies, '@ionic/vue', '6.0.0');
//             updateDependency(packageJson.dependencies, '@ionic/vue-router', '6.0.0');
//             updateDependency(packageJson.dependencies, 'vue', '3.0.0');
//             updateDependency(packageJson.dependencies, 'vue-router', '4.0.0');

//             if (packageJson.jest) {
//               (packageJson.jest as any).transformIgnorePatterns = ['/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons)'];
//             }
//           }
//           break;
//         case 'typescript':
//           if (packageJson.dependencies) {
//             updateDependency(packageJson.dependencies, '@ionic/core', '6.0.0');
//           }
//           break;
//       }
//       break;
//   }
// }

// const writePackageJson = (tree: Tree, packageJson: JsonSchemaForNpmPackageJsonFiles) => {
//   tree.overwrite('/package.json', JSON.stringify(packageJson, null, 2));
// }

// const updatePackageJson = (options: { to: string }): Rule => {
//   return (tree: Tree, _: SchematicContext): Tree => {
//     const packageJson = readPackageJson(tree);
//     const framework = parseFramework(tree, packageJson);

//     migrateDependencies(framework, options.to, packageJson);

//     // console.log('xxx', packageJson);

//     writePackageJson(tree, packageJson);

//     return tree;
//   };
// }

// const migrateTypescript = (): Rule => {
//   return (tree: Tree, _: SchematicContext): Tree => {
//     const packageJson = readPackageJson(tree);
//     const framework = parseFramework(tree, packageJson);

//     switch (framework) {
//       case 'angular':
//         const appModule = tree.readText('/src/app/app.module.ts');

//         if (appModule) {
//           const ast = tsquery.ast(appModule);
//           // const importNodes = tsquery.query(ast, 'ImportDeclaration');
//           const callExpressions = tsquery.query(ast, 'CallExpression');
//           /**
//            * Checking for the following:
//            * import { setupConfig } from '@ionic/core';
//            * setupConfig({ ...});
//            * 
//            * Migrating to:
//            * import { IonicModule } from '@ionic/angular';
//            * IonicModule.forRoot({ ...});
//            */

//           // Find importNodes where the imported name is `setupConfig`.
//           // const setupConfigImportNodes = importNodes.filter(node => {
//           //   return tsquery.query(node, 'Identifier[name="setupConfig"]').length > 0;
//           // });

//           const setupConfigCallExpression = callExpressions.find(node => {
//             return tsquery.query(node, 'Identifier[name="setupConfig"]').length > 0;
//           });

//           if (setupConfigCallExpression) {
//             const SETUP_CONFIG_AST_QUERY = 'CallExpression:has(Identifier[name="setupConfig"])';

//             const matches = tsquery(appModule, SETUP_CONFIG_AST_QUERY, { visitAllChildren: true });
//             if (matches.length !== 0) {
//               matches.forEach(match => {
//                 console.log(match.getStart(), match.getEnd());

//                 const transformStartIndex = match.getStart();
//                 const transformEndIndex = match.getEnd();

//                 const result = `${appModule.slice(0, transformStartIndex)}${appModule.slice(transformEndIndex)}`;

//                 tree.overwrite('/src/app/app.module.ts', result);
//               });
//             }
//           }
//         }

//         break;
//     }


//     return tree;
//   }
// }

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function migrate({ to }: Options): Rule {
  return (tree: Tree, context: SchematicContext) => {

    const migrations = [];

    const packageJson = readPackageJson(tree);
    const framework = parseFramework(tree, packageJson);

    context.logger.info('Running migrations for framework: ' + framework);

    if (to === '6.0.0') {
      migrations.push(
        migrate_6_0_0({ framework, packageJson })
      );
    }

    // const rule = chain([
    // updatePackageJson({ to: options.to }),
    // migrateTypescript()
    // ]);
    const rule = chain(migrations);

    return rule(tree, context);
  };
}


