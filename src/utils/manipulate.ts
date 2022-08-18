

/**
 * Updates a dependency in a package.json file.
 * @param deps The collection of parsed dependencies.
 * @param name The name of the dependency to update.
 * @param newVersion The new version of the dependency.
 */
export const updateDependency = (deps: Record<string, string>, name: string, newVersion: string) => {
  const oldVersion = deps[name];
  // We only respect caret and tilde ranges on update.
  const execResult = /^[\^~]/.exec(oldVersion);
  deps[name] = `${execResult ? execResult[0] : ''}${newVersion}`;
};

/**
 * Updates the script value in a package.json file.
 * @param scripts The collection of parsed scripts.
 * @param name The name of the script to update.
 * @param newValue The new value of the script.
 */
export const updateScript = (scripts: Record<string, string>, name: string, newValue: string) => {
  scripts[name] = newValue;
}