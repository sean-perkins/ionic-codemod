import { JsonSchemaForNpmPackageJsonFiles } from '../../../types';
import { updateDependency } from '../../../utils/manipulate';

export const updatePackageJson = (
  packageJson: JsonSchemaForNpmPackageJsonFiles
) => {
  if (packageJson.dependencies) {
    updateDependency(packageJson.dependencies, '@ionic/angular', '6.0.0');
  }
};
