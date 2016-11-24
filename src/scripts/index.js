// @flow

import parser from './grammars/simple.pegjs';

export default function run() {
  const source = `aaabbabbbaba`;
  try {
    const result = parser.parse(source);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
