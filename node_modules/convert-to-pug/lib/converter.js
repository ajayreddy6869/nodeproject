'use strict';

const attibuteInterpolation = require('./attributeInterpolation');

function convert(code) {
  const lines = code.split('\n');
  let resultCode = '';
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const nextLine = lines[index + 1];
    resultCode += convertLine(line, nextLine);
    if (nextLine !== undefined) {
      resultCode += '\n';
    }
    index++;
  }
  return resultCode;
}

function convertLine(line, nextLine) {
  if (isLegacyMixinCall(line, nextLine)) {
    return convertLegacyMixin(line);
  } else if (attibuteInterpolation.isRelevant(line)) {
    return attibuteInterpolation.convert(line);
  } else if (isPrefixedEach(line)) {
    return convertPrefixedEach(line);
  } else if (isPrefixedFor(line)) {
    return convertPrefixedFor(line);
  }

  return line;
}

function isLegacyMixinCall(line, nextLine) {
  const lineTrimedLeft = line.trimLeft();
  const indentionLength = line.length - lineTrimedLeft.length;
  return lineTrimedLeft.startsWith('mixin ') && (nextLine === undefined || hasSameIndention(nextLine, indentionLength));
}

function isPrefixedEach(line) {
  const lineTrimedLeft = line.trimLeft();
  const indentionLength = line.length - lineTrimedLeft.length;
  return lineTrimedLeft.startsWith('- each') || lineTrimedLeft.startsWith('-each');
}

function isPrefixedFor(line) {
  const lineTrimedLeft = line.trimLeft();
  const indentionLength = line.length - lineTrimedLeft.length;
  return lineTrimedLeft.startsWith('- for') || lineTrimedLeft.startsWith('-for');
}

function hasSameIndention(nextLine, indentionLength) {
  const nextLineTrimedLeft = nextLine.trimLeft();
  const nextLineIndentionLength = nextLine.length - nextLineTrimedLeft.length;
  return nextLineIndentionLength <= indentionLength;
}

function convertLegacyMixin(line) {
  const lineTrimedLeft = line.trimLeft();
  const indentionLength = line.length - lineTrimedLeft.length;
  const indention = line.substring(0, indentionLength);
  return indention + '+' + lineTrimedLeft.substring(6);
}

function convertPrefixedEach(line) {
  return convertPrefixedLoop(line, 'each');
}

function convertPrefixedFor(line) {
  return convertPrefixedLoop(line, 'for');
}

function convertPrefixedLoop(line, type) {
  const lineTrimedLeft = line.trimLeft();
  const indentionLength = line.length - lineTrimedLeft.length;
  const indention = line.substring(0, indentionLength);
  if (lineTrimedLeft.startsWith('- ' + type)) {
    return indention + lineTrimedLeft.substring(2);
  } else {
    return indention + lineTrimedLeft.substring(1);
  }
}

module.exports = {
  convert
}
