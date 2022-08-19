import { SchematicsException, Tree } from '@angular-devkit/schematics';

import { Framework, JsonSchemaForNpmPackageJsonFiles } from '../types';

export const readPackageJson = (tree: Tree) => {
  const packageJsonContent = tree.read('/package.json');
  if (!packageJsonContent) {
    throw new SchematicsException(
      'Could not find a package.json. Are you in a Node project?'
    );
  }
  let packageJson: JsonSchemaForNpmPackageJsonFiles;
  try {
    packageJson = JSON.parse(
      packageJsonContent.toString()
    ) as JsonSchemaForNpmPackageJsonFiles;
  } catch (e) {
    throw new SchematicsException(
      'package.json could not be parsed: ' + e.message
    );
  }
  return packageJson;
};

/**
 * Parse the framework by looking at the dependencies in package.json.
 * @param tree The file system tree.
 * @param packageJson The parsed package.json.
 * @returns The framework.
 */
export const parseFramework = (
  tree: Tree,
  packageJson: JsonSchemaForNpmPackageJsonFiles
): Framework => {
  if (
    packageJson.dependencies!['@ionic/angular'] ||
    tree.get('/angular.json') ||
    tree.get('/workspace.json')
  ) {
    return 'angular';
  } else if (packageJson.dependencies!['@ionic/react']) {
    return 'react';
  } else if (packageJson.dependencies!['@ionic/vue']) {
    return 'vue';
  }
  return 'typescript';
};
