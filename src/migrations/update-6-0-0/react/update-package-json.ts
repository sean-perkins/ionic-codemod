import { JsonSchemaForNpmPackageJsonFiles } from '../../../types';
import { updateDependency, updateScript } from '../../../utils/manipulate';

export const updatePackageJson = (
  packageJson: JsonSchemaForNpmPackageJsonFiles
) => {
  if (packageJson.dependencies) {
    updateDependency(packageJson.dependencies, '@ionic/react', '6.0.0');
    updateDependency(packageJson.dependencies, '@ionic/react-router', '6.0.0');
    updateDependency(packageJson.dependencies, 'react', '18.0.0');
    updateDependency(packageJson.dependencies, 'react-dom', '18.0.0');
  }

  if (packageJson.scripts) {
    updateScript(
      packageJson.scripts,
      'test',
      `react-scripts test --transformIgnorePatterns 'node_modules/(?!(@ionic/react|@ionic/react-router|@ionic/core|@stencil/core|ionicons)/)'`
    );
  }
};
