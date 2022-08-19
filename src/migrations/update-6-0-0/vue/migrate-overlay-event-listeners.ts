import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { parse } from 'node-html-parser';

/**
 * Migrates the overlay event listeners from the old format to the new format.
 */
export const migrateOverlayEventListeners = (
  tree: Tree,
  context: SchematicContext
) => {
  tree.getDir('src').visit(async (filePath) => {
    if (filePath.endsWith('.vue')) {
      const fileContent = tree.readText(filePath);

      // Converts the Vue file contents into an AST-like DOM structure
      const root = parse(fileContent);

      const effectedOverlays = [
        'ion-action-sheet',
        'ion-alert',
        'ion-loading',
        'ion-modal',
        'ion-picker',
        'ion-popover',
        'ion-toast',
      ];

      // TODO need to do this for all overlays, not just modals. Break it out into a util.
      const overlaysToMigrates = root
        .querySelectorAll(effectedOverlays.join(', '))
        .filter((overlay) => {
          if (
            overlay.hasAttribute('onwillpresent') ||
            overlay.hasAttribute('ondidpresent') ||
            overlay.hasAttribute('onwilldismiss') ||
            overlay.hasAttribute('ondiddismiss')
          ) {
            return true;
          }
          return false;
        });

      if (overlaysToMigrates.length > 0) {
        context.logger.info(
          `Migrating ${overlaysToMigrates.length} overlays in ${filePath}`
        );

        overlaysToMigrates.forEach((overlay) => {
          if (overlay.hasAttribute('onwillpresent')) {
            overlay.setAttribute(
              '@willPresent',
              overlay.getAttribute('onwillpresent')!
            );
            overlay.removeAttribute('onWillPresent');
          }
          if (overlay.hasAttribute('ondidpresent')) {
            overlay.setAttribute(
              '@didPresent',
              overlay.getAttribute('ondidpresent')!
            );
            overlay.removeAttribute('onDidPresent');
          }
          if (overlay.hasAttribute('onwilldismiss')) {
            overlay.setAttribute(
              '@willDismiss',
              overlay.getAttribute('onwilldismiss')!
            );
            overlay.removeAttribute('onWillDismiss');
          }
          if (overlay.hasAttribute('ondiddismiss')) {
            overlay.setAttribute(
              '@didDismiss',
              overlay.getAttribute('ondiddismiss')!
            );
            overlay.removeAttribute('onDidDismiss');
          }
        });

        const output = root.toString();

        tree.overwrite(filePath, output);
      }
    }
  });
};
