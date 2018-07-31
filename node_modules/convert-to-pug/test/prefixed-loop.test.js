'use strict';

const t = require('tap');
const test = t.test;
const converter = require('../lib/converter')

test('', t => {
  t.plan(1);
  const code = '- each test in tests';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'each test in tests');
});

test('', t => {
  t.plan(1);
  const code = '- for test in tests';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'for test in tests');
});

test('Should convert indented, prefixed for call', t => {
  t.plan(1);
  const code = '  - for test in tests';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, '  for test in tests');
});

test('Should convert indented, prefixed each call', t => {
  t.plan(1);
  const code = '  - each test in tests';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, '  each test in tests');
});

test('', t => {
  t.plan(1);
  const code = '-each test in tests';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'each test in tests');
});

test('Should convert prefixed for call without space', t => {
  t.plan(1);
  const code = '-for test in tests';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'for test in tests');
});

test('Should convert indented, prefixed for call without space', t => {
  t.plan(1);
  const code = '  -for test in tests';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, '  for test in tests');
});

test('Should convert indented, prefixed each call without space', t => {
  t.plan(1);
  const code = '  -each test in tests';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, '  each test in tests');
});


test('Should convert indented, prefixed each call without space', t => {
  t.plan(1);
  const code = 'div.ratings\n' +
               '  - each rating, index in ratings\n' +
               '    div.rating\n' +
               '      span(class="star-#{rating.stars}")';
  const expected = 'div.ratings\n' +
                   '  each rating, index in ratings\n' +
                   '    div.rating\n' +
                   '      span(class=`star-${rating.stars}`)';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, expected);
});