export class PluginManifest {

  /**
   * webpack symlink
   * @example ./src/plugins/example/example.module
   */
  id: string;

  /**
   * NgModule name
   * @example ExampleNgModule
   */
  name: string;

  /**
   * Path to file
   * @example src-plugins-example-example-module-ts-ngfactory
   */
  path: string;

  get importUrl() {
    return [ this.id, this.name, this.path ].join('#');
  }

  constructor(manifest: Partial<PluginManifest>) {
    this.id = manifest.id;
    this.path = manifest.path;
    this.name = manifest.name;
  }
}
