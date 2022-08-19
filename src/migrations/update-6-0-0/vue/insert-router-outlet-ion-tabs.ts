import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { parse } from "node-html-parser";

/**
 * Inserts <ion-router-outlet> inside <ion-tabs> when it is missing.
 */
export const insertRouterOutletIonTabs = (tree: Tree, context: SchematicContext) => {
  tree.getDir('src').visit(async filePath => {
    if (filePath.endsWith('.vue')) {
      const fileContent = tree.readText(filePath);

      // Converts the Vue file contents into an AST-like DOM structure
      const root = parse(fileContent);

      const tabs = root.querySelectorAll('ion-tabs');

      if (tabs.length > 0) {
        tabs.forEach(tab => {
          const routerOutlet = tab.querySelector('ion-router-outlet');
          if (!routerOutlet) {
            context.logger.info(`Adding ion-router-outlet to <ion-tabs> in ${filePath}`);

            tab.insertAdjacentHTML('afterbegin', '\n<ion-router-outlet></ion-router-outlet>\n');

            const output = root.toString();

            tree.overwrite(filePath, output);
          }
        });
      }
    }
  });
};