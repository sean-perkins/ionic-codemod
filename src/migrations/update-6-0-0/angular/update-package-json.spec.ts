import { JsonSchemaForNpmPackageJsonFiles } from '../../../types';
import { updatePackageJson } from './update-package-json';

describe('updatePackageJson()', () => {
  it('should update the @ionic/angular dependency to ^6.0.0', () => {
    const packageJson = {
      dependencies: {
        '@ionic/angular': '^5.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['@ionic/angular']).toEqual('^6.0.0');
  });
});
