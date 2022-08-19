import { JsonSchemaForNpmPackageJsonFiles } from '../../../types';
import { updateDependency } from '../../../utils/manipulate';

export const updatePackageJson = (
  packageJson: JsonSchemaForNpmPackageJsonFiles
) => {
  if (packageJson.dependencies) {
    updateDependency(packageJson.dependencies, '@ionic/vue', '6.0.0');
    updateDependency(packageJson.dependencies, '@ionic/vue-router', '6.0.0');
    updateDependency(packageJson.dependencies, 'vue', '3.0.0');
    updateDependency(packageJson.dependencies, 'vue-router', '4.0.0');
  }

  if (packageJson.jest) {
    // TODO likely split this out into a separate migration so we can handle the case when
    // the user has a custom jest config (jest.config.js).
    (packageJson.jest as any).transformIgnorePatterns = [
      '/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons)',
    ];
  }
};
