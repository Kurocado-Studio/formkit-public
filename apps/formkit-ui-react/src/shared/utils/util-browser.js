/**
 * Browser stub for Node's "util" module so dependencies that dynamically
 * require("util") (e.g. inside @kurocado-studio/shadcn-systemhaus-react) resolve.
 */

function format(f, ...args) {
  if (typeof f !== 'string') {
    return [f, ...args].map((x) => (typeof x === 'object' && x !== null ? inspect(x) : String(x))).join(' ');
  }
  let i = 0;
  return String(f).replace(/%[sdj%]/g, (x) => {
    if (x === '%%') return '%';
    if (i >= args.length) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
}

function inspect(obj) {
  if (obj === null) return 'null';
  if (typeof obj !== 'object') return String(obj);
  try {
    return JSON.stringify(obj);
  } catch {
    return '[Object]';
  }
}

function deprecate(fn) {
  return fn;
}

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => (err ? reject(err) : resolve(result)));
    });
  };
}

function callbackify(fn) {
  return function (...args) {
    const cb = args.pop();
    if (typeof cb !== 'function') throw new TypeError('callback required');
    fn(...args).then((v) => cb(null, v), (e) => cb(e));
  };
}

function debuglog() {
  return function () {};
}

function inherits(ctor, superCtor) {
  if (superCtor == null) throw new TypeError('superCtor is null');
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true },
  });
}

const types = {
  isArrayBuffer: (v) => Object.prototype.toString.call(v) === '[object ArrayBuffer]',
  isDate: (v) => v instanceof Date,
  isMap: (v) => typeof Map !== 'undefined' && v instanceof Map,
  isRegExp: (v) => v instanceof RegExp,
  isSet: (v) => typeof Set !== 'undefined' && v instanceof Set,
  isTypedArray: (v) =>
    typeof ArrayBuffer !== 'undefined' &&
    typeof ArrayBuffer.isView !== 'undefined' &&
    ArrayBuffer.isView(v),
};

export default {
  format,
  inspect,
  deprecate,
  promisify,
  callbackify,
  debuglog,
  inherits,
  types,
  TextEncoder: typeof TextEncoder !== 'undefined' ? TextEncoder : undefined,
  TextDecoder: typeof TextDecoder !== 'undefined' ? TextDecoder : undefined,
};

export {
  format,
  inspect,
  deprecate,
  promisify,
  callbackify,
  debuglog,
  inherits,
  types,
};
