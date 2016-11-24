// @flow

import parser from './grammars/dbn.pegjs';

const source = `

set A 50
pen 50
line 0 55 100 55
line 0 20 100 20
pen 100

`;

try {
  const result = parser.parse(source);
  console.log(result);
} catch (err) {
  console.error(err);
}
