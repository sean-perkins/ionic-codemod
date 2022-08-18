import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { MigrateMetadata } from "../../migrate/migrate-metadata";

import migrateAngular from './angular';
import migrateReact from './react';
import migrateTypescript from './typescript';
import migrateVue from './vue';

export default function migrate(metadata: MigrateMetadata): Rule {
  return (tree: Tree, context: SchematicContext) => {
    switch (metadata.framework) {
      case 'angular':
        migrateAngular(tree, context, metadata);
        break;
      case 'react':
        migrateReact(tree, metadata);
        break;
      case 'typescript':
        migrateTypescript(tree, metadata);
        break;
      case 'vue':
        migrateVue(tree, metadata);
        break;
    };
    return tree;
  }
}