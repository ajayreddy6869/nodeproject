'use strict';

function getMatches(string, regex) {
  const matches = regex.exec(string);
  if (!matches) {
    return null;
  }
  const filteredMatches = matches.filter((match) => match != null);
  return filteredMatches.slice(1)
}

module.exports = {
  getMatches
}
