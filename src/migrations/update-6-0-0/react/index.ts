import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { JsonSchemaForNpmPackageJsonFiles } from "../../../types";
import { writePackageJson } from "../../../utils/output";
import { migrateSetupConfig } from "./migrate-setup-config";
import { updatePackageJson } from "./update-package-json";

export default function run(tree: Tree, context: SchematicContext, metadata: {
  packageJson: JsonSchemaForNpmPackageJsonFiles;
}) {
  updatePackageJson(metadata.packageJson);
  writePackageJson(tree, metadata.packageJson);

  migrateSetupConfig(tree, context);
}