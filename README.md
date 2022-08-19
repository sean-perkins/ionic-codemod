# Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Local Development

Install the dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Run the schematic with a relative path to the project:

```bash
schematics ../../../:migrate
```

> This is an example when running the schematic with the CWD being a project within demo/framework/framework-version.

You can optionally pass a flag for the upgrade version:

```bash
schematics ../../../:migrate --to=6.0.0
```

If you want to commit the local changes to the file system:

```bash
schematics ../../../:migrate --to=6.0.0 --dry-run=false
```

### Testing

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with

```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
