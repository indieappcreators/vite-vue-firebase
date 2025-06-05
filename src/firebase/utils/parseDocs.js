/**
 * Simple object check.
 * @param docs
 * @returns {Object}
 */

export default function getData (docs) {
  return docs.reduce((accumulator, doc) => {
    accumulator[doc.id] = doc.data();
    return accumulator
  }, {});
}