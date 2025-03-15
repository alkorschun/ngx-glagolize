import { workspaces } from '@angular-devkit/core';
import { Rule, Tree, SchematicContext, SchematicsException } from '@angular-devkit/schematics';
import { createHost } from '../utilities';
import { Schema as ExtractTranslationsSchema } from './schema';

const TRANSLATION_REGEX = /ngxGlagolize\s+(?:\[\s*key\s*\]|\bkey\b)\s*=\s*["']([^"']+)["']|this\.ngxGlagolizeService\.get\s*\(\s*["']([^"']+)["']\s*\)/g;

function extractKeys(tree: Tree, dir: string, keys: Set<string>): void {
    tree.getDir(dir).subfiles.forEach(file => {
        if (file.endsWith('.html') || file.endsWith('.ts')) {
            const filePath = `${dir}/${file}`;
            const content = tree.read(filePath)?.toString();
            if (content) {
                let match;
                while ((match = TRANSLATION_REGEX.exec(content)) !== null) {
                    keys.add(match[1] || match[2]);
                }
            }
        }
    });

    tree.getDir(dir).subdirs.forEach(subdir => extractKeys(tree, `${dir}/${subdir}`, keys));
}

function updateTranslationFiles(tree: Tree, keys: Set<string>, projectRoot: string): void {
    const langDir = tree.getDir(`${projectRoot}/public/languages`);
    langDir.subfiles.filter(file => file.endsWith('.json')).forEach(file => {
        const filePath = `${projectRoot}/public/languages/${file}`;
        const content = tree.read(filePath)?.toString();

        if (content) {
            const translations = JSON.parse(content);
            let updated = false;

            keys.forEach(key => {
                if (!(key in translations)) {
                    translations[key] = '';
                    updated = true;
                }
            });

            if (updated) {
                tree.overwrite(filePath, JSON.stringify(translations, null, 2));
            }
        }
    });
}

export function extractTranslations(options: ExtractTranslationsSchema): Rule {
    return async (tree: Tree, _context: SchematicContext) => {

        const host = createHost(tree);
        const { workspace } = await workspaces.readWorkspace('/', host);
        const project = options.project != null ? workspace.projects.get(options.project) : null;
        if (!project) {
            throw new SchematicsException(`Invalid project name: ${options.project}`);
        }


        const keys = new Set<string>();
        extractKeys(tree, `${project.root}/src`, keys);
        updateTranslationFiles(tree, keys, project.root);

        return tree;
    };
}
