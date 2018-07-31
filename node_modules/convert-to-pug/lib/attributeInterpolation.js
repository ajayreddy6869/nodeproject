'use strict';

const utils = require('./utils');

function convert(line) {
  const lineTrimedLeft = line.trimLeft();
  const indentionLength = line.length - lineTrimedLeft.length;
  const indention = line.substring(0, indentionLength);
  const tagPartsRegex = /^(\w+)([(])(\w+.*,? )*(\w.*)([)])(.*)$/g;
  let matches = utils.getMatches(lineTrimedLeft, tagPartsRegex);
  const [ tag, openingBrace, ...rest ] = matches;
  let attributes = rest.slice(0, rest.length - 2);
  const closingBrace = rest.slice(rest.length - 2, rest.length - 1)[0];
  const andAttributes = rest.slice(rest.length - 1)[0];

  attributes = attributes.map(convertAttribute);
  return `${indention}${tag}${openingBrace}${attributes.join('')}${closingBrace}${andAttributes}`;
}

function convertAttribute(attribute) {
  if (attribute.includes('#{')) {
    let [ name, middle, end ] = utils.getMatches(attribute, /^(\w+=)(.*?)(,? ?)?$/);
    let parts = getRepeatedMatches(middle);
    parts = parts.map((part) => {
      if ((part[0] === '"' || part[0] === '\'') && part.includes('#{')) {
        const partWithReplacedInterpolation = part.split('#{').join('${')
        return '\`' + partWithReplacedInterpolation.substring(1, part.length - 1) + '\`';
      } else {
        return part;
      }
    })

    return name + parts.join('') + (end || '');
  }
  return attribute;
}

function isRelevant(line) {
  const lineTrimedLeft = line.trimLeft();
  const tagPartsRegex = /^(\w+)([(])(\w+.*,? )*(\w.*)([)])(.*)$/g;
  const matches = utils.getMatches(lineTrimedLeft, tagPartsRegex);
  if (matches === null) {
    return false;
  }
  const [ tag, openingBrace, ...rest ] = matches;
  const attributes = rest.slice(0, rest.length - 2);

  return attributes.some((attribute) => attribute.includes('#{'));
}

function getRepeatedMatches(string) {
  let toReplace = '';
  let matches = [];
  let result = [];
  while (matches != null) {
    const lastIndexOf = string.lastIndexOf(toReplace);
    string = string.substring(0, lastIndexOf);
    matches = utils.getMatches(string, /^("[^"]*"|'[^']*'| ?\+ ?|`[^`]*`|\w+)*.*$/g);
    if (matches && matches.length > 0) {
      let [ match ] = matches;
      toReplace = match;
      result.unshift(match);
    } else {
      break;
    }
  }
  return result;
}

module.exports = {
  convert,
  isRelevant
}

