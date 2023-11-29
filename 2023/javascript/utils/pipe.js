const pipe = (...funcs) => (initialValue) => funcs.reduce((val, func) => func(val), initialValue);

export default pipe;
