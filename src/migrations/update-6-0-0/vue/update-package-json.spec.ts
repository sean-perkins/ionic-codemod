import { JsonSchemaForNpmPackageJsonFiles } from '../../../types';
import { updatePackageJson } from './update-package-json';

describe('updatePackageJson()', () => {
  it('should update the @ionic/vue dependency to ^6.0.0', () => {
    const packageJson = {
      dependencies: {
        '@ionic/vue': '^5.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['@ionic/vue']).toEqual('^6.0.0');
  });

  it('should update the @ionic/vue-router dependency to ^6.0.0', () => {
    const packageJson = {
      dependencies: {
        '@ionic/vue-router': '^5.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['@ionic/vue-router']).toEqual('^6.0.0');
  });

  it('should update the vue dependency to ^3.0.0', () => {
    const packageJson = {
      dependencies: {
        vue: '^2.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['vue']).toEqual('^3.0.0');
  });

  it('should update the vue-router dependency to ^4.0.0', () => {
    const packageJson = {
      dependencies: {
        'vue-router': '^2.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['vue-router']).toEqual('^4.0.0');
  });

  it('should update the jest config to include the transformIgnorePatterns', () => {
    const packageJson = {
      jest: {
        transformIgnorePatterns: [],
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect((packageJson.jest as any).transformIgnorePatterns).toEqual([
      '/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons)',
    ]);
  });
});
