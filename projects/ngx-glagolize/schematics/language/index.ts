import {
    Rule,
    Tree,
    SchematicsException,
    apply,
    url,
    applyTemplates,
    move,
    chain,
    mergeWith,
   
} from '@angular-devkit/schematics';
import { normalize, workspaces, } from '@angular-devkit/core';
import { Schema as LanguageSchema } from './schema';
import { createHost } from '../utilities';

export function language(options: LanguageSchema): Rule {
    return async (tree: Tree) => {
        const host = createHost(tree);
        const { workspace } = await workspaces.readWorkspace('/', host);
        const project = options.project != null ? workspace.projects.get(options.project) : null;
        if (!project) {
            throw new SchematicsException(`Invalid project name: ${options.project}`);
        }

        const path = `${project.root}/public/languages`;
        const templateSource = apply(url('./files'), [
            applyTemplates({
                code:options.code
             }),
            move(normalize(path as string)),
        ]);

        return chain([mergeWith(templateSource)]);

    };
}