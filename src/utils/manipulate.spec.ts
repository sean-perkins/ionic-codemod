import { updateDependency, updateScript } from "./manipulate";

describe('updateDependency()', () => {

  it('should assign the dependency if it does not exist', () => {
    const deps: any = {
      '@angular/core': '12.0.0',
    }
    updateDependency(deps, '@ionic/angular', '7.0.0');
    expect(deps['@ionic/angular']).toEqual('7.0.0');
  });

  it('should respect the existing ^ rules for a package', () => {
    const deps = {
      '@ionic/core': '^5.0.0',
    }
    updateDependency(deps, '@ionic/core', '6.0.0');
    expect(deps).toEqual({
      '@ionic/core': '^6.0.0',
    });
  });

  it('should respect the existing ~ rules for a package', () => {
    const deps = {
      '@ionic/core': '~5.0.0',
    }
    updateDependency(deps, '@ionic/core', '6.0.0');
    expect(deps).toEqual({
      '@ionic/core': '~6.0.0',
    });
  });
});

describe('updateScript()', () => {
  it('should update the script value', () => {
    const scripts = {
      'build': 'ionic build',
    };
    updateScript(scripts, 'build', 'ionic build --prod');
    expect(scripts).toEqual({
      'build': 'ionic build --prod',
    });
  });
});