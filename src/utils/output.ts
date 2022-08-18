import { Tree } from "@angular-devkit/schematics";
import { JsonSchemaForNpmPackageJsonFiles } from "../types";

/**
 * Writes the package.json contents to the file system.
 * @param tree The file system tree.
 * @param packageJson The package.json contents.
 */
export const writePackageJson = (tree: Tree, packageJson: JsonSchemaForNpmPackageJsonFiles) => {
  tree.overwrite('/package.json', JSON.stringify(packageJson, null, 2));
}
