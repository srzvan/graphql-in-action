import crypto from 'crypto';

export function randomString(bytesSize = 32) {
  return crypto.randomBytes(bytesSize).toString('hex');
}

export function extractPrefixedProps(prefixedObject, prefix) {
  const regexp = new RegExp(`^${prefix}_(.*)`);

  return Object.entries(prefixedObject).reduce(reducer, {});

  function reducer(unprefixedObject, [key, value]) {
    const matchesArr = key.match(regexp);

    if (matchesArr) {
      unprefixedObject[matchesArr[1]] = value;
    }

    return unprefixedObject;
  }
}

export function commaSeparatedStringToArray(source) {
  return source.tags.split(',');
}

export function convertArrayToObjectById(arr) {
  return arr.reduce((objectById, currentItem) => {
    objectById[currentItem.id] = currentItem;

    return objectById;
  }, {});
}
