import { SchematicContext, Tree } from '@angular-devkit/schematics';

import { JsonSchemaForNpmPackageJsonFiles } from '../../../types';
import { writePackageJson } from '../../../utils/output';
import { insertRouterOutletIonTabs } from './insert-router-outlet-ion-tabs';
import { migrateOverlayEventListeners } from './migrate-overlay-event-listeners';
import { updatePackageJson } from './update-package-json';

export default function run(
  tree: Tree,
  context: SchematicContext,
  metadata: {
    packageJson: JsonSchemaForNpmPackageJsonFiles;
  }
) {
  updatePackageJson(metadata.packageJson);
  writePackageJson(tree, metadata.packageJson);

  migrateOverlayEventListeners(tree, context);
  insertRouterOutletIonTabs(tree, context);
}
