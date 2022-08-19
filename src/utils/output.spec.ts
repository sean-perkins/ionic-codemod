import { Tree } from "@angular-devkit/schematics";
import { JsonSchemaForNpmPackageJsonFiles } from "../types";
import { writePackageJson } from "./output";


describe('writePackageJson()', () => {

  it('should write to package.json', () => {
    const tree = {
      overwrite: jest.fn()
    } as unknown as Tree;
    const packageJson = {
      name: 'test',
      version: '0.0.0',
      dependencies: {}
    } as JsonSchemaForNpmPackageJsonFiles;

    writePackageJson(tree, packageJson);

    expect(tree.overwrite).toHaveBeenCalledWith('/package.json', JSON.stringify(packageJson, null, 2));
  });

});