const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        if (key === 'fields' && object[key]) {
            obj[key] = object[key].split(',').join(' ') || '';
        }
        return obj;
    }, {});
};

export {
    pick
};