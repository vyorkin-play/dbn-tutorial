function pass(ast, options) {
  const { importer: { dependencies = {} } = {} } = options;
  const imports = Object.keys(dependencies)
    .map(key => `import ${key} from '${dependencies[key]}';`)
    .join('\n');

  ast.initializer = {
    type: 'initializer',
    code: imports,
  };
}

export default {
  use(config, options) {
    const stage = config.passes.transform;
    stage.push(pass);
  }
};
