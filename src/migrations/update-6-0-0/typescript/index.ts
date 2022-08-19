import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { JsonSchemaForNpmPackageJsonFiles } from '../../../types';
import { writePackageJson } from '../../../utils/output';
import { updatePackageJson } from './update-package-json';

export default function run(
  tree: Tree,
  _context: SchematicContext,
  metadata: {
    packageJson: JsonSchemaForNpmPackageJsonFiles;
  }
) {
  updatePackageJson(metadata.packageJson);
  writePackageJson(tree, metadata.packageJson);
}
