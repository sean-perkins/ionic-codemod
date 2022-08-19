import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { parseFramework, readPackageJson } from '../utils/parse';

import migrate_6_0_0 from '../migrations/update-6-0-0';

interface Options {
  to: string;
}

export function migrate({ to }: Options): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const migrations = [];

    const packageJson = readPackageJson(tree);
    const framework = parseFramework(tree, packageJson);

    context.logger.info('Running migrations for framework: ' + framework);

    if (to === '6.0.0') {
      migrations.push(migrate_6_0_0({ framework, packageJson }));
    }

    const rule = chain(migrations);

    return rule(tree, context);
  };
}
