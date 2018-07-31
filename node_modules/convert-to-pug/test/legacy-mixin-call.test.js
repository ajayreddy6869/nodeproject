'use strict';

const t = require('tap');
const test = t.test;
const converter = require('../lib/converter')

test('', t => {
  t.plan(1);
  const code = 'mixin test\n  div hello world!\n\nmixin test';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'mixin test\n  div hello world!\n\n+test');
});

test('Should convert indented legacy mixin call', t => {
  t.plan(1);
  const code = 'mixin test\n  div hello world!\ndiv\n  mixin test';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'mixin test\n  div hello world!\ndiv\n  +test');
});

test('', t => {
  t.plan(1);
  const code = 'mixin test\n  div hello world!\n\nmixin test()';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'mixin test\n  div hello world!\n\n+test()');
});

test('', t => {
  t.plan(1);
  const code = 'mixin test\n  div hello world!\ndiv\nmixin test()\ndiv';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'mixin test\n  div hello world!\ndiv\n+test()\ndiv');
});


test('', t => {
  t.plan(1);
  const code = 'mixin test\n  div hello world!\n\n+test';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'mixin test\n  div hello world!\n\n+test');
});

test('', t => {
  t.plan(1);
  const code = 'mixin test\n  div hello world!\n\n+test()';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'mixin test\n  div hello world!\n\n+test()');
});

test('', t => {
  t.plan(1);
  const code = 'div' +
               '  mixin test\n' +
               '    div hello world!\n' +
               '\n' +
               '  mixin test()\n' +
               '  span';
  const expected = 'div' +
                   '  mixin test\n' +
                   '    div hello world!\n' +
                   '\n' +
                   '  +test()\n' +
                   '  span';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, expected);
});

test('', t => {
  t.plan(1);
  const code = 'div' +
               '  mixin test\n' +
               '    div hello world!\n' +
               '\n' +
               '  mixin test()\n' +
               'span';
  const expected = 'div' +
                   '  mixin test\n' +
                   '    div hello world!\n' +
                   '\n' +
                   '  +test()\n' +
                   'span';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, expected);
});
