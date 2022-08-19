import { Framework, JsonSchemaForNpmPackageJsonFiles } from '../types';

export interface MigrateMetadata {
  packageJson: JsonSchemaForNpmPackageJsonFiles;
  framework: Framework;
}
