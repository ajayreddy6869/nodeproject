'use strict';

const t = require('tap');
const test = t.test;
const converter = require('../lib/converter')

test('Should convert attribute', t => {
  t.plan(1);
  const code = 'a(href="before#{link}after", test=\'test\')';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'a(href=`before${link}after`, test=\'test\')');
});

test('Should convert intended attribute', t => {
  t.plan(1);
  const code = 'div\n  a(href="before#{link}after", test=\'test\')';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'div\n  a(href=`before${link}after`, test=\'test\')');
});

test('Should convert attributes', t => {
  t.plan(1);
  const code = 'a(href=\'before#{link}after\', test=\'test\')';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'a(href=`before${link}after`, test=\'test\')');
});

test('Should convert attributes without comma', t => {
  t.plan(1);
  const code = 'a(href=\'before#{link}after\' test=\'test\')';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'a(href=`before${link}after` test=\'test\')');
});

test('Should only convert attribute interpolation', t => {
  t.plan(1);
  const code = 'a(href="before${link}after", test=\'test\')';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'a(href="before${link}after", test=\'test\')');
});

test('Should not replace quotation marks inside attribute interpolation', t => {
  t.plan(1);
  const code = 'a(href="before#{link + \'test\'}after", test=\'test\')';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'a(href=`before${link + \'test\'}after`, test=\'test\')');
});

test('Should handle concatination correctly', t => {
  t.plan(1);
  const code = 'a(href="before#{link + \'test\'}after" + test, test=\'test\')';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'a(href=`before${link + \'test\'}after` + test, test=\'test\')');
});

test('Should handle concatination correctly', t => {
  t.plan(1);
  const code = 'a(href="#{test}" + "#{test}")';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'a(href=`${test}` + `${test}`)');
});

test('Should handle concatination correctly', t => {
  t.plan(1);
  const code = 'a(href="#{test}" + \'#{test}\')';

  const resultCode = converter.convert(code);

  t.strictEqual(resultCode, 'a(href=`${test}` + `${test}`)');
});

