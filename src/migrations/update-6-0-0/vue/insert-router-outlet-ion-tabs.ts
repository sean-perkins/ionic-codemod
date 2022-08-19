import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { parse } from 'node-html-parser';

const ION_ROUTER_OUTLET_SELECTOR = 'ion-router-outlet';
const ION_TABS_SELECTOR = 'ion-tabs';

/**
 * Inserts <ion-router-outlet> inside <ion-tabs> when it is missing.
 */
export const insertRouterOutletIonTabs = (
  tree: Tree,
  context: SchematicContext
) => {
  tree.getDir('src').visit(async (filePath) => {
    if (filePath.endsWith('.vue')) {
      const fileContent = tree.readText(filePath);
      // Converts the Vue file contents into an AST-like DOM structure
      const root = parse(fileContent);

      const tabs = root.querySelectorAll(ION_TABS_SELECTOR);

      if (tabs.length > 0) {
        tabs.forEach((tab) => {
          const routerOutlet = tab.querySelector(ION_ROUTER_OUTLET_SELECTOR);
          if (!routerOutlet) {
            context.logger.info(
              `Adding ${ION_ROUTER_OUTLET_SELECTOR} to <${ION_TABS_SELECTOR}> in ${filePath}`
            );
            // Inserts <ion-router-outlet> inside <ion-tabs> at the first position
            tab.insertAdjacentHTML(
              'afterbegin',
              `\n<${ION_ROUTER_OUTLET_SELECTOR}></${ION_ROUTER_OUTLET_SELECTOR}>\n`
            );

            const output = root.toString();

            tree.overwrite(filePath, output);
          }
        });
      }
    }
  });
};
