import { JsonSchemaForNpmPackageJsonFiles } from '../../../types';
import { updatePackageJson } from './update-package-json';

describe('updatePackageJson()', () => {
  it('should update the @ionic/react dependency to ^6.0.0', () => {
    const packageJson = {
      dependencies: {
        '@ionic/react': '^5.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['@ionic/react']).toEqual('^6.0.0');
  });

  it('should update the @ionic/react-router dependency to ^6.0.0', () => {
    const packageJson = {
      dependencies: {
        '@ionic/react-router': '^5.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['@ionic/react-router']).toEqual('^6.0.0');
  });

  it('should update the react dependency to ^18.0.0', () => {
    const packageJson = {
      dependencies: {
        react: '^17.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['react']).toEqual('^18.0.0');
  });

  it('should update the react-dom dependency to ^18.0.0', () => {
    const packageJson = {
      dependencies: {
        'react-dom': '^17.0.0',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.dependencies!['react-dom']).toEqual('^18.0.0');
  });

  it('should update the test script to include the transformIgnorePatterns', () => {
    const packageJson = {
      scripts: {
        test: 'react-scripts test',
      },
    } as unknown as JsonSchemaForNpmPackageJsonFiles;

    updatePackageJson(packageJson);
    expect(packageJson.scripts!.test).toEqual(
      `react-scripts test --transformIgnorePatterns 'node_modules/(?!(@ionic/react|@ionic/react-router|@ionic/core|@stencil/core|ionicons)/)'`
    );
  });
});
