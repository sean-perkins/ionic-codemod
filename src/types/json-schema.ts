import type { Manifest } from 'pacote';

export interface JsonSchemaForNpmPackageJsonFiles extends Manifest {
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
}
