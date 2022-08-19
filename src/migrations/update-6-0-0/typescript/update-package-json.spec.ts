import { JsonSchemaForNpmPackageJsonFiles } from '../../../types';
import { updatePackageJson } from './update-package-json';

describe('updatePackageJson()', () => {
  it('should update the @ionic/core dependency to ^6.0.0', () => {
    const packageJson = {
      dependencies: {
        '@ionic/core': '^5.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['@ionic/core']).toEqual('^6.0.0');
  });
});
