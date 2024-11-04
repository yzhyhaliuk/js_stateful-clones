'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const obj = { ...state };

  for (const object of actions) {
    const { extraData, keysToRemove } = object;

    if (object.type === 'addProperties') {
      for (const key in extraData) {
        obj[key] = extraData[key];
      }
      stateHistory.push({ ...obj });
    }

    if (object.type === 'removeProperties') {
      for (const key in keysToRemove) {
        delete obj[keysToRemove[key]];
      }
      stateHistory.push({ ...obj });
    }

    if (object.type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
      stateHistory.push({ ...obj });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
