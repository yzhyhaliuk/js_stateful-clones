'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const copyState = { ...state };

  for (const object of actions) {
    const { extraData, keysToRemove } = object;

    if (object.type === 'addProperties') {
      for (const key in extraData) {
        copyState[key] = extraData[key];
      }
      stateHistory.push({ ...copyState });
    }

    if (object.type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete copyState[key];
      }
      stateHistory.push({ ...copyState });
    }

    if (object.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
      stateHistory.push({ ...copyState });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
