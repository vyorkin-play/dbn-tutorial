import { generate } from 'pegjs';
import { createFilter } from 'rollup-pluginutils';
import importer from './importer';
import R from 'ramda';

const dependencies = `
  import R from 'ramda';
`;

const exporter = 'export default';
const knownOptionKeys = ['target', 'include', 'exclude'];

export default (options = {}) => ({
  transform(grammar, id) {
    const exclude = options.exclude;
    const include = options.include || [
      '*.pegjs',
      '**/*.pegjs'
    ];

    const filter = createFilter(include, exclude);

    const match = filter(id);
    if (!match) return;

    const passthroughOptions = R.omit(knownOptionKeys, options);
    const pegjsOptions = Object.assign({}, {
      output: 'source',
    }, passthroughOptions);

    const source = generate(grammar, pegjsOptions);
    const code = `${dependencies} ${exporter} ${source}`;
    const map = { mappings: '' };

    return { code, map };
  }
})
