import {chain, Rule, Tree} from '@angular-devkit/schematics';
import { addRootProvider} from '@schematics/angular/utility';
import { Schema } from './schema';
import { getWorkspace } from '@schematics/angular/utility/workspace';

export function ngAdd(options: Schema):Rule { 
  return async (tree: Tree) => {
    let project = ''
    if(!options.project) {
      const workspace = await getWorkspace(tree);      
      project = Array.from(workspace.projects.keys())[0];
    }else{
      project = options.project;
    }
    
   
    const addNgxGlagolizeConfig = addRootProvider(
      project,
      ({code, external}) => code`${external('provideNgxGlagolizeConfig', 'ngx-glagolize')}({fallbackLanguage: 'en'})`,
    );
  
    return chain([addNgxGlagolizeConfig]); 
  }   
}