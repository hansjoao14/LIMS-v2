import {
  BehaviorSubject,
  EMPTY,
  Inject,
  Injectable,
  InjectionToken,
  NgZone,
  Observable,
  Optional,
  ReplaySubject,
  Subject,
  __assign,
  __objRest,
  __restKey,
  __spreadProps,
  __spreadValues,
  catchError,
  concat,
  distinctUntilChanged,
  filter,
  finalize,
  from,
  lastValueFrom,
  map,
  materialize,
  mergeMap,
  observeOn,
  of,
  queueScheduler,
  setClassMetadata,
  share,
  shareReplay,
  startWith,
  tap,
  throwError,
  timer,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-4XEQTJJK.js";

// node_modules/@wry/equality/lib/index.js
var { toString, hasOwnProperty } = Object.prototype;
var fnToStr = Function.prototype.toString;
var previousComparisons = /* @__PURE__ */ new Map();
function equal(a, b) {
  try {
    return check(a, b);
  } finally {
    previousComparisons.clear();
  }
}
function check(a, b) {
  if (a === b) {
    return true;
  }
  const aTag = toString.call(a);
  const bTag = toString.call(b);
  if (aTag !== bTag) {
    return false;
  }
  switch (aTag) {
    case "[object Array]":
      if (a.length !== b.length)
        return false;
    // Fall through to object case...
    case "[object Object]": {
      if (previouslyCompared(a, b))
        return true;
      const aKeys = definedKeys(a);
      const bKeys = definedKeys(b);
      const keyCount = aKeys.length;
      if (keyCount !== bKeys.length)
        return false;
      for (let k = 0; k < keyCount; ++k) {
        if (!hasOwnProperty.call(b, aKeys[k])) {
          return false;
        }
      }
      for (let k = 0; k < keyCount; ++k) {
        const key = aKeys[k];
        if (!check(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    case "[object Error]":
      return a.name === b.name && a.message === b.message;
    case "[object Number]":
      if (a !== a)
        return b !== b;
    // Fall through to shared +a === +b case...
    case "[object Boolean]":
    case "[object Date]":
      return +a === +b;
    case "[object RegExp]":
    case "[object String]":
      return a == `${b}`;
    case "[object Map]":
    case "[object Set]": {
      if (a.size !== b.size)
        return false;
      if (previouslyCompared(a, b))
        return true;
      const aIterator = a.entries();
      const isMap = aTag === "[object Map]";
      while (true) {
        const info = aIterator.next();
        if (info.done)
          break;
        const [aKey, aValue] = info.value;
        if (!b.has(aKey)) {
          return false;
        }
        if (isMap && !check(aValue, b.get(aKey))) {
          return false;
        }
      }
      return true;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    // Buffer, in Node.js.
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      a = new Uint8Array(a);
      b = new Uint8Array(b);
    // Fall through...
    case "[object DataView]": {
      let len = a.byteLength;
      if (len === b.byteLength) {
        while (len-- && a[len] === b[len]) {
        }
      }
      return len === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      const aCode = fnToStr.call(a);
      if (aCode !== fnToStr.call(b)) {
        return false;
      }
      return !endsWith(aCode, nativeCodeSuffix);
    }
  }
  return false;
}
function definedKeys(obj) {
  return Object.keys(obj).filter(isDefinedKey, obj);
}
function isDefinedKey(key) {
  return this[key] !== void 0;
}
var nativeCodeSuffix = "{ [native code] }";
function endsWith(full, suffix) {
  const fromIndex = full.length - suffix.length;
  return fromIndex >= 0 && full.indexOf(suffix, fromIndex) === fromIndex;
}
function previouslyCompared(a, b) {
  let bSet = previousComparisons.get(a);
  if (bSet) {
    if (bSet.has(b))
      return true;
  } else {
    previousComparisons.set(a, bSet = /* @__PURE__ */ new Set());
  }
  bSet.add(b);
  return false;
}

// node_modules/@wry/trie/lib/index.js
var defaultMakeData = () => /* @__PURE__ */ Object.create(null);
var { forEach, slice } = Array.prototype;
var { hasOwnProperty: hasOwnProperty2 } = Object.prototype;
var Trie = class _Trie {
  constructor(weakness = true, makeData = defaultMakeData) {
    this.weakness = weakness;
    this.makeData = makeData;
  }
  lookup() {
    return this.lookupArray(arguments);
  }
  lookupArray(array) {
    let node = this;
    forEach.call(array, (key) => node = node.getChildTrie(key));
    return hasOwnProperty2.call(node, "data") ? node.data : node.data = this.makeData(slice.call(array));
  }
  peek() {
    return this.peekArray(arguments);
  }
  peekArray(array) {
    let node = this;
    for (let i = 0, len = array.length; node && i < len; ++i) {
      const map2 = node.mapFor(array[i], false);
      node = map2 && map2.get(array[i]);
    }
    return node && node.data;
  }
  remove() {
    return this.removeArray(arguments);
  }
  removeArray(array) {
    let data;
    if (array.length) {
      const head = array[0];
      const map2 = this.mapFor(head, false);
      const child = map2 && map2.get(head);
      if (child) {
        data = child.removeArray(slice.call(array, 1));
        if (!child.data && !child.weak && !(child.strong && child.strong.size)) {
          map2.delete(head);
        }
      }
    } else {
      data = this.data;
      delete this.data;
    }
    return data;
  }
  getChildTrie(key) {
    const map2 = this.mapFor(key, true);
    let child = map2.get(key);
    if (!child)
      map2.set(key, child = new _Trie(this.weakness, this.makeData));
    return child;
  }
  mapFor(key, create) {
    return this.weakness && isObjRef(key) ? this.weak || (create ? this.weak = /* @__PURE__ */ new WeakMap() : void 0) : this.strong || (create ? this.strong = /* @__PURE__ */ new Map() : void 0);
  }
};
function isObjRef(value) {
  switch (typeof value) {
    case "object":
      if (value === null)
        break;
    // Fall through to return true...
    case "function":
      return true;
  }
  return false;
}

// node_modules/@wry/caches/lib/strong.js
function defaultDispose() {
}
var StrongCache = class {
  constructor(max = Infinity, dispose = defaultDispose) {
    this.max = max;
    this.dispose = dispose;
    this.map = /* @__PURE__ */ new Map();
    this.newest = null;
    this.oldest = null;
  }
  has(key) {
    return this.map.has(key);
  }
  get(key) {
    const node = this.getNode(key);
    return node && node.value;
  }
  get size() {
    return this.map.size;
  }
  getNode(key) {
    const node = this.map.get(key);
    if (node && node !== this.newest) {
      const { older, newer } = node;
      if (newer) {
        newer.older = older;
      }
      if (older) {
        older.newer = newer;
      }
      node.older = this.newest;
      node.older.newer = node;
      node.newer = null;
      this.newest = node;
      if (node === this.oldest) {
        this.oldest = newer;
      }
    }
    return node;
  }
  set(key, value) {
    let node = this.getNode(key);
    if (node) {
      return node.value = value;
    }
    node = {
      key,
      value,
      newer: null,
      older: this.newest
    };
    if (this.newest) {
      this.newest.newer = node;
    }
    this.newest = node;
    this.oldest = this.oldest || node;
    this.map.set(key, node);
    return node.value;
  }
  clean() {
    while (this.oldest && this.map.size > this.max) {
      this.delete(this.oldest.key);
    }
  }
  delete(key) {
    const node = this.map.get(key);
    if (node) {
      if (node === this.newest) {
        this.newest = node.older;
      }
      if (node === this.oldest) {
        this.oldest = node.newer;
      }
      if (node.newer) {
        node.newer.older = node.older;
      }
      if (node.older) {
        node.older.newer = node.newer;
      }
      this.map.delete(key);
      this.dispose(node.value, key);
      return true;
    }
    return false;
  }
};

// node_modules/@wry/caches/lib/weak.js
function noop() {
}
var defaultDispose2 = noop;
var _WeakRef = typeof WeakRef !== "undefined" ? WeakRef : function(value) {
  return { deref: () => value };
};
var _WeakMap = typeof WeakMap !== "undefined" ? WeakMap : Map;
var _FinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : function() {
  return {
    register: noop,
    unregister: noop
  };
};
var finalizationBatchSize = 10024;
var WeakCache = class {
  constructor(max = Infinity, dispose = defaultDispose2) {
    this.max = max;
    this.dispose = dispose;
    this.map = new _WeakMap();
    this.newest = null;
    this.oldest = null;
    this.unfinalizedNodes = /* @__PURE__ */ new Set();
    this.finalizationScheduled = false;
    this.size = 0;
    this.finalize = () => {
      const iterator = this.unfinalizedNodes.values();
      for (let i = 0; i < finalizationBatchSize; i++) {
        const node = iterator.next().value;
        if (!node)
          break;
        this.unfinalizedNodes.delete(node);
        const key = node.key;
        delete node.key;
        node.keyRef = new _WeakRef(key);
        this.registry.register(key, node, node);
      }
      if (this.unfinalizedNodes.size > 0) {
        queueMicrotask(this.finalize);
      } else {
        this.finalizationScheduled = false;
      }
    };
    this.registry = new _FinalizationRegistry(this.deleteNode.bind(this));
  }
  has(key) {
    return this.map.has(key);
  }
  get(key) {
    const node = this.getNode(key);
    return node && node.value;
  }
  getNode(key) {
    const node = this.map.get(key);
    if (node && node !== this.newest) {
      const { older, newer } = node;
      if (newer) {
        newer.older = older;
      }
      if (older) {
        older.newer = newer;
      }
      node.older = this.newest;
      node.older.newer = node;
      node.newer = null;
      this.newest = node;
      if (node === this.oldest) {
        this.oldest = newer;
      }
    }
    return node;
  }
  set(key, value) {
    let node = this.getNode(key);
    if (node) {
      return node.value = value;
    }
    node = {
      key,
      value,
      newer: null,
      older: this.newest
    };
    if (this.newest) {
      this.newest.newer = node;
    }
    this.newest = node;
    this.oldest = this.oldest || node;
    this.scheduleFinalization(node);
    this.map.set(key, node);
    this.size++;
    return node.value;
  }
  clean() {
    while (this.oldest && this.size > this.max) {
      this.deleteNode(this.oldest);
    }
  }
  deleteNode(node) {
    if (node === this.newest) {
      this.newest = node.older;
    }
    if (node === this.oldest) {
      this.oldest = node.newer;
    }
    if (node.newer) {
      node.newer.older = node.older;
    }
    if (node.older) {
      node.older.newer = node.newer;
    }
    this.size--;
    const key = node.key || node.keyRef && node.keyRef.deref();
    this.dispose(node.value, key);
    if (!node.keyRef) {
      this.unfinalizedNodes.delete(node);
    } else {
      this.registry.unregister(node);
    }
    if (key)
      this.map.delete(key);
  }
  delete(key) {
    const node = this.map.get(key);
    if (node) {
      this.deleteNode(node);
      return true;
    }
    return false;
  }
  scheduleFinalization(node) {
    this.unfinalizedNodes.add(node);
    if (!this.finalizationScheduled) {
      this.finalizationScheduled = true;
      queueMicrotask(this.finalize);
    }
  }
};

// node_modules/@wry/context/lib/slot.js
var currentContext = null;
var MISSING_VALUE = {};
var idCounter = 1;
var makeSlotClass = () => class Slot {
  constructor() {
    this.id = [
      "slot",
      idCounter++,
      Date.now(),
      Math.random().toString(36).slice(2)
    ].join(":");
  }
  hasValue() {
    for (let context = currentContext; context; context = context.parent) {
      if (this.id in context.slots) {
        const value = context.slots[this.id];
        if (value === MISSING_VALUE)
          break;
        if (context !== currentContext) {
          currentContext.slots[this.id] = value;
        }
        return true;
      }
    }
    if (currentContext) {
      currentContext.slots[this.id] = MISSING_VALUE;
    }
    return false;
  }
  getValue() {
    if (this.hasValue()) {
      return currentContext.slots[this.id];
    }
  }
  withValue(value, callback, args, thisArg) {
    const slots = {
      __proto__: null,
      [this.id]: value
    };
    const parent = currentContext;
    currentContext = { parent, slots };
    try {
      return callback.apply(thisArg, args);
    } finally {
      currentContext = parent;
    }
  }
  // Capture the current context and wrap a callback function so that it
  // reestablishes the captured context when called.
  static bind(callback) {
    const context = currentContext;
    return function() {
      const saved = currentContext;
      try {
        currentContext = context;
        return callback.apply(this, arguments);
      } finally {
        currentContext = saved;
      }
    };
  }
  // Immediately run a callback function without any captured context.
  static noContext(callback, args, thisArg) {
    if (currentContext) {
      const saved = currentContext;
      try {
        currentContext = null;
        return callback.apply(thisArg, args);
      } finally {
        currentContext = saved;
      }
    } else {
      return callback.apply(thisArg, args);
    }
  }
};
function maybe(fn) {
  try {
    return fn();
  } catch (ignored) {
  }
}
var globalKey = "@wry/context:Slot";
var host = (
  // Prefer globalThis when available.
  // https://github.com/benjamn/wryware/issues/347
  maybe(() => globalThis) || // Fall back to global, which works in Node.js and may be converted by some
  // bundlers to the appropriate identifier (window, self, ...) depending on the
  // bundling target. https://github.com/endojs/endo/issues/576#issuecomment-1178515224
  maybe(() => global) || // Otherwise, use a dummy host that's local to this module. We used to fall
  // back to using the Array constructor as a namespace, but that was flagged in
  // https://github.com/benjamn/wryware/issues/347, and can be avoided.
  /* @__PURE__ */ Object.create(null)
);
var globalHost = host;
var Slot = globalHost[globalKey] || // Earlier versions of this package stored the globalKey property on the Array
// constructor, so we check there as well, to prevent Slot class duplication.
Array[globalKey] || (function(Slot2) {
  try {
    Object.defineProperty(globalHost, globalKey, {
      value: Slot2,
      enumerable: false,
      writable: false,
      // When it was possible for globalHost to be the Array constructor (a
      // legacy Slot dedup strategy), it was important for the property to be
      // configurable:true so it could be deleted. That does not seem to be as
      // important when globalHost is the global object, but I don't want to
      // cause similar problems again, and configurable:true seems safest.
      // https://github.com/endojs/endo/issues/576#issuecomment-1178274008
      configurable: true
    });
  } finally {
    return Slot2;
  }
})(makeSlotClass());

// node_modules/@wry/context/lib/index.js
var { bind, noContext } = Slot;

// node_modules/optimism/lib/context.js
var parentEntrySlot = new Slot();

// node_modules/optimism/lib/helpers.js
var { hasOwnProperty: hasOwnProperty3 } = Object.prototype;
var arrayFromSet = Array.from || function(set) {
  const array = [];
  set.forEach((item) => array.push(item));
  return array;
};
function maybeUnsubscribe(entryOrDep) {
  const { unsubscribe } = entryOrDep;
  if (typeof unsubscribe === "function") {
    entryOrDep.unsubscribe = void 0;
    unsubscribe();
  }
}

// node_modules/optimism/lib/entry.js
var emptySetPool = [];
var POOL_TARGET_SIZE = 100;
function assert(condition, optionalMessage) {
  if (!condition) {
    throw new Error(optionalMessage || "assertion failure");
  }
}
function valueIs(a, b) {
  const len = a.length;
  return (
    // Unknown values are not equal to each other.
    len > 0 && // Both values must be ordinary (or both exceptional) to be equal.
    len === b.length && // The underlying value or exception must be the same.
    a[len - 1] === b[len - 1]
  );
}
function valueGet(value) {
  switch (value.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return value[0];
    case 2:
      throw value[1];
  }
}
function valueCopy(value) {
  return value.slice(0);
}
var Entry = class _Entry {
  constructor(fn) {
    this.fn = fn;
    this.parents = /* @__PURE__ */ new Set();
    this.childValues = /* @__PURE__ */ new Map();
    this.dirtyChildren = null;
    this.dirty = true;
    this.recomputing = false;
    this.value = [];
    this.deps = null;
    ++_Entry.count;
  }
  peek() {
    if (this.value.length === 1 && !mightBeDirty(this)) {
      rememberParent(this);
      return this.value[0];
    }
  }
  // This is the most important method of the Entry API, because it
  // determines whether the cached this.value can be returned immediately,
  // or must be recomputed. The overall performance of the caching system
  // depends on the truth of the following observations: (1) this.dirty is
  // usually false, (2) this.dirtyChildren is usually null/empty, and thus
  // (3) valueGet(this.value) is usually returned without recomputation.
  recompute(args) {
    assert(!this.recomputing, "already recomputing");
    rememberParent(this);
    return mightBeDirty(this) ? reallyRecompute(this, args) : valueGet(this.value);
  }
  setDirty() {
    if (this.dirty)
      return;
    this.dirty = true;
    reportDirty(this);
    maybeUnsubscribe(this);
  }
  dispose() {
    this.setDirty();
    forgetChildren(this);
    eachParent(this, (parent, child) => {
      parent.setDirty();
      forgetChild(parent, this);
    });
  }
  forget() {
    this.dispose();
  }
  dependOn(dep2) {
    dep2.add(this);
    if (!this.deps) {
      this.deps = emptySetPool.pop() || /* @__PURE__ */ new Set();
    }
    this.deps.add(dep2);
  }
  forgetDeps() {
    if (this.deps) {
      arrayFromSet(this.deps).forEach((dep2) => dep2.delete(this));
      this.deps.clear();
      emptySetPool.push(this.deps);
      this.deps = null;
    }
  }
};
Entry.count = 0;
function rememberParent(child) {
  const parent = parentEntrySlot.getValue();
  if (parent) {
    child.parents.add(parent);
    if (!parent.childValues.has(child)) {
      parent.childValues.set(child, []);
    }
    if (mightBeDirty(child)) {
      reportDirtyChild(parent, child);
    } else {
      reportCleanChild(parent, child);
    }
    return parent;
  }
}
function reallyRecompute(entry, args) {
  forgetChildren(entry);
  parentEntrySlot.withValue(entry, recomputeNewValue, [entry, args]);
  if (maybeSubscribe(entry, args)) {
    setClean(entry);
  }
  return valueGet(entry.value);
}
function recomputeNewValue(entry, args) {
  entry.recomputing = true;
  const { normalizeResult } = entry;
  let oldValueCopy;
  if (normalizeResult && entry.value.length === 1) {
    oldValueCopy = valueCopy(entry.value);
  }
  entry.value.length = 0;
  try {
    entry.value[0] = entry.fn.apply(null, args);
    if (normalizeResult && oldValueCopy && !valueIs(oldValueCopy, entry.value)) {
      try {
        entry.value[0] = normalizeResult(entry.value[0], oldValueCopy[0]);
      } catch (_a) {
      }
    }
  } catch (e) {
    entry.value[1] = e;
  }
  entry.recomputing = false;
}
function mightBeDirty(entry) {
  return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}
function setClean(entry) {
  entry.dirty = false;
  if (mightBeDirty(entry)) {
    return;
  }
  reportClean(entry);
}
function reportDirty(child) {
  eachParent(child, reportDirtyChild);
}
function reportClean(child) {
  eachParent(child, reportCleanChild);
}
function eachParent(child, callback) {
  const parentCount = child.parents.size;
  if (parentCount) {
    const parents = arrayFromSet(child.parents);
    for (let i = 0; i < parentCount; ++i) {
      callback(parents[i], child);
    }
  }
}
function reportDirtyChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(mightBeDirty(child));
  const parentWasClean = !mightBeDirty(parent);
  if (!parent.dirtyChildren) {
    parent.dirtyChildren = emptySetPool.pop() || /* @__PURE__ */ new Set();
  } else if (parent.dirtyChildren.has(child)) {
    return;
  }
  parent.dirtyChildren.add(child);
  if (parentWasClean) {
    reportDirty(parent);
  }
}
function reportCleanChild(parent, child) {
  assert(parent.childValues.has(child));
  assert(!mightBeDirty(child));
  const childValue = parent.childValues.get(child);
  if (childValue.length === 0) {
    parent.childValues.set(child, valueCopy(child.value));
  } else if (!valueIs(childValue, child.value)) {
    parent.setDirty();
  }
  removeDirtyChild(parent, child);
  if (mightBeDirty(parent)) {
    return;
  }
  reportClean(parent);
}
function removeDirtyChild(parent, child) {
  const dc = parent.dirtyChildren;
  if (dc) {
    dc.delete(child);
    if (dc.size === 0) {
      if (emptySetPool.length < POOL_TARGET_SIZE) {
        emptySetPool.push(dc);
      }
      parent.dirtyChildren = null;
    }
  }
}
function forgetChildren(parent) {
  if (parent.childValues.size > 0) {
    parent.childValues.forEach((_value, child) => {
      forgetChild(parent, child);
    });
  }
  parent.forgetDeps();
  assert(parent.dirtyChildren === null);
}
function forgetChild(parent, child) {
  child.parents.delete(parent);
  parent.childValues.delete(child);
  removeDirtyChild(parent, child);
}
function maybeSubscribe(entry, args) {
  if (typeof entry.subscribe === "function") {
    try {
      maybeUnsubscribe(entry);
      entry.unsubscribe = entry.subscribe.apply(null, args);
    } catch (e) {
      entry.setDirty();
      return false;
    }
  }
  return true;
}

// node_modules/optimism/lib/dep.js
var EntryMethods = {
  setDirty: true,
  dispose: true,
  forget: true
  // Fully remove parent Entry from LRU cache and computation graph
};
function dep(options) {
  const depsByKey = /* @__PURE__ */ new Map();
  const subscribe = options && options.subscribe;
  function depend(key) {
    const parent = parentEntrySlot.getValue();
    if (parent) {
      let dep2 = depsByKey.get(key);
      if (!dep2) {
        depsByKey.set(key, dep2 = /* @__PURE__ */ new Set());
      }
      parent.dependOn(dep2);
      if (typeof subscribe === "function") {
        maybeUnsubscribe(dep2);
        dep2.unsubscribe = subscribe(key);
      }
    }
  }
  depend.dirty = function dirty(key, entryMethodName) {
    const dep2 = depsByKey.get(key);
    if (dep2) {
      const m = entryMethodName && hasOwnProperty3.call(EntryMethods, entryMethodName) ? entryMethodName : "setDirty";
      arrayFromSet(dep2).forEach((entry) => entry[m]());
      depsByKey.delete(key);
      maybeUnsubscribe(dep2);
    }
  };
  return depend;
}

// node_modules/optimism/lib/index.js
var defaultKeyTrie;
function defaultMakeCacheKey(...args) {
  const trie = defaultKeyTrie || (defaultKeyTrie = new Trie(typeof WeakMap === "function"));
  return trie.lookupArray(args);
}
var caches = /* @__PURE__ */ new Set();
function wrap(originalFunction, { max = Math.pow(2, 16), keyArgs, makeCacheKey = defaultMakeCacheKey, normalizeResult, subscribe, cache: cacheOption = StrongCache } = /* @__PURE__ */ Object.create(null)) {
  const cache = typeof cacheOption === "function" ? new cacheOption(max, (entry) => entry.dispose()) : cacheOption;
  const optimistic = function() {
    const key = makeCacheKey.apply(null, keyArgs ? keyArgs.apply(null, arguments) : arguments);
    if (key === void 0) {
      return originalFunction.apply(null, arguments);
    }
    let entry = cache.get(key);
    if (!entry) {
      cache.set(key, entry = new Entry(originalFunction));
      entry.normalizeResult = normalizeResult;
      entry.subscribe = subscribe;
      entry.forget = () => cache.delete(key);
    }
    const value = entry.recompute(Array.prototype.slice.call(arguments));
    cache.set(key, entry);
    caches.add(cache);
    if (!parentEntrySlot.hasValue()) {
      caches.forEach((cache2) => cache2.clean());
      caches.clear();
    }
    return value;
  };
  Object.defineProperty(optimistic, "size", {
    get: () => cache.size,
    configurable: false,
    enumerable: false
  });
  Object.freeze(optimistic.options = {
    max,
    keyArgs,
    makeCacheKey,
    normalizeResult,
    subscribe,
    cache
  });
  function dirtyKey(key) {
    const entry = key && cache.get(key);
    if (entry) {
      entry.setDirty();
    }
  }
  optimistic.dirtyKey = dirtyKey;
  optimistic.dirty = function dirty() {
    dirtyKey(makeCacheKey.apply(null, arguments));
  };
  function peekKey(key) {
    const entry = key && cache.get(key);
    if (entry) {
      return entry.peek();
    }
  }
  optimistic.peekKey = peekKey;
  optimistic.peek = function peek() {
    return peekKey(makeCacheKey.apply(null, arguments));
  };
  function forgetKey(key) {
    return key ? cache.delete(key) : false;
  }
  optimistic.forgetKey = forgetKey;
  optimistic.forget = function forget() {
    return forgetKey(makeCacheKey.apply(null, arguments));
  };
  optimistic.makeCacheKey = makeCacheKey;
  optimistic.getKey = keyArgs ? function getKey() {
    return makeCacheKey.apply(null, keyArgs.apply(null, arguments));
  } : makeCacheKey;
  return Object.freeze(optimistic);
}

// node_modules/graphql/jsutils/devAssert.mjs
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}

// node_modules/graphql/jsutils/isObjectLike.mjs
function isObjectLike(value) {
  return typeof value == "object" && value !== null;
}

// node_modules/graphql/jsutils/invariant.mjs
function invariant(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(
      message != null ? message : "Unexpected invariant triggered."
    );
  }
}

// node_modules/graphql/language/location.mjs
var LineRegExp = /\r\n|[\n\r]/g;
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;
  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === "number" || invariant(false);
    if (match.index >= position) {
      break;
    }
    lastLineStart = match.index + match[0].length;
    line += 1;
  }
  return {
    line,
    column: position + 1 - lastLineStart
  };
}

// node_modules/graphql/language/printLocation.mjs
function printLocation(location) {
  return printSourceLocation(
    location.source,
    getLocation(location.source, location.start)
  );
}
function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = "".padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}
`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];
    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([
      [`${lineNum} |`, subLines[0]],
      ...subLines.slice(1, subLineIndex + 1).map((subLine) => ["|", subLine]),
      ["|", "^".padStart(subLineColumnNum)],
      ["|", subLines[subLineIndex + 1]]
    ]);
  }
  return locationStr + printPrefixedLines([
    // Lines specified like this: ["prefix", "string"],
    [`${lineNum - 1} |`, lines[lineIndex - 1]],
    [`${lineNum} |`, locationLine],
    ["|", "^".padStart(columnNum)],
    [`${lineNum + 1} |`, lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== void 0);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines.map(([prefix, line]) => prefix.padStart(padLen) + (line ? " " + line : "")).join("\n");
}

// node_modules/graphql/error/GraphQLError.mjs
function toNormalizedOptions(args) {
  const firstArg = args[0];
  if (firstArg == null || "kind" in firstArg || "length" in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5]
    };
  }
  return firstArg;
}
var GraphQLError = class _GraphQLError extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(message, ...rawArgs) {
    var _this$nodes, _nodeLocations$, _ref;
    const { nodes, source, positions, path, originalError, extensions } = toNormalizedOptions(rawArgs);
    super(message);
    this.name = "GraphQLError";
    this.path = path !== null && path !== void 0 ? path : void 0;
    this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
    this.nodes = undefinedIfEmpty(
      Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0
    );
    const nodeLocations = undefinedIfEmpty(
      (_this$nodes = this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.map((node) => node.loc).filter((loc) => loc != null)
    );
    this.source = source !== null && source !== void 0 ? source : nodeLocations === null || nodeLocations === void 0 ? void 0 : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === void 0 ? void 0 : _nodeLocations$.source;
    this.positions = positions !== null && positions !== void 0 ? positions : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => loc.start);
    this.locations = positions && source ? positions.map((pos) => getLocation(source, pos)) : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
    const originalExtensions = isObjectLike(
      originalError === null || originalError === void 0 ? void 0 : originalError.extensions
    ) ? originalError === null || originalError === void 0 ? void 0 : originalError.extensions : void 0;
    this.extensions = (_ref = extensions !== null && extensions !== void 0 ? extensions : originalExtensions) !== null && _ref !== void 0 ? _ref : /* @__PURE__ */ Object.create(null);
    Object.defineProperties(this, {
      message: {
        writable: true,
        enumerable: true
      },
      name: {
        enumerable: false
      },
      nodes: {
        enumerable: false
      },
      source: {
        enumerable: false
      },
      positions: {
        enumerable: false
      },
      originalError: {
        enumerable: false
      }
    });
    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(this, "stack", {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _GraphQLError);
    } else {
      Object.defineProperty(this, "stack", {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let output = this.message;
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.loc) {
          output += "\n\n" + printLocation(node.loc);
        }
      }
    } else if (this.source && this.locations) {
      for (const location of this.locations) {
        output += "\n\n" + printSourceLocation(this.source, location);
      }
    }
    return output;
  }
  toJSON() {
    const formattedError = {
      message: this.message
    };
    if (this.locations != null) {
      formattedError.locations = this.locations;
    }
    if (this.path != null) {
      formattedError.path = this.path;
    }
    if (this.extensions != null && Object.keys(this.extensions).length > 0) {
      formattedError.extensions = this.extensions;
    }
    return formattedError;
  }
};
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}

// node_modules/graphql/error/syntaxError.mjs
function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position]
  });
}

// node_modules/graphql/language/ast.mjs
var Location = class {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
};
var Token = class {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
};
var QueryDocumentKeys = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "description",
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: [
    "description",
    "variable",
    "type",
    "defaultValue",
    "directives"
  ],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "description",
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"],
  TypeCoordinate: ["name"],
  MemberCoordinate: ["name", "memberName"],
  ArgumentCoordinate: ["name", "fieldName", "argumentName"],
  DirectiveCoordinate: ["name"],
  DirectiveArgumentCoordinate: ["name", "argumentName"]
};
var kindValues = new Set(Object.keys(QueryDocumentKeys));
function isNode(maybeNode) {
  const maybeKind = maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === "string" && kindValues.has(maybeKind);
}
var OperationTypeNode;
(function(OperationTypeNode2) {
  OperationTypeNode2["QUERY"] = "query";
  OperationTypeNode2["MUTATION"] = "mutation";
  OperationTypeNode2["SUBSCRIPTION"] = "subscription";
})(OperationTypeNode || (OperationTypeNode = {}));

// node_modules/graphql/language/directiveLocation.mjs
var DirectiveLocation;
(function(DirectiveLocation2) {
  DirectiveLocation2["QUERY"] = "QUERY";
  DirectiveLocation2["MUTATION"] = "MUTATION";
  DirectiveLocation2["SUBSCRIPTION"] = "SUBSCRIPTION";
  DirectiveLocation2["FIELD"] = "FIELD";
  DirectiveLocation2["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
  DirectiveLocation2["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
  DirectiveLocation2["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
  DirectiveLocation2["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
  DirectiveLocation2["SCHEMA"] = "SCHEMA";
  DirectiveLocation2["SCALAR"] = "SCALAR";
  DirectiveLocation2["OBJECT"] = "OBJECT";
  DirectiveLocation2["FIELD_DEFINITION"] = "FIELD_DEFINITION";
  DirectiveLocation2["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
  DirectiveLocation2["INTERFACE"] = "INTERFACE";
  DirectiveLocation2["UNION"] = "UNION";
  DirectiveLocation2["ENUM"] = "ENUM";
  DirectiveLocation2["ENUM_VALUE"] = "ENUM_VALUE";
  DirectiveLocation2["INPUT_OBJECT"] = "INPUT_OBJECT";
  DirectiveLocation2["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
})(DirectiveLocation || (DirectiveLocation = {}));

// node_modules/graphql/language/kinds.mjs
var Kind;
(function(Kind2) {
  Kind2["NAME"] = "Name";
  Kind2["DOCUMENT"] = "Document";
  Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
  Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
  Kind2["SELECTION_SET"] = "SelectionSet";
  Kind2["FIELD"] = "Field";
  Kind2["ARGUMENT"] = "Argument";
  Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
  Kind2["INLINE_FRAGMENT"] = "InlineFragment";
  Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
  Kind2["VARIABLE"] = "Variable";
  Kind2["INT"] = "IntValue";
  Kind2["FLOAT"] = "FloatValue";
  Kind2["STRING"] = "StringValue";
  Kind2["BOOLEAN"] = "BooleanValue";
  Kind2["NULL"] = "NullValue";
  Kind2["ENUM"] = "EnumValue";
  Kind2["LIST"] = "ListValue";
  Kind2["OBJECT"] = "ObjectValue";
  Kind2["OBJECT_FIELD"] = "ObjectField";
  Kind2["DIRECTIVE"] = "Directive";
  Kind2["NAMED_TYPE"] = "NamedType";
  Kind2["LIST_TYPE"] = "ListType";
  Kind2["NON_NULL_TYPE"] = "NonNullType";
  Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
  Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
  Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
  Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
  Kind2["FIELD_DEFINITION"] = "FieldDefinition";
  Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
  Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
  Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
  Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
  Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
  Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
  Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
  Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
  Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
  Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
  Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
  Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
  Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
  Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
  Kind2["TYPE_COORDINATE"] = "TypeCoordinate";
  Kind2["MEMBER_COORDINATE"] = "MemberCoordinate";
  Kind2["ARGUMENT_COORDINATE"] = "ArgumentCoordinate";
  Kind2["DIRECTIVE_COORDINATE"] = "DirectiveCoordinate";
  Kind2["DIRECTIVE_ARGUMENT_COORDINATE"] = "DirectiveArgumentCoordinate";
})(Kind || (Kind = {}));

// node_modules/graphql/language/characterClasses.mjs
function isWhiteSpace(code) {
  return code === 9 || code === 32;
}
function isDigit(code) {
  return code >= 48 && code <= 57;
}
function isLetter(code) {
  return code >= 97 && code <= 122 || // A-Z
  code >= 65 && code <= 90;
}
function isNameStart(code) {
  return isLetter(code) || code === 95;
}
function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 95;
}

// node_modules/graphql/language/blockString.mjs
function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;
  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;
  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;
    const line = lines[i];
    const indent2 = leadingWhitespace(line);
    if (indent2 === line.length) {
      continue;
    }
    firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== void 0 ? _firstNonEmptyLine : i;
    lastNonEmptyLine = i;
    if (i !== 0 && indent2 < commonIndent) {
      commonIndent = indent2;
    }
  }
  return lines.map((line, i) => i === 0 ? line : line.slice(commonIndent)).slice(
    (_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== void 0 ? _firstNonEmptyLine2 : 0,
    lastNonEmptyLine + 1
  );
}
function leadingWhitespace(str) {
  let i = 0;
  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }
  return i;
}
function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""');
  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1;
  const forceLeadingNewLine = lines.length > 1 && lines.slice(1).every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0)));
  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""');
  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith("\\");
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines = !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
  (!isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
  let result = "";
  const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));
  if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
    result += "\n";
  }
  result += escapedValue;
  if (printAsMultipleLines || forceTrailingNewline) {
    result += "\n";
  }
  return '"""' + result + '"""';
}

// node_modules/graphql/language/tokenKind.mjs
var TokenKind;
(function(TokenKind2) {
  TokenKind2["SOF"] = "<SOF>";
  TokenKind2["EOF"] = "<EOF>";
  TokenKind2["BANG"] = "!";
  TokenKind2["DOLLAR"] = "$";
  TokenKind2["AMP"] = "&";
  TokenKind2["PAREN_L"] = "(";
  TokenKind2["PAREN_R"] = ")";
  TokenKind2["DOT"] = ".";
  TokenKind2["SPREAD"] = "...";
  TokenKind2["COLON"] = ":";
  TokenKind2["EQUALS"] = "=";
  TokenKind2["AT"] = "@";
  TokenKind2["BRACKET_L"] = "[";
  TokenKind2["BRACKET_R"] = "]";
  TokenKind2["BRACE_L"] = "{";
  TokenKind2["PIPE"] = "|";
  TokenKind2["BRACE_R"] = "}";
  TokenKind2["NAME"] = "Name";
  TokenKind2["INT"] = "Int";
  TokenKind2["FLOAT"] = "Float";
  TokenKind2["STRING"] = "String";
  TokenKind2["BLOCK_STRING"] = "BlockString";
  TokenKind2["COMMENT"] = "Comment";
})(TokenKind || (TokenKind = {}));

// node_modules/graphql/language/lexer.mjs
var Lexer = class {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(source) {
    const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    this.lastToken = this.token;
    const token = this.token = this.lookahead();
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let token = this.token;
    if (token.kind !== TokenKind.EOF) {
      do {
        if (token.next) {
          token = token.next;
        } else {
          const nextToken = readNextToken(this, token.end);
          token.next = nextToken;
          nextToken.prev = token;
          token = nextToken;
        }
      } while (token.kind === TokenKind.COMMENT);
    }
    return token;
  }
};
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.DOT || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function isUnicodeScalarValue(code) {
  return code >= 0 && code <= 55295 || code >= 57344 && code <= 1114111;
}
function isSupplementaryCodePoint(body, location) {
  return isLeadingSurrogate(body.charCodeAt(location)) && isTrailingSurrogate(body.charCodeAt(location + 1));
}
function isLeadingSurrogate(code) {
  return code >= 55296 && code <= 56319;
}
function isTrailingSurrogate(code) {
  return code >= 56320 && code <= 57343;
}
function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);
  if (code === void 0) {
    return TokenKind.EOF;
  } else if (code >= 32 && code <= 126) {
    const char = String.fromCodePoint(code);
    return char === '"' ? `'"'` : `"${char}"`;
  }
  return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
}
function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new Token(kind, start, end, line, col, value);
}
function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    switch (code) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++position;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      case 13:
        if (body.charCodeAt(position + 1) === 10) {
          position += 2;
        } else {
          ++position;
        }
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      // Comment
      case 35:
        return readComment(lexer, position);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return createToken(lexer, TokenKind.BANG, position, position + 1);
      case 36:
        return createToken(lexer, TokenKind.DOLLAR, position, position + 1);
      case 38:
        return createToken(lexer, TokenKind.AMP, position, position + 1);
      case 40:
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);
      case 41:
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);
      case 46:
        if (body.charCodeAt(position + 1) === 46 && body.charCodeAt(position + 2) === 46) {
          return createToken(lexer, TokenKind.SPREAD, position, position + 3);
        }
        break;
      case 58:
        return createToken(lexer, TokenKind.COLON, position, position + 1);
      case 61:
        return createToken(lexer, TokenKind.EQUALS, position, position + 1);
      case 64:
        return createToken(lexer, TokenKind.AT, position, position + 1);
      case 91:
        return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);
      case 93:
        return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);
      case 123:
        return createToken(lexer, TokenKind.BRACE_L, position, position + 1);
      case 124:
        return createToken(lexer, TokenKind.PIPE, position, position + 1);
      case 125:
        return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
      // StringValue
      case 34:
        if (body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
          return readBlockString(lexer, position);
        }
        return readString(lexer, position);
    }
    if (isDigit(code) || code === 45) {
      return readNumber(lexer, position, code);
    }
    if (isNameStart(code)) {
      return readName(lexer, position);
    }
    throw syntaxError(
      lexer.source,
      position,
      code === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? `Unexpected character: ${printCodePointAt(lexer, position)}.` : `Invalid character: ${printCodePointAt(lexer, position)}.`
    );
  }
  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position)
  );
}
function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (isDigit(code)) {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position
      )}.`
    );
  }
  return createToken(
    lexer,
    isFloat ? TokenKind.FLOAT : TokenKind.INT,
    start,
    position,
    body.slice(start, position)
  );
}
function readDigits(lexer, start, firstCode) {
  if (!isDigit(firstCode)) {
    throw syntaxError(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start
      )}.`
    );
  }
  const body = lexer.source.body;
  let position = start + 1;
  while (isDigit(body.charCodeAt(position))) {
    ++position;
  }
  return position;
}
function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = "";
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, TokenKind.STRING, start, position + 1, value);
    }
    if (code === 92) {
      value += body.slice(chunkStart, position);
      const escape = body.charCodeAt(position + 1) === 117 ? body.charCodeAt(position + 2) === 123 ? readEscapedUnicodeVariableWidth(lexer, position) : readEscapedUnicodeFixedWidth(lexer, position) : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    }
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3;
  while (size < 12) {
    const code = body.charCodeAt(position + size++);
    if (code === 125) {
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }
      return {
        value: String.fromCodePoint(point),
        size
      };
    }
    point = point << 4 | readHexDigit(code);
    if (point < 0) {
      break;
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size
    )}".`
  );
}
function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);
  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6
    };
  }
  if (isLeadingSurrogate(code)) {
    if (body.charCodeAt(position + 6) === 92 && body.charCodeAt(position + 7) === 117) {
      const trailingCode = read16BitHexCode(body, position + 8);
      if (isTrailingSurrogate(trailingCode)) {
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12
        };
      }
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`
  );
}
function read16BitHexCode(body, position) {
  return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
}
function readHexDigit(code) {
  return code >= 48 && code <= 57 ? code - 48 : code >= 65 && code <= 70 ? code - 55 : code >= 97 && code <= 102 ? code - 87 : -1;
}
function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);
  switch (code) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: "\n",
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2
    )}".`
  );
}
function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = "";
  const blockLines = [];
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        TokenKind.BLOCK_STRING,
        start,
        position + 3,
        // Return a string of the lines joined with U+000A.
        dedentBlockStringLines(blockLines).join("\n")
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    }
    if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1;
      position += 4;
      continue;
    }
    if (code === 10 || code === 13) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      if (code === 13 && body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      currentLine = "";
      chunkStart = position;
      lineStart = position;
      continue;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.NAME,
    start,
    position,
    body.slice(start, position)
  );
}

// node_modules/graphql/jsutils/inspect.mjs
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? `[function ${value.name}]` : "[function]";
    case "object":
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return "null";
  }
  if (previouslySeenValues.includes(value)) {
    return "[Circular]";
  }
  const seenValues = [...previouslySeenValues, value];
  if (isJSONable(value)) {
    const jsonValue = value.toJSON();
    if (jsonValue !== value) {
      return typeof jsonValue === "string" ? jsonValue : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function isJSONable(value) {
  return typeof value.toJSON === "function";
}
function formatObject(object, seenValues) {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  const properties = entries.map(
    ([key, value]) => key + ": " + formatValue(value, seenValues)
  );
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];
  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }
  return "[" + items.join(", ") + "]";
}
function getObjectTag(object) {
  const tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    const name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}

// node_modules/graphql/jsutils/instanceOf.mjs
var isProduction = globalThis.process && // eslint-disable-next-line no-undef
false;
var instanceOf = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  isProduction ? function instanceOf2(value, constructor) {
    return value instanceof constructor;
  } : function instanceOf3(value, constructor) {
    if (value instanceof constructor) {
      return true;
    }
    if (typeof value === "object" && value !== null) {
      var _value$constructor;
      const className = constructor.prototype[Symbol.toStringTag];
      const valueClassName = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name
      );
      if (className === valueClassName) {
        const stringifiedValue = inspect(value);
        throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return false;
  }
);

// node_modules/graphql/language/source.mjs
var Source = class {
  constructor(body, name = "GraphQL request", locationOffset = {
    line: 1,
    column: 1
  }) {
    typeof body === "string" || devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(
      false,
      "line in locationOffset is 1-indexed and must be positive."
    );
    this.locationOffset.column > 0 || devAssert(
      false,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
};
function isSource(source) {
  return instanceOf(source, Source);
}

// node_modules/graphql/language/parser.mjs
function parse(source, options) {
  const parser = new Parser(source, options);
  const document = parser.parseDocument();
  Object.defineProperty(document, "tokenCount", {
    enumerable: false,
    value: parser.tokenCount
  });
  return document;
}
var Parser = class {
  constructor(source, options = {}) {
    const _a = options, { lexer } = _a, _options = __objRest(_a, ["lexer"]);
    if (lexer) {
      this._lexer = lexer;
    } else {
      const sourceObj = isSource(source) ? source : new Source(source);
      this._lexer = new Lexer(sourceObj);
    }
    this._options = _options;
    this._tokenCounter = 0;
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const token = this.expectToken(TokenKind.NAME);
    return this.node(token, {
      kind: Kind.NAME,
      value: token.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: Kind.DOCUMENT,
      definitions: this.many(
        TokenKind.SOF,
        this.parseDefinition,
        TokenKind.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    }
    const hasDescription = this.peekDescription();
    const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
    if (hasDescription && keywordToken.kind === TokenKind.BRACE_L) {
      throw syntaxError(
        this._lexer.source,
        this._lexer.token.start,
        "Unexpected description, descriptions are not supported on shorthand queries."
      );
    }
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      switch (keywordToken.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
      }
      if (hasDescription) {
        throw syntaxError(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, only GraphQL definitions support descriptions."
        );
      }
      switch (keywordToken.value) {
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(keywordToken);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const start = this._lexer.token;
    if (this.peek(TokenKind.BRACE_L)) {
      return this.node(start, {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        description: void 0,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    }
    const description = this.parseDescription();
    const operation = this.parseOperationType();
    let name;
    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }
    return this.node(start, {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      description,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const operationToken = this.expectToken(TokenKind.NAME);
    switch (operationToken.value) {
      case "query":
        return OperationTypeNode.QUERY;
      case "mutation":
        return OperationTypeNode.MUTATION;
      case "subscription":
        return OperationTypeNode.SUBSCRIPTION;
    }
    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseVariableDefinition,
      TokenKind.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: Kind.VARIABLE_DEFINITION,
      description: this.parseDescription(),
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return this.node(start, {
      kind: Kind.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: Kind.SELECTION_SET,
      selections: this.many(
        TokenKind.BRACE_L,
        this.parseSelection,
        TokenKind.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const start = this._lexer.token;
    const nameOrAlias = this.parseName();
    let alias;
    let name;
    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }
    return this.node(start, {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(isConst) {
    const item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(isConst = false) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(isConst)
    });
  }
  parseConstArgument() {
    return this.parseArgument(true);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    const hasTypeCondition = this.expectOptionalKeyword("on");
    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return this.node(start, {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false)
      });
    }
    return this.node(start, {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("fragment");
    if (this._options.allowLegacyFragmentVariables === true) {
      return this.node(start, {
        kind: Kind.FRAGMENT_DEFINITION,
        description,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    return this.node(start, {
      kind: Kind.FRAGMENT_DEFINITION,
      description,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on") {
      throw this.unexpected();
    }
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(isConst) {
    const token = this._lexer.token;
    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);
      case TokenKind.BRACE_L:
        return this.parseObject(isConst);
      case TokenKind.INT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.INT,
          value: token.value
        });
      case TokenKind.FLOAT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.FLOAT,
          value: token.value
        });
      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();
      case TokenKind.NAME:
        this.advanceLexer();
        switch (token.value) {
          case "true":
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: true
            });
          case "false":
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: false
            });
          case "null":
            return this.node(token, {
              kind: Kind.NULL
            });
          default:
            return this.node(token, {
              kind: Kind.ENUM,
              value: token.value
            });
        }
      case TokenKind.DOLLAR:
        if (isConst) {
          this.expectToken(TokenKind.DOLLAR);
          if (this._lexer.token.kind === TokenKind.NAME) {
            const varName = this._lexer.token.value;
            throw syntaxError(
              this._lexer.source,
              token.start,
              `Unexpected variable "$${varName}" in constant value.`
            );
          } else {
            throw this.unexpected(token);
          }
        }
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(true);
  }
  parseStringLiteral() {
    const token = this._lexer.token;
    this.advanceLexer();
    return this.node(token, {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(isConst) {
    const item = () => this.parseValueLiteral(isConst);
    return this.node(this._lexer.token, {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(isConst) {
    const item = () => this.parseObjectField(isConst);
    return this.node(this._lexer.token, {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(isConst) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(isConst) {
    const directives = [];
    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }
    return directives;
  }
  parseConstDirectives() {
    return this.parseDirectives(true);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(isConst) {
    const start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return this.node(start, {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const start = this._lexer.token;
    let type;
    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      const innerType = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = this.node(start, {
        kind: Kind.LIST_TYPE,
        type: innerType
      });
    } else {
      type = this.parseNamedType();
    }
    if (this.expectOptionalToken(TokenKind.BANG)) {
      return this.node(start, {
        kind: Kind.NON_NULL_TYPE,
        type
      });
    }
    return type;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: Kind.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("schema");
    const directives = this.parseConstDirectives();
    const operationTypes = this.many(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R
    );
    return this.node(start, {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const start = this._lexer.token;
    const operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    const type = this.parseNamedType();
    return this.node(start, {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("scalar");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("type");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(TokenKind.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseFieldDefinition,
      TokenKind.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseInputValueDef,
      TokenKind.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    let defaultValue;
    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseConstValueLiteral();
    }
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("interface");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("union");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    return this.node(start, {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("enum");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    return this.node(start, {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseEnumValueDefinition,
      TokenKind.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseEnumValueName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") {
      throw syntaxError(
        this._lexer.source,
        this._lexer.token.start,
        `${getTokenDesc(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    }
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("input");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseInputValueDef,
      TokenKind.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const keywordToken = this._lexer.lookahead();
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    }
    throw this.unexpected(keywordToken);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("schema");
    const directives = this.parseConstDirectives();
    const operationTypes = this.optionalMany(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R
    );
    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("scalar");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    if (directives.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("type");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("interface");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("union");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("enum");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("input");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("directive");
    this.expectToken(TokenKind.AT);
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    const repeatable = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const locations = this.parseDirectiveLocations();
    return this.node(start, {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const start = this._lexer.token;
    const name = this.parseName();
    if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
      return name;
    }
    throw this.unexpected(start);
  }
  // Schema Coordinates
  /**
   * SchemaCoordinate :
   *   - Name
   *   - Name . Name
   *   - Name . Name ( Name : )
   *   - \@ Name
   *   - \@ Name ( Name : )
   */
  parseSchemaCoordinate() {
    const start = this._lexer.token;
    const ofDirective = this.expectOptionalToken(TokenKind.AT);
    const name = this.parseName();
    let memberName;
    if (!ofDirective && this.expectOptionalToken(TokenKind.DOT)) {
      memberName = this.parseName();
    }
    let argumentName;
    if ((ofDirective || memberName) && this.expectOptionalToken(TokenKind.PAREN_L)) {
      argumentName = this.parseName();
      this.expectToken(TokenKind.COLON);
      this.expectToken(TokenKind.PAREN_R);
    }
    if (ofDirective) {
      if (argumentName) {
        return this.node(start, {
          kind: Kind.DIRECTIVE_ARGUMENT_COORDINATE,
          name,
          argumentName
        });
      }
      return this.node(start, {
        kind: Kind.DIRECTIVE_COORDINATE,
        name
      });
    } else if (memberName) {
      if (argumentName) {
        return this.node(start, {
          kind: Kind.ARGUMENT_COORDINATE,
          name,
          fieldName: memberName,
          argumentName
        });
      }
      return this.node(start, {
        kind: Kind.MEMBER_COORDINATE,
        name,
        memberName
      });
    }
    return this.node(start, {
      kind: Kind.TYPE_COORDINATE,
      name
    });
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(startToken, node) {
    if (this._options.noLocation !== true) {
      node.loc = new Location(
        startToken,
        this._lexer.lastToken,
        this._lexer.source
      );
    }
    return node;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(kind) {
    const token = this._lexer.token;
    if (token.kind === kind) {
      this.advanceLexer();
      return token;
    }
    throw syntaxError(
      this._lexer.source,
      token.start,
      `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(kind) {
    const token = this._lexer.token;
    if (token.kind === kind) {
      this.advanceLexer();
      return true;
    }
    return false;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(value) {
    const token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
    } else {
      throw syntaxError(
        this._lexer.source,
        token.start,
        `Expected "${value}", found ${getTokenDesc(token)}.`
      );
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(value) {
    const token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
      return true;
    }
    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(atToken) {
    const token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(
      this._lexer.source,
      token.start,
      `Unexpected ${getTokenDesc(token)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];
    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }
    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      const nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));
    return nodes;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    const nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));
    return nodes;
  }
  advanceLexer() {
    const { maxTokens } = this._options;
    const token = this._lexer.advance();
    if (token.kind !== TokenKind.EOF) {
      ++this._tokenCounter;
      if (maxTokens !== void 0 && this._tokenCounter > maxTokens) {
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Document contains more that ${maxTokens} tokens. Parsing aborted.`
        );
      }
    }
  }
};
function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}

// node_modules/graphql/language/printString.mjs
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
}
var escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
}
var escapeSequences = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // 5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
];

// node_modules/graphql/language/visitor.mjs
var BREAK = Object.freeze({});
function visit(root, visitor, visitorKeys = QueryDocumentKeys) {
  const enterLeaveMap = /* @__PURE__ */ new Map();
  for (const kind of Object.values(Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  let stack = void 0;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let edits = [];
  let node = root;
  let key = void 0;
  let parent = void 0;
  const path = [];
  const ancestors = [];
  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;
          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;
            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = __spreadValues({}, node);
          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];
      if (node === null || node === void 0) {
        continue;
      }
      path.push(key);
    }
    let result;
    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;
      isNode(node) || devAssert(false, `Invalid AST Node: ${inspect(node)}.`);
      const visitFn = isLeaving ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get === void 0 ? void 0 : _enterLeaveMap$get.leave : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get2 === void 0 ? void 0 : _enterLeaveMap$get2.enter;
      result = visitFn === null || visitFn === void 0 ? void 0 : visitFn.call(visitor, node, key, parent, path, ancestors);
      if (result === BREAK) {
        break;
      }
      if (result === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result !== void 0) {
        edits.push([key, result]);
        if (!isLeaving) {
          if (isNode(result)) {
            node = result;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }
    if (result === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_node$kind = visitorKeys[node.kind]) !== null && _node$kind !== void 0 ? _node$kind : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    return edits[edits.length - 1][1];
  }
  return root;
}
function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];
  if (typeof kindVisitor === "object") {
    return kindVisitor;
  } else if (typeof kindVisitor === "function") {
    return {
      enter: kindVisitor,
      leave: void 0
    };
  }
  return {
    enter: visitor.enter,
    leave: visitor.leave
  };
}

// node_modules/graphql/language/printer.mjs
function print(ast) {
  return visit(ast, printDocASTReducer);
}
var MAX_LINE_LENGTH = 80;
var printDocASTReducer = {
  Name: {
    leave: (node) => node.value
  },
  Variable: {
    leave: (node) => "$" + node.name
  },
  // Document
  Document: {
    leave: (node) => join(node.definitions, "\n\n")
  },
  OperationDefinition: {
    leave(node) {
      const varDefs = hasMultilineItems(node.variableDefinitions) ? wrap2("(\n", join(node.variableDefinitions, "\n"), "\n)") : wrap2("(", join(node.variableDefinitions, ", "), ")");
      const prefix = wrap2("", node.description, "\n") + join(
        [
          node.operation,
          join([node.name, varDefs]),
          join(node.directives, " ")
        ],
        " "
      );
      return (prefix === "query" ? "" : prefix + " ") + node.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives, description }) => wrap2("", description, "\n") + variable + ": " + type + wrap2(" = ", defaultValue) + wrap2(" ", join(directives, " "))
  },
  SelectionSet: {
    leave: ({ selections }) => block(selections)
  },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix = wrap2("", alias, ": ") + name;
      let argsLine = prefix + wrap2("(", join(args, ", "), ")");
      if (argsLine.length > MAX_LINE_LENGTH) {
        argsLine = prefix + wrap2("(\n", indent(join(args, "\n")), "\n)");
      }
      return join([argsLine, join(directives, " "), selectionSet], " ");
    }
  },
  Argument: {
    leave: ({ name, value }) => name + ": " + value
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name, directives }) => "..." + name + wrap2(" ", join(directives, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) => join(
      [
        "...",
        wrap2("on ", typeCondition),
        join(directives, " "),
        selectionSet
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({
      name,
      typeCondition,
      variableDefinitions,
      directives,
      selectionSet,
      description
    }) => wrap2("", description, "\n") + // Note: fragment variable definitions are experimental and may be changed
    // or removed in the future.
    `fragment ${name}${wrap2("(", join(variableDefinitions, ", "), ")")} on ${typeCondition} ${wrap2("", join(directives, " "), " ")}` + selectionSet
  },
  // Value
  IntValue: {
    leave: ({ value }) => value
  },
  FloatValue: {
    leave: ({ value }) => value
  },
  StringValue: {
    leave: ({ value, block: isBlockString }) => isBlockString ? printBlockString(value) : printString(value)
  },
  BooleanValue: {
    leave: ({ value }) => value ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value }) => value
  },
  ListValue: {
    leave: ({ values }) => "[" + join(values, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields }) => "{" + join(fields, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name, value }) => name + ": " + value
  },
  // Directive
  Directive: {
    leave: ({ name, arguments: args }) => "@" + name + wrap2("(", join(args, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name }) => name
  },
  ListType: {
    leave: ({ type }) => "[" + type + "]"
  },
  NonNullType: {
    leave: ({ type }) => type + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description, directives, operationTypes }) => wrap2("", description, "\n") + join(["schema", join(directives, " "), block(operationTypes)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ": " + type
  },
  ScalarTypeDefinition: {
    leave: ({ description, name, directives }) => wrap2("", description, "\n") + join(["scalar", name, join(directives, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) => wrap2("", description, "\n") + join(
      [
        "type",
        name,
        wrap2("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description, name, arguments: args, type, directives }) => wrap2("", description, "\n") + name + (hasMultilineItems(args) ? wrap2("(\n", indent(join(args, "\n")), "\n)") : wrap2("(", join(args, ", "), ")")) + ": " + type + wrap2(" ", join(directives, " "))
  },
  InputValueDefinition: {
    leave: ({ description, name, type, defaultValue, directives }) => wrap2("", description, "\n") + join(
      [name + ": " + type, wrap2("= ", defaultValue), join(directives, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) => wrap2("", description, "\n") + join(
      [
        "interface",
        name,
        wrap2("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description, name, directives, types }) => wrap2("", description, "\n") + join(
      ["union", name, join(directives, " "), wrap2("= ", join(types, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description, name, directives, values }) => wrap2("", description, "\n") + join(["enum", name, join(directives, " "), block(values)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description, name, directives }) => wrap2("", description, "\n") + join([name, join(directives, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description, name, directives, fields }) => wrap2("", description, "\n") + join(["input", name, join(directives, " "), block(fields)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description, name, arguments: args, repeatable, locations }) => wrap2("", description, "\n") + "directive @" + name + (hasMultilineItems(args) ? wrap2("(\n", indent(join(args, "\n")), "\n)") : wrap2("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ")
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) => join(
      ["extend schema", join(directives, " "), block(operationTypes)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) => join(["extend scalar", name, join(directives, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join(
      [
        "extend type",
        name,
        wrap2("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join(
      [
        "extend interface",
        name,
        wrap2("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) => join(
      [
        "extend union",
        name,
        join(directives, " "),
        wrap2("= ", join(types, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) => join(["extend enum", name, join(directives, " "), block(values)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) => join(["extend input", name, join(directives, " "), block(fields)], " ")
  },
  // Schema Coordinates
  TypeCoordinate: {
    leave: ({ name }) => name
  },
  MemberCoordinate: {
    leave: ({ name, memberName }) => join([name, wrap2(".", memberName)])
  },
  ArgumentCoordinate: {
    leave: ({ name, fieldName, argumentName }) => join([name, wrap2(".", fieldName), wrap2("(", argumentName, ":)")])
  },
  DirectiveCoordinate: {
    leave: ({ name }) => join(["@", name])
  },
  DirectiveArgumentCoordinate: {
    leave: ({ name, argumentName }) => join(["@", name, wrap2("(", argumentName, ":)")])
  }
};
function join(maybeArray, separator = "") {
  var _maybeArray$filter$jo;
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter((x) => x).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap2("{\n", indent(join(array, "\n")), "\n}");
}
function wrap2(start, maybeString, end = "") {
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap2("  ", str.replace(/\n/g, "\n  "));
}
function hasMultilineItems(maybeArray) {
  var _maybeArray$some;
  return (_maybeArray$some = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some((str) => str.includes("\n"))) !== null && _maybeArray$some !== void 0 ? _maybeArray$some : false;
}

// node_modules/@apollo/client/invariantErrorCodes.js
var errorCodes = {
  1: {
    file: "@apollo/client/utilities/internal/checkDocument.js",
    condition: 'doc && doc.kind === "Document"',
    message: `Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql`
  },
  2: {
    file: "@apollo/client/utilities/internal/checkDocument.js",
    message: `Schema type definitions not allowed in queries. Found: "%s"`
  },
  3: {
    file: "@apollo/client/utilities/internal/checkDocument.js",
    condition: "operations.length <= 1",
    message: `Ambiguous GraphQL document: contains %s operations`
  },
  4: {
    file: "@apollo/client/utilities/internal/checkDocument.js",
    condition: "operations.length == 1 && operations[0].operation === expectedType",
    message: `Running a %s requires a graphql %s, but a %s was used instead.`
  },
  5: {
    file: "@apollo/client/utilities/internal/checkDocument.js",
    message: '`%s` is a forbidden field alias name in the selection set for field `%s` in %s "%s".'
  },
  6: {
    file: "@apollo/client/utilities/internal/getFragmentDefinition.js",
    condition: 'doc.kind === "Document"',
    message: `Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql`
  },
  7: {
    file: "@apollo/client/utilities/internal/getFragmentDefinition.js",
    condition: "doc.definitions.length <= 1",
    message: "Fragment must have exactly one definition."
  },
  8: {
    file: "@apollo/client/utilities/internal/getFragmentDefinition.js",
    condition: 'fragmentDef.kind === "FragmentDefinition"',
    message: "Must be a fragment definition."
  },
  9: {
    file: "@apollo/client/utilities/internal/getFragmentFromSelection.js",
    condition: "fragment",
    message: `No fragment named %s`
  },
  10: {
    file: "@apollo/client/utilities/internal/getFragmentQueryDocument.js",
    message: `Found a %s operation%s. No operations are allowed when using a fragment as a query. Only fragments are allowed.`
  },
  11: {
    file: "@apollo/client/utilities/internal/getFragmentQueryDocument.js",
    condition: "fragments.length === 1",
    message: `Found %s fragments. \`fragmentName\` must be provided when there is not exactly 1 fragment.`
  },
  12: {
    file: "@apollo/client/utilities/internal/getMainDefinition.js",
    message: "Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment."
  },
  13: {
    file: "@apollo/client/utilities/internal/getQueryDefinition.js",
    condition: 'queryDef && queryDef.operation === "query"',
    message: "Must contain a query definition."
  },
  15: {
    file: "@apollo/client/utilities/internal/shouldInclude.js",
    condition: "evaledValue !== void 0",
    message: `Invalid variable referenced in @%s directive.`
  },
  16: {
    file: "@apollo/client/utilities/internal/shouldInclude.js",
    condition: "directiveArguments && directiveArguments.length === 1",
    message: `Incorrect number of arguments for the @%s directive.`
  },
  17: {
    file: "@apollo/client/utilities/internal/shouldInclude.js",
    condition: 'ifArgument.name && ifArgument.name.value === "if"',
    message: `Invalid argument for the @%s directive.`
  },
  18: {
    file: "@apollo/client/utilities/internal/shouldInclude.js",
    condition: 'ifValue &&\n    (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue")',
    message: `Argument for the @%s directive must be a variable or a boolean value.`
  },
  19: {
    file: "@apollo/client/utilities/internal/valueToObjectRepresentation.js",
    message: `The inline argument "%s" of kind "%s"is not supported. Use variables instead of inline arguments to overcome this limitation.`
  },
  20: {
    file: "@apollo/client/utilities/graphql/DocumentTransform.js",
    condition: "Array.isArray(cacheKeys)",
    message: "`getCacheKey` must return an array or undefined"
  },
  21: {
    file: "@apollo/client/testing/core/mocking/mockLink.js",
    condition: "max > min",
    message: "realisticDelay: `min` must be less than `max`"
  },
  22: {
    file: "@apollo/client/testing/core/mocking/mockLink.js",
    condition: "queryWithoutClientOnlyDirectives",
    message: "query is required"
  },
  23: {
    file: "@apollo/client/testing/core/mocking/mockLink.js",
    condition: "serverQuery",
    message: "Cannot mock a client-only query. Mocked responses should contain at least one non-client field."
  },
  24: {
    file: "@apollo/client/testing/core/mocking/mockLink.js",
    condition: "(mock.maxUsageCount ?? 1) > 0",
    message: "Mocked response `maxUsageCount` must be greater than 0. Given %s"
  },
  25: {
    file: "@apollo/client/react/ssr/prerenderStatic.js",
    condition: "renderCount <= maxRerenders",
    message: `Exceeded maximum rerender count of %d.
This either means you have very deep \`useQuery\` waterfalls in your application
and need to increase the \`maxRerender\` option to \`prerenderStatic\`, or that
you have an infinite render loop in your application.`
  },
  26: {
    file: "@apollo/client/react/ssr/prerenderStatic.js",
    condition: "!signal?.aborted",
    message: "The operation was aborted before it could be attempted."
  },
  27: {
    file: "@apollo/client/react/internal/cache/QueryReference.js",
    condition: "!queryRef || QUERY_REFERENCE_SYMBOL in queryRef",
    message: "Expected a QueryRef object, but got something else instead."
  },
  28: {
    file: "@apollo/client/react/hooks/useApolloClient.js",
    condition: "!!client",
    message: 'Could not find "client" in the context or passed in as an option. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via options.'
  },
  29: {
    file: "@apollo/client/react/hooks/useLazyQuery.js",
    condition: "resultRef.current",
    message: "useLazyQuery: '%s' cannot be called before executing the query."
  },
  30: {
    file: "@apollo/client/react/hooks/useLazyQuery.js",
    condition: "!calledDuringRender()",
    message: "useLazyQuery: 'execute' should not be called during render. To start a query during render, use the 'useQuery' hook."
  },
  31: {
    file: "@apollo/client/react/hooks/useLoadableQuery.js",
    condition: "!calledDuringRender()",
    message: "useLoadableQuery: 'loadQuery' should not be called during render. To start a query during render, use the 'useBackgroundQuery' hook."
  },
  32: {
    file: "@apollo/client/react/hooks/useLoadableQuery.js",
    condition: "internalQueryRef",
    message: "The query has not been loaded. Please load the query."
  },
  33: {
    file: "@apollo/client/react/hooks/useSubscription.js",
    condition: "!optionsRef.current.skip",
    message: "A subscription that is skipped cannot be restarted."
  },
  35: {
    file: "@apollo/client/react/hooks/internal/validateSuspenseHookOptions.js",
    condition: "supportedFetchPolicies.includes(fetchPolicy)",
    message: `The fetch policy \`%s\` is not supported with suspense.`
  },
  37: {
    file: "@apollo/client/react/context/ApolloContext.js",
    condition: '"createContext" in React',
    message: 'Invoking `getApolloContext` in an environment where `React.createContext` is not available.\nThe Apollo Client functionality you are trying to use is only available in React Client Components.\nPlease make sure to add "use client" at the top of your file.\nFor more information, see https://nextjs.org/docs/getting-started/react-essentials#client-components'
  },
  38: {
    file: "@apollo/client/react/context/ApolloProvider.js",
    condition: "context.client",
    message: 'ApolloProvider was not passed a client instance. Make sure you pass in your client via the "client" prop.'
  },
  39: {
    file: "@apollo/client/masking/maskDefinition.js",
    condition: "fragment",
    message: "Could not find fragment with name '%s'."
  },
  41: {
    file: "@apollo/client/masking/maskFragment.js",
    condition: "fragments.length === 1",
    message: `Found %s fragments. \`fragmentName\` must be provided when there is not exactly 1 fragment.`
  },
  42: {
    file: "@apollo/client/masking/maskFragment.js",
    condition: "!!fragment",
    message: `Could not find fragment with name "%s".`
  },
  43: {
    file: "@apollo/client/masking/maskOperation.js",
    condition: "definition",
    message: "Expected a parsed GraphQL document with a query, mutation, or subscription."
  },
  47: {
    file: "@apollo/client/local-state/LocalState.js",
    condition: 'hasDirectives(["client"], document)',
    message: "Expected document to contain `@client` fields."
  },
  48: {
    file: "@apollo/client/local-state/LocalState.js",
    condition: 'hasDirectives(["client"], document)',
    message: "Expected document to contain `@client` fields."
  },
  49: {
    file: "@apollo/client/local-state/LocalState.js",
    condition: "fragment",
    message: "No fragment named %s"
  },
  55: {
    file: "@apollo/client/local-state/LocalState.js",
    message: "Could not resolve __typename on object %o returned from resolver '%s'. '__typename' needs to be returned to properly resolve child fields."
  },
  56: {
    file: "@apollo/client/local-state/LocalState.js",
    condition: "fragment",
    message: `No fragment named %s`
  },
  57: {
    file: "@apollo/client/local-state/LocalState.js",
    condition: "cache.fragmentMatches",
    message: "The configured cache does not support fragment matching which will lead to incorrect results when executing local resolvers. Please use a cache that implements `fragmetMatches`."
  },
  59: {
    file: "@apollo/client/link/persisted-queries/index.js",
    condition: 'options &&\n    (typeof options.sha256 === "function" ||\n        typeof options.generateHash === "function")',
    message: 'Missing/invalid "sha256" or "generateHash" function. Please configure one using the "createPersistedQueryLink(options)" options parameter.'
  },
  60: {
    file: "@apollo/client/link/persisted-queries/index.js",
    condition: "forward",
    message: "PersistedQueryLink cannot be the last link in the chain."
  },
  61: {
    file: "@apollo/client/link/http/checkFetcher.js",
    condition: 'fetcher || typeof fetch !== "undefined"',
    message: `
"fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:

import fetch from 'cross-fetch';
import { ApolloClient, HttpLink } from '@apollo/client';
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql', fetch })
});
    `
  },
  62: {
    file: "@apollo/client/link/http/parseAndCheckHttpResponse.js",
    condition: 'response.body && typeof response.body.getReader === "function"',
    message: "Unknown type for `response.body`. Please use a `fetch` implementation that is WhatWG-compliant and that uses WhatWG ReadableStreams for `body`."
  },
  65: {
    file: "@apollo/client/link/core/ApolloLink.js",
    message: "request is not implemented"
  },
  66: {
    file: "@apollo/client/incremental/handlers/graphql17Alpha9.js",
    condition: "pending",
    message: "Could not find pending chunk for incremental value. Please file an issue for the Apollo Client team to investigate."
  },
  67: {
    file: "@apollo/client/incremental/handlers/notImplemented.js",
    condition: '!hasDirectives(["defer", "stream"], request.query)',
    message: "`@defer` and `@stream` are not supported without specifying an incremental handler. Please pass a handler as the `incrementalHandler` option to the `ApolloClient` constructor."
  },
  68: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: "options.cache",
    message: "To initialize Apollo Client, you must specify a 'cache' property in the options object. \nFor more information, please visit: https://go.apollo.dev/c/docs"
  },
  69: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: "options.link",
    message: "To initialize Apollo Client, you must specify a 'link' property in the options object. \nFor more information, please visit: https://go.apollo.dev/c/docs"
  },
  70: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: 'options.fetchPolicy !== "cache-and-network"',
    message: "The cache-and-network fetchPolicy does not work with client.query, because client.query can only return a single result. Please use client.watchQuery to receive multiple results from the cache and the network, or consider using a different fetchPolicy, such as cache-first or network-only."
  },
  71: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: 'options.fetchPolicy !== "standby"',
    message: "The standby fetchPolicy does not work with client.query, because standby does not fetch. Consider using a different fetchPolicy, such as cache-first or network-only."
  },
  72: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: "options.query",
    message: "query option is required. You must specify your GraphQL document in the query option."
  },
  73: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: 'options.query.kind === "Document"',
    message: 'You must wrap the query string in a "gql" tag.'
  },
  74: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: "!options.returnPartialData",
    message: "returnPartialData option only supported on watchQuery."
  },
  75: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: "!options.pollInterval",
    message: "pollInterval option only supported on watchQuery."
  },
  76: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: "!options.notifyOnNetworkStatusChange",
    message: "notifyOnNetworkStatusChange option only supported on watchQuery."
  },
  77: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: "optionsWithDefaults.mutation",
    message: "The `mutation` option is required. Please provide a GraphQL document in the `mutation` option."
  },
  78: {
    file: "@apollo/client/core/ApolloClient.js",
    condition: 'optionsWithDefaults.fetchPolicy === "network-only" ||\n    optionsWithDefaults.fetchPolicy === "no-cache"',
    message: "Mutations only support 'network-only' or 'no-cache' fetch policies. The default 'network-only' behavior automatically writes mutation results to the cache. Passing 'no-cache' skips the cache write."
  },
  80: {
    file: "@apollo/client/core/ObservableQuery.js",
    condition: 'fetchPolicy === "standby"',
    message: "The `variablesUnknown` option can only be used together with a `standby` fetch policy."
  },
  82: {
    file: "@apollo/client/core/ObservableQuery.js",
    condition: 'this.options.fetchPolicy !== "cache-only"',
    message: "Cannot execute `fetchMore` for 'cache-only' query '%s'. Please use a different fetch policy."
  },
  83: {
    file: "@apollo/client/core/ObservableQuery.js",
    condition: "updateQuery",
    message: "You must provide an `updateQuery` function when using `fetchMore` with a `no-cache` fetch policy."
  },
  87: {
    file: "@apollo/client/core/QueryManager.js",
    message: "QueryManager stopped while query was in flight"
  },
  88: {
    file: "@apollo/client/core/QueryManager.js",
    condition: "this.localState",
    message: "Mutation '%s' contains `@client` fields with variables provided by `@export` but local state has not been configured."
  },
  89: {
    file: "@apollo/client/core/QueryManager.js",
    message: "Store reset while query was in flight (not completed in link chain)"
  },
  92: {
    file: "@apollo/client/core/QueryManager.js",
    condition: "!this.getDocumentInfo(query).hasClientExports || this.localState",
    message: "Subscription '%s' contains `@client` fields with variables provided by `@export` but local state has not been configured."
  },
  93: {
    file: "@apollo/client/core/QueryManager.js",
    condition: "this.localState",
    message: "%s '%s' contains `@client` fields but local state has not been configured."
  },
  94: {
    file: "@apollo/client/core/QueryManager.js",
    condition: "!hasIncrementalDirective",
    message: "%s '%s' contains `@client` and `@defer` directives. These cannot be used together."
  },
  95: {
    file: "@apollo/client/core/QueryManager.js",
    condition: "this.localState",
    message: "Query '%s' contains `@client` fields with variables provided by `@export` but local state has not been configured."
  },
  97: {
    file: "@apollo/client/core/QueryManager.js",
    condition: "this.localState",
    message: "Query '%s' contains `@client` fields but local state has not been configured."
  },
  98: {
    file: "@apollo/client/core/QueryManager.js",
    condition: "didEmitValue",
    message: "The link chain completed without emitting a value. This is likely unintentional and should be updated to emit a value before completing."
  },
  99: {
    file: "@apollo/client/cache/inmemory/entityStore.js",
    condition: 'typeof dataId === "string"',
    message: "store.merge expects a string ID"
  },
  102: {
    file: "@apollo/client/cache/inmemory/key-extractor.js",
    condition: "extracted !== void 0",
    message: `Missing field '%s' while extracting keyFields from %s`
  },
  103: {
    file: "@apollo/client/cache/inmemory/policies.js",
    condition: "!old || old === which",
    message: `Cannot change root %s __typename more than once`
  },
  106: {
    file: "@apollo/client/cache/inmemory/policies.js",
    message: "Cannot automatically merge arrays"
  },
  107: {
    file: "@apollo/client/cache/inmemory/readFromStore.js",
    message: `No fragment named %s`
  },
  108: {
    file: "@apollo/client/cache/inmemory/readFromStore.js",
    condition: "!isReference(value)",
    message: `Missing selection set for object of type %s returned for query field %s`
  },
  109: {
    file: "@apollo/client/cache/inmemory/writeToStore.js",
    message: `Could not identify object %s`
  },
  111: {
    file: "@apollo/client/cache/inmemory/writeToStore.js",
    message: `No fragment named %s`
  }
};
var devDebug = {
  79: {
    file: "@apollo/client/core/ApolloClient.js",
    message: `In client.refetchQueries, Promise.all promise rejected with error %o`
  },
  86: {
    file: "@apollo/client/core/ObservableQuery.js",
    message: `Missing cache result fields: %o`
  }
};
var devLog = {};
var devWarn = {
  36: {
    file: "@apollo/client/react/hooks/internal/validateSuspenseHookOptions.js",
    message: "Using `returnPartialData` with a `no-cache` fetch policy has no effect. To read partial data from the cache, consider using an alternate fetch policy."
  },
  40: {
    file: "@apollo/client/masking/maskDefinition.js",
    message: "Accessing unmasked field on %s at path '%s'. This field will not be available when masking is enabled. Please read the field from the fragment instead."
  },
  44: {
    file: "@apollo/client/masking/utils.js",
    message: "@unmask 'mode' argument does not support variables."
  },
  45: {
    file: "@apollo/client/masking/utils.js",
    message: "@unmask 'mode' argument must be of type string."
  },
  46: {
    file: "@apollo/client/masking/utils.js",
    message: "@unmask 'mode' argument does not recognize value '%s'."
  },
  50: {
    file: "@apollo/client/local-state/LocalState.js",
    message: "The '%s' field resolves the value from the cache, for example from a 'read' function, but a 'no-cache' fetch policy was used. The field value has been set to `null`. Either define a local resolver or use a fetch policy that uses the cache to ensure the field is resolved correctly."
  },
  51: {
    file: "@apollo/client/local-state/LocalState.js",
    message: "Could not find a resolver for the '%s' field nor does the cache resolve the field. The field value has been set to `null`. Either define a resolver for the field or ensure the cache can resolve the value, for example, by adding a 'read' function to a field policy in 'InMemoryCache'."
  },
  52: {
    file: "@apollo/client/local-state/LocalState.js",
    message: "The '%s' resolver returned `undefined` instead of a value. This is likely a bug in the resolver. If you didn't mean to return a value, return `null` instead."
  },
  53: {
    file: "@apollo/client/local-state/LocalState.js",
    message: "The '%s' field had no cached value and only forced resolvers were run. The value was set to `null`."
  },
  54: {
    file: "@apollo/client/local-state/LocalState.js",
    message: "The '%s' field on object %o returned `undefined` instead of a value. The parent resolver did not include the property in the returned value and there was no resolver defined for the field."
  },
  58: {
    file: "@apollo/client/link/ws/index.js",
    message: "`WebSocketLink` uses the deprecated and unmaintained `subscriptions-transport-ws` library. This link is no longer maintained and will be removed in a future major version of Apollo Client. We recommend switching to `GraphQLWsLink` which uses the `graphql-ws` library to send GraphQL operations through WebSocket connections (https://the-guild.dev/graphql/ws)."
  },
  63: {
    file: "@apollo/client/link/core/ApolloLink.js",
    message: "[ApolloLink.split]: The test function returned a non-boolean value which could result in subtle bugs (e.g. such as using an `async` function which always returns a truthy value). Got `%o`."
  },
  64: {
    file: "@apollo/client/link/core/ApolloLink.js",
    message: "The terminating link provided to `ApolloLink.execute` called `forward` instead of handling the request. This results in an observable that immediately completes and does not emit a value. Please provide a terminating link that properly handles the request.\n\nIf you are using a split link, ensure each branch contains a terminating link that handles the request."
  },
  81: {
    file: "@apollo/client/core/ObservableQuery.js",
    message: `Called refetch(%o) for query %o, which does not declare a $variables variable.
Did you mean to call refetch(variables) instead of refetch({ variables })?`
  },
  85: {
    file: "@apollo/client/core/ObservableQuery.js",
    message: "Cannot poll on 'cache-only' query '%s' and as such, polling is disabled. Please use a different fetch policy."
  },
  90: {
    file: "@apollo/client/core/QueryManager.js",
    message: `Unknown query named "%s" requested in refetchQueries options.include array`
  },
  91: {
    file: "@apollo/client/core/QueryManager.js",
    message: `Unknown anonymous query requested in refetchQueries options.include array`
  },
  96: {
    file: "@apollo/client/core/QueryManager.js",
    message: '[%s]: Fragments masked by data masking are inaccessible when using fetch policy "no-cache". Please add `@unmask` to each fragment spread to access the data.'
  },
  100: {
    file: "@apollo/client/cache/inmemory/entityStore.js",
    message: "cache.modify: You are trying to write a Reference that is not part of the store: %o\nPlease make sure to set the `mergeIntoStore` parameter to `true` when creating a Reference that is not part of the store yet:\n`toReference(object, true)`"
  },
  101: {
    file: "@apollo/client/cache/inmemory/entityStore.js",
    message: "cache.modify: Writing an array with a mix of both References and Objects will not result in the Objects being normalized correctly.\nPlease convert the object instance %o to a Reference before writing it to the cache by calling `toReference(object, true)`."
  },
  104: {
    file: "@apollo/client/cache/inmemory/policies.js",
    message: `Inferring subtype %s of supertype %s`
  },
  105: {
    file: "@apollo/client/cache/inmemory/policies.js",
    message: `Undefined 'from' passed to readField with arguments %s`
  },
  112: {
    file: "@apollo/client/cache/inmemory/writeToStore.js",
    message: `Cache data may be lost when replacing the %s field of a %s object.

This could cause additional (usually avoidable) network requests to fetch data that were otherwise cached.

To address this problem (which is not a bug in Apollo Client), %sdefine a custom merge function for the %s field, so InMemoryCache can safely merge these objects:

  existing: %o
  incoming: %o

For more information about these options, please refer to the documentation:

  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers
  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects
`
  },
  113: {
    file: "@apollo/client/cache/core/cache.js",
    message: "Could not identify object passed to `from` for '%s' fragment, either because the object is non-normalized or the key fields are missing. If you are masking this object, please ensure the key fields are requested by the parent object."
  }
};
var devError = {
  14: {
    file: "@apollo/client/utilities/internal/removeDirectivesFromDocument.js",
    message: `Could not find operation or fragment`
  },
  34: {
    file: "@apollo/client/react/hooks/useSyncExternalStore.js",
    message: "The result of getSnapshot should be cached to avoid an infinite loop"
  },
  84: {
    file: "@apollo/client/core/ObservableQuery.js",
    message: "Unhandled GraphQL subscription error"
  },
  110: {
    file: "@apollo/client/cache/inmemory/writeToStore.js",
    message: `Missing field '%s' while writing result %o`
  }
};

// node_modules/@apollo/client/utilities/internal/globals/maybe.js
function maybe2(thunk) {
  try {
    return thunk();
  } catch {
  }
}

// node_modules/@apollo/client/utilities/internal/globals/global.js
var global_default = (
  // We don't expect the Function constructor ever to be invoked at runtime, as
  // long as at least one of globalThis, window, self, or global is defined, so
  // we are under no obligation to make it easy for static analysis tools to
  // detect syntactic usage of the Function constructor. If you think you can
  maybe2(() => globalThis) || maybe2(() => window) || maybe2(() => self) || maybe2(() => global) || // improve your static analysis to detect this obfuscation, think again. This
  // is an arms race you cannot win, at least not in JavaScript.
  maybe2(function() {
    return maybe2.constructor("return this")();
  })
);

// node_modules/@apollo/client/version.js
var version = "4.1.4";

// node_modules/@apollo/client/dev/symbol.js
var ApolloErrorMessageHandler = /* @__PURE__ */ Symbol.for("ApolloErrorMessageHandler_" + version);

// node_modules/@apollo/client/dev/setErrorMessageHandler.js
function setErrorMessageHandler(handler2) {
  global_default[ApolloErrorMessageHandler] = handler2;
}

// node_modules/@apollo/client/dev/loadErrorMessageHandler.js
function loadErrorMessageHandler(...errorCodes2) {
  setErrorMessageHandler(handler);
  for (const codes of errorCodes2) {
    Object.assign(handler, codes);
  }
  return handler;
}
var handler = ((message, args) => {
  if (typeof message === "number") {
    const definition = global_default[ApolloErrorMessageHandler][message];
    if (!message || !definition?.message)
      return;
    message = definition.message;
  }
  return args.reduce((msg, arg) => msg.replace(/%[sdfo]/, String(arg)), String(message));
});

// node_modules/@apollo/client/dev/loadDevMessages.js
function loadDevMessages() {
  loadErrorMessageHandler(devDebug, devError, devLog, devWarn);
}

// node_modules/@apollo/client/dev/loadErrorMessages.js
function loadErrorMessages() {
  loadErrorMessageHandler(errorCodes);
}

// node_modules/@apollo/client/utilities/environment/index.development.js
var __DEV__ = true;

// node_modules/@apollo/client/utilities/internal/makeUniqueId.js
var prefixCounts = /* @__PURE__ */ new Map();
function makeUniqueId(prefix) {
  const count = prefixCounts.get(prefix) || 1;
  prefixCounts.set(prefix, count + 1);
  return `${prefix}:${count}:${Math.random().toString(36).slice(2)}`;
}

// node_modules/@apollo/client/utilities/internal/stringifyForDisplay.js
function stringifyForDisplay(value, space = 0) {
  const undefId = makeUniqueId("stringifyForDisplay");
  return JSON.stringify(value, (_, value2) => {
    return value2 === void 0 ? undefId : value2;
  }, space).split(JSON.stringify(undefId)).join("<undefined>");
}

// node_modules/@apollo/client/utilities/invariant/index.js
var genericMessage = "Invariant Violation";
var InvariantError = class _InvariantError extends Error {
  constructor(message = genericMessage) {
    super(message);
    this.name = genericMessage;
    Object.setPrototypeOf(this, _InvariantError.prototype);
  }
};
var verbosityLevels = ["debug", "log", "warn", "error", "silent"];
var verbosityLevel = verbosityLevels.indexOf(__DEV__ ? "log" : "silent");
function invariant2(condition, ...args) {
  if (!condition) {
    throw newInvariantError(...args);
  }
}
function wrapConsoleMethod(name) {
  return function(message, ...args) {
    if (verbosityLevels.indexOf(name) >= verbosityLevel) {
      const method = console[name] || console.log;
      if (typeof message === "number") {
        const arg0 = message;
        message = getHandledErrorMsg(arg0);
        if (!message) {
          message = getFallbackErrorMsg(arg0, args);
          args = [];
        }
      }
      method(message, ...args);
    }
  };
}
invariant2.debug = wrapConsoleMethod("debug");
invariant2.log = wrapConsoleMethod("log");
invariant2.warn = wrapConsoleMethod("warn");
invariant2.error = wrapConsoleMethod("error");
function newInvariantError(message, ...optionalParams) {
  return new InvariantError(getHandledErrorMsg(message, optionalParams) || getFallbackErrorMsg(message, optionalParams));
}
var ApolloErrorMessageHandler2 = /* @__PURE__ */ Symbol.for("ApolloErrorMessageHandler_" + version);
function stringify(arg) {
  if (typeof arg == "string") {
    return arg;
  }
  try {
    return stringifyForDisplay(arg, 2).slice(0, 1e3);
  } catch {
    return "<non-serializable>";
  }
}
function getHandledErrorMsg(message, messageArgs = []) {
  if (!message)
    return;
  return global_default[ApolloErrorMessageHandler2] && global_default[ApolloErrorMessageHandler2](message, messageArgs.map(stringify));
}
function getFallbackErrorMsg(message, messageArgs = []) {
  if (!message)
    return;
  if (typeof message === "string") {
    return messageArgs.reduce((msg, arg) => msg.replace(/%[sdfo]/, stringify(arg)), message);
  }
  return `An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#${encodeURIComponent(JSON.stringify({
    version,
    message,
    args: messageArgs.map(stringify)
  }))}`;
}

// node_modules/@apollo/client/utilities/invariant/index.development.js
var invariant3 = (() => {
  loadDevMessages();
  loadErrorMessages();
  return invariant2;
})();

// node_modules/@apollo/client/utilities/internal/valueToObjectRepresentation.js
function valueToObjectRepresentation(argObj, name, value, variables) {
  if (value.kind === Kind.INT || value.kind === Kind.FLOAT) {
    argObj[name.value] = Number(value.value);
  } else if (value.kind === Kind.BOOLEAN || value.kind === Kind.STRING) {
    argObj[name.value] = value.value;
  } else if (value.kind === Kind.OBJECT) {
    const nestedArgObj = {};
    value.fields.map((obj) => valueToObjectRepresentation(nestedArgObj, obj.name, obj.value, variables));
    argObj[name.value] = nestedArgObj;
  } else if (value.kind === Kind.VARIABLE) {
    const variableValue = (variables || {})[value.name.value];
    argObj[name.value] = variableValue;
  } else if (value.kind === Kind.LIST) {
    argObj[name.value] = value.values.map((listValue) => {
      const nestedArgArrayObj = {};
      valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
      return nestedArgArrayObj[name.value];
    });
  } else if (value.kind === Kind.ENUM) {
    argObj[name.value] = value.value;
  } else if (value.kind === Kind.NULL) {
    argObj[name.value] = null;
  } else {
    throw newInvariantError(19, name.value, value.kind);
  }
}

// node_modules/@apollo/client/utilities/internal/argumentsObjectFromField.js
function argumentsObjectFromField(field, variables) {
  if (field.arguments && field.arguments.length) {
    const argObj = {};
    field.arguments.forEach(({ name, value }) => valueToObjectRepresentation(argObj, name, value, variables));
    return argObj;
  }
  return null;
}

// node_modules/@apollo/client/utilities/caching/sizes.js
var cacheSizeSymbol = /* @__PURE__ */ Symbol.for("apollo.cacheSize");
var cacheSizes = __spreadValues({}, global_default[cacheSizeSymbol]);

// node_modules/@apollo/client/utilities/internal/getOperationName.js
function getOperationName(doc, fallback) {
  return doc.definitions.find((definition) => definition.kind === "OperationDefinition" && !!definition.name)?.name.value ?? fallback;
}

// node_modules/@apollo/client/utilities/internal/caches.js
var scheduledCleanup = /* @__PURE__ */ new WeakSet();
function schedule(cache) {
  if (cache.size <= (cache.max || -1)) {
    return;
  }
  if (!scheduledCleanup.has(cache)) {
    scheduledCleanup.add(cache);
    setTimeout(() => {
      cache.clean();
      scheduledCleanup.delete(cache);
    }, 100);
  }
}
var AutoCleanedWeakCache = function(max, dispose) {
  const cache = new WeakCache(max, dispose);
  cache.set = function(key, value) {
    const ret = WeakCache.prototype.set.call(this, key, value);
    schedule(this);
    return ret;
  };
  return cache;
};
var AutoCleanedStrongCache = function(max, dispose) {
  const cache = new StrongCache(max, dispose);
  cache.set = function(key, value) {
    const ret = StrongCache.prototype.set.call(this, key, value);
    schedule(this);
    return ret;
  };
  return cache;
};

// node_modules/@apollo/client/utilities/internal/memoize.js
function memoize(fn, { max, makeCacheKey = (args) => args }) {
  const keys = new Trie(true);
  const cache = new AutoCleanedWeakCache(max);
  return (...args) => {
    const cacheKey = keys.lookupArray(makeCacheKey(args));
    const cached = cache.get(cacheKey);
    if (cached) {
      if (cached.error) {
        throw cached.error;
      }
      return cached.result;
    }
    const entry = cache.set(cacheKey, {});
    try {
      return entry.result = fn(...args);
    } catch (error) {
      entry.error = error;
      throw error;
    }
  };
}

// node_modules/@apollo/client/utilities/internal/checkDocument.js
var checkDocument = memoize((doc, expectedType) => {
  invariant3(doc && doc.kind === "Document", 1);
  const operations = doc.definitions.filter((d) => d.kind === "OperationDefinition");
  if (__DEV__) {
    doc.definitions.forEach((definition) => {
      if (definition.kind !== "OperationDefinition" && definition.kind !== "FragmentDefinition") {
        throw newInvariantError(2, definition.kind);
      }
    });
    invariant3(operations.length <= 1, 3, operations.length);
  }
  if (expectedType) {
    invariant3(
      operations.length == 1 && operations[0].operation === expectedType,
      4,
      expectedType,
      expectedType,
      operations[0].operation
    );
  }
  visit(doc, {
    Field(field, _, __, path) {
      if (field.alias && (field.alias.value === "__typename" || field.alias.value.startsWith("__ac_")) && field.alias.value !== field.name.value) {
        let current = doc, fieldPath = [];
        for (const key of path) {
          current = current[key];
          if (current.kind === Kind.FIELD) {
            fieldPath.push(current.alias?.value || current.name.value);
          }
        }
        fieldPath.splice(-1, 1, field.name.value);
        throw newInvariantError(
          5,
          field.alias.value,
          fieldPath.join("."),
          operations[0].operation,
          getOperationName(doc, "(anonymous)")
        );
      }
    }
  });
}, {
  max: cacheSizes["checkDocument"] || 2e3
});

// node_modules/@apollo/client/utilities/internal/cloneDeep.js
var { toString: toString2 } = Object.prototype;
function cloneDeep(value) {
  return __cloneDeep(value);
}
function __cloneDeep(val, seen) {
  switch (toString2.call(val)) {
    case "[object Array]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      const copy = val.slice(0);
      seen.set(val, copy);
      copy.forEach(function(child, i) {
        copy[i] = __cloneDeep(child, seen);
      });
      return copy;
    }
    case "[object Object]": {
      seen = seen || /* @__PURE__ */ new Map();
      if (seen.has(val))
        return seen.get(val);
      const copy = Object.create(Object.getPrototypeOf(val));
      seen.set(val, copy);
      Object.keys(val).forEach((key) => {
        copy[key] = __cloneDeep(val[key], seen);
      });
      return copy;
    }
    default:
      return val;
  }
}

// node_modules/@apollo/client/utilities/internal/combineLatestBatched.js
function combineLatestBatched(observables) {
  if (observables.length === 0) {
    return EMPTY;
  }
  return new Observable((observer) => {
    const { length } = observables;
    const values = new Array(length);
    const indexesByObservable = /* @__PURE__ */ new Map();
    observables.forEach((source, idx) => {
      if (!indexesByObservable.has(source)) {
        indexesByObservable.set(source, /* @__PURE__ */ new Set());
      }
      indexesByObservable.get(source).add(idx);
    });
    let active = indexesByObservable.size;
    let remainingFirstValues = indexesByObservable.size;
    let currentBatch;
    indexesByObservable.forEach((indexes, source) => {
      let hasFirstValue = false;
      const subscription = source.subscribe({
        next: (value) => {
          indexes.forEach((idx) => values[idx] = value);
          if (!hasFirstValue) {
            hasFirstValue = true;
            remainingFirstValues--;
          }
          if (!remainingFirstValues) {
            currentBatch ||= new Set(observables.filter((obs) => obs.dirty));
            currentBatch.delete(source);
            if (!currentBatch.size) {
              observer.next(values.slice());
              currentBatch = void 0;
            }
          }
        },
        complete: () => {
          active--;
          if (!active) {
            observer.complete();
          }
        },
        error: observer.error.bind(observer)
      });
      observer.add(subscription);
    });
  });
}

// node_modules/@apollo/client/utilities/internal/compact.js
function compact(...objects) {
  const result = {};
  objects.forEach((obj) => {
    if (!obj)
      return;
    Reflect.ownKeys(obj).forEach((key) => {
      const value = obj[key];
      if (value !== void 0) {
        result[key] = value;
      }
    });
  });
  return result;
}

// node_modules/@apollo/client/utilities/internal/createFragmentMap.js
function createFragmentMap(fragments = []) {
  const symTable = {};
  fragments.forEach((fragment) => {
    symTable[fragment.name.value] = fragment;
  });
  return symTable;
}

// node_modules/@apollo/client/utilities/internal/isNonNullObject.js
function isNonNullObject(obj) {
  return obj !== null && typeof obj === "object";
}

// node_modules/@apollo/client/utilities/internal/DeepMerger.js
var { hasOwnProperty: hasOwnProperty4 } = Object.prototype;
var defaultReconciler = function(target, source, property) {
  return this.merge(target[property], source[property]);
};
var objForKey = (key) => {
  return isNaN(+key) ? {} : [];
};
var DeepMerger = class {
  options;
  reconciler;
  constructor(options = {}) {
    this.options = options;
    this.reconciler = options.reconciler || defaultReconciler;
  }
  merge(target, source, mergeOptions2 = {}) {
    const atPath = mergeOptions2.atPath;
    if (atPath?.length) {
      const [head, ...tail] = atPath;
      if (target === void 0) {
        target = objForKey(head);
      }
      let nestedTarget = target[head];
      if (nestedTarget === void 0 && tail.length) {
        nestedTarget = objForKey(tail[0]);
      }
      const nestedSource = this.merge(nestedTarget, source, __spreadProps(__spreadValues({}, mergeOptions2), {
        atPath: tail
      }));
      if (nestedTarget !== nestedSource) {
        target = this.shallowCopyForMerge(target);
        target[head] = nestedSource;
      }
      return target;
    }
    if (Array.isArray(target) && Array.isArray(source) && this.options.arrayMerge === "truncate" && target.length > source.length) {
      target = target.slice(0, source.length);
      this.pastCopies.add(target);
    }
    if (isNonNullObject(source) && isNonNullObject(target)) {
      Object.keys(source).forEach((sourceKey) => {
        if (hasOwnProperty4.call(target, sourceKey)) {
          const targetValue = target[sourceKey];
          if (source[sourceKey] !== targetValue) {
            const result = this.reconciler(target, source, sourceKey);
            if (result !== targetValue) {
              target = this.shallowCopyForMerge(target);
              target[sourceKey] = result;
            }
          }
        } else {
          target = this.shallowCopyForMerge(target);
          target[sourceKey] = source[sourceKey];
        }
      });
      return target;
    }
    return source;
  }
  isObject = isNonNullObject;
  pastCopies = /* @__PURE__ */ new Set();
  shallowCopyForMerge(value) {
    if (isNonNullObject(value)) {
      if (!this.pastCopies.has(value)) {
        if (Array.isArray(value)) {
          value = value.slice(0);
        } else {
          value = __spreadValues({
            __proto__: Object.getPrototypeOf(value)
          }, value);
        }
        this.pastCopies.add(value);
      }
    }
    return value;
  }
};

// node_modules/@apollo/client/utilities/internal/getDefaultValues.js
function getDefaultValues(definition) {
  const defaultValues = {};
  const defs = definition && definition.variableDefinitions;
  if (defs && defs.length) {
    defs.forEach((def) => {
      if (def.defaultValue) {
        valueToObjectRepresentation(defaultValues, def.variable.name, def.defaultValue);
      }
    });
  }
  return defaultValues;
}

// node_modules/@apollo/client/utilities/internal/getFragmentFromSelection.js
function getFragmentFromSelection(selection, fragmentMap) {
  switch (selection.kind) {
    case "InlineFragment":
      return selection;
    case "FragmentSpread": {
      const fragmentName = selection.name.value;
      if (typeof fragmentMap === "function") {
        return fragmentMap(fragmentName);
      }
      const fragment = fragmentMap && fragmentMap[fragmentName];
      invariant3(fragment, 9, fragmentName);
      return fragment || null;
    }
    default:
      return null;
  }
}

// node_modules/@apollo/client/utilities/internal/getFragmentQueryDocument.js
function getFragmentQueryDocument(document, fragmentName) {
  let actualFragmentName = fragmentName;
  const fragments = [];
  document.definitions.forEach((definition) => {
    if (definition.kind === "OperationDefinition") {
      throw newInvariantError(
        10,
        definition.operation,
        definition.name ? ` named '${definition.name.value}'` : ""
      );
    }
    if (definition.kind === "FragmentDefinition") {
      fragments.push(definition);
    }
  });
  if (typeof actualFragmentName === "undefined") {
    invariant3(fragments.length === 1, 11, fragments.length);
    actualFragmentName = fragments[0].name.value;
  }
  const query = __spreadProps(__spreadValues({}, document), {
    definitions: [
      {
        kind: "OperationDefinition",
        // OperationTypeNode is an enum
        operation: "query",
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "FragmentSpread",
              name: {
                kind: "Name",
                value: actualFragmentName
              }
            }
          ]
        }
      },
      ...document.definitions
    ]
  });
  return query;
}

// node_modules/@apollo/client/utilities/internal/getFragmentDefinition.js
function getFragmentDefinition(doc) {
  invariant3(doc.kind === "Document", 6);
  invariant3(doc.definitions.length <= 1, 7);
  const fragmentDef = doc.definitions[0];
  invariant3(fragmentDef.kind === "FragmentDefinition", 8);
  return fragmentDef;
}

// node_modules/@apollo/client/utilities/internal/getFragmentDefinitions.js
function getFragmentDefinitions(doc) {
  return doc.definitions.filter((definition) => definition.kind === "FragmentDefinition");
}

// node_modules/@apollo/client/utilities/internal/getMainDefinition.js
function getMainDefinition(queryDoc) {
  checkDocument(queryDoc);
  let fragmentDefinition;
  for (let definition of queryDoc.definitions) {
    if (definition.kind === "OperationDefinition") {
      return definition;
    }
    if (definition.kind === "FragmentDefinition" && !fragmentDefinition) {
      fragmentDefinition = definition;
    }
  }
  if (fragmentDefinition) {
    return fragmentDefinition;
  }
  throw newInvariantError(12);
}

// node_modules/@apollo/client/utilities/internal/getOperationDefinition.js
function getOperationDefinition(doc) {
  checkDocument(doc);
  return doc.definitions.filter((definition) => definition.kind === "OperationDefinition")[0];
}

// node_modules/@apollo/client/utilities/internal/getQueryDefinition.js
function getQueryDefinition(doc) {
  const queryDef = getOperationDefinition(doc);
  invariant3(queryDef && queryDef.operation === "query", 13);
  return queryDef;
}

// node_modules/@apollo/client/utilities/internal/getMemoryInternals.js
var globalCaches = {};
function registerGlobalCache(name, getSize) {
  globalCaches[name] = getSize;
}
var getApolloClientMemoryInternals = __DEV__ ? _getApolloClientMemoryInternals : void 0;
var getInMemoryCacheMemoryInternals = __DEV__ ? _getInMemoryCacheMemoryInternals : void 0;
var getApolloCacheMemoryInternals = __DEV__ ? _getApolloCacheMemoryInternals : void 0;
function getCurrentCacheSizes() {
  const defaults = {
    canonicalStringify: 1e3,
    checkDocument: 2e3,
    print: 2e3,
    "documentTransform.cache": 2e3,
    "queryManager.getDocumentInfo": 2e3,
    "PersistedQueryLink.persistedQueryHashes": 2e3,
    "fragmentRegistry.transform": 2e3,
    "fragmentRegistry.lookup": 1e3,
    "fragmentRegistry.findFragmentSpreads": 4e3,
    "cache.fragmentQueryDocuments": 1e3,
    "removeTypenameFromVariables.getVariableDefinitions": 2e3,
    "inMemoryCache.maybeBroadcastWatch": 5e3,
    "inMemoryCache.executeSelectionSet": 5e4,
    "inMemoryCache.executeSubSelectedArray": 1e4
  };
  return Object.fromEntries(Object.entries(defaults).map(([k, v]) => [
    k,
    cacheSizes[k] || v
  ]));
}
function _getApolloClientMemoryInternals() {
  if (!__DEV__)
    throw new Error("only supported in development mode");
  return {
    limits: getCurrentCacheSizes(),
    sizes: __spreadValues({
      print: globalCaches.print?.(),
      canonicalStringify: globalCaches.canonicalStringify?.(),
      links: linkInfo(this.link),
      queryManager: {
        getDocumentInfo: this["queryManager"]["transformCache"].size,
        documentTransforms: transformInfo(this["queryManager"].documentTransform)
      }
    }, this.cache.getMemoryInternals?.())
  };
}
function _getApolloCacheMemoryInternals() {
  return {
    cache: {
      fragmentQueryDocuments: getWrapperInformation(this["getFragmentDoc"])
    }
  };
}
function _getInMemoryCacheMemoryInternals() {
  const fragments = this.config.fragments;
  return __spreadProps(__spreadValues({}, _getApolloCacheMemoryInternals.apply(this)), {
    addTypenameDocumentTransform: transformInfo(this["addTypenameTransform"]),
    inMemoryCache: {
      executeSelectionSet: getWrapperInformation(this["storeReader"]["executeSelectionSet"]),
      executeSubSelectedArray: getWrapperInformation(this["storeReader"]["executeSubSelectedArray"]),
      maybeBroadcastWatch: getWrapperInformation(this["maybeBroadcastWatch"])
    },
    fragmentRegistry: {
      findFragmentSpreads: getWrapperInformation(fragments?.findFragmentSpreads),
      lookup: getWrapperInformation(fragments?.lookup),
      transform: getWrapperInformation(fragments?.transform)
    }
  });
}
function isWrapper(f) {
  return !!f && "dirtyKey" in f;
}
function getWrapperInformation(f) {
  return isWrapper(f) ? f.size : void 0;
}
function isDefined(value) {
  return value != null;
}
function transformInfo(transform) {
  return recurseTransformInfo(transform).map((cache) => ({ cache }));
}
function recurseTransformInfo(transform) {
  return transform ? [
    getWrapperInformation(transform?.["performWork"]),
    ...recurseTransformInfo(transform?.["left"]),
    ...recurseTransformInfo(transform?.["right"])
  ].filter(isDefined) : [];
}
function linkInfo(link) {
  return link ? [
    link?.getMemoryInternals?.(),
    ...linkInfo(link?.left),
    ...linkInfo(link?.right)
  ].filter(isDefined) : [];
}

// node_modules/@apollo/client/utilities/internal/canonicalStringify.js
var canonicalStringify = Object.assign(function canonicalStringify2(value) {
  return JSON.stringify(value, stableObjectReplacer);
}, {
  reset() {
    sortingMap = new AutoCleanedStrongCache(
      cacheSizes.canonicalStringify || 1e3
      /* defaultCacheSizes.canonicalStringify */
    );
  }
});
if (__DEV__) {
  registerGlobalCache("canonicalStringify", () => sortingMap.size);
}
var sortingMap;
canonicalStringify.reset();
function stableObjectReplacer(key, value) {
  if (value && typeof value === "object") {
    const proto = Object.getPrototypeOf(value);
    if (proto === Object.prototype || proto === null) {
      const keys = Object.keys(value);
      if (keys.every(everyKeyInOrder))
        return value;
      const unsortedKey = JSON.stringify(keys);
      let sortedKeys = sortingMap.get(unsortedKey);
      if (!sortedKeys) {
        keys.sort();
        const sortedKey = JSON.stringify(keys);
        sortedKeys = sortingMap.get(sortedKey) || keys;
        sortingMap.set(unsortedKey, sortedKeys);
        sortingMap.set(sortedKey, sortedKeys);
      }
      const sortedObject = Object.create(proto);
      sortedKeys.forEach((key2) => {
        sortedObject[key2] = value[key2];
      });
      return sortedObject;
    }
  }
  return value;
}
function everyKeyInOrder(key, i, keys) {
  return i === 0 || keys[i - 1] <= key;
}

// node_modules/@apollo/client/utilities/internal/getStoreKeyName.js
var KNOWN_DIRECTIVES = [
  "connection",
  "include",
  "skip",
  "client",
  "rest",
  "export",
  "nonreactive",
  "stream"
];
var storeKeyNameStringify = canonicalStringify;
var getStoreKeyName = Object.assign(function(fieldName, args, directives) {
  if (args && directives && directives["connection"] && directives["connection"]["key"]) {
    if (directives["connection"]["filter"] && directives["connection"]["filter"].length > 0) {
      const filterKeys = directives["connection"]["filter"] ? directives["connection"]["filter"] : [];
      filterKeys.sort();
      const filteredArgs = {};
      filterKeys.forEach((key) => {
        filteredArgs[key] = args[key];
      });
      const stringifiedArgs = storeKeyNameStringify(filteredArgs);
      if (stringifiedArgs !== "{}") {
        return `${directives["connection"]["key"]}(${stringifiedArgs})`;
      }
    }
    return directives["connection"]["key"];
  }
  let completeFieldName = fieldName;
  if (args) {
    const stringifiedArgs = storeKeyNameStringify(args);
    if (stringifiedArgs !== "{}") {
      completeFieldName += `(${stringifiedArgs})`;
    }
  }
  if (directives) {
    Object.keys(directives).forEach((key) => {
      if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
        return;
      if (directives[key] && Object.keys(directives[key]).length) {
        completeFieldName += `@${key}(${storeKeyNameStringify(directives[key])})`;
      } else {
        completeFieldName += `@${key}`;
      }
    });
  }
  return completeFieldName;
}, {
  setStringify(s) {
    const previous = storeKeyNameStringify;
    storeKeyNameStringify = s;
    return previous;
  }
});

// node_modules/@apollo/client/utilities/internal/graphQLResultHasError.js
function graphQLResultHasError(result) {
  return !!result.errors?.length;
}

// node_modules/@apollo/client/utilities/internal/hasDirectives.js
function hasDirectives(names, root, all) {
  const nameSet = new Set(names);
  const uniqueCount = nameSet.size;
  visit(root, {
    Directive(node) {
      if (nameSet.delete(node.name.value) && (!all || !nameSet.size)) {
        return BREAK;
      }
    }
  });
  return all ? !nameSet.size : nameSet.size < uniqueCount;
}

// node_modules/@apollo/client/utilities/internal/hasForcedResolvers.js
function hasForcedResolvers(document) {
  let forceResolvers = false;
  visit(document, {
    Directive: {
      enter(node) {
        if (node.name.value === "client" && node.arguments) {
          forceResolvers = node.arguments.some((arg) => arg.name.value === "always" && arg.value.kind === "BooleanValue" && arg.value.value === true);
          if (forceResolvers) {
            return BREAK;
          }
        }
      }
    }
  });
  return forceResolvers;
}

// node_modules/@apollo/client/utilities/internal/isArray.js
var isArray = Array.isArray;

// node_modules/@apollo/client/utilities/internal/isDocumentNode.js
function isDocumentNode(value) {
  return isNonNullObject(value) && value.kind === "Document" && Array.isArray(value.definitions);
}

// node_modules/@apollo/client/utilities/internal/isField.js
function isField(selection) {
  return selection.kind === "Field";
}

// node_modules/@apollo/client/utilities/internal/isNonEmptyArray.js
function isNonEmptyArray(value) {
  return Array.isArray(value) && value.length > 0;
}

// node_modules/@apollo/client/utilities/internal/makeReference.js
function makeReference(id) {
  return { __ref: String(id) };
}

// node_modules/@apollo/client/utilities/internal/deepFreeze.js
function deepFreeze(value) {
  const workSet = /* @__PURE__ */ new Set([value]);
  workSet.forEach((obj) => {
    if (isNonNullObject(obj) && shallowFreeze(obj) === obj) {
      Object.getOwnPropertyNames(obj).forEach((name) => {
        if (isNonNullObject(obj[name]))
          workSet.add(obj[name]);
      });
    }
  });
  return value;
}
function shallowFreeze(obj) {
  if (__DEV__ && !Object.isFrozen(obj)) {
    try {
      Object.freeze(obj);
    } catch (e) {
      if (e instanceof TypeError)
        return null;
      throw e;
    }
  }
  return obj;
}

// node_modules/@apollo/client/utilities/internal/maybeDeepFreeze.js
function maybeDeepFreeze(obj) {
  if (__DEV__) {
    deepFreeze(obj);
  }
  return obj;
}

// node_modules/@apollo/client/utilities/internal/mergeDeepArray.js
function mergeDeepArray(sources) {
  let target = sources[0] || {};
  const count = sources.length;
  if (count > 1) {
    const merger = new DeepMerger();
    for (let i = 1; i < count; ++i) {
      target = merger.merge(target, sources[i]);
    }
  }
  return target;
}

// node_modules/@apollo/client/utilities/internal/mergeOptions.js
function mergeOptions(defaults, options) {
  return compact(defaults, options, options.variables && {
    variables: compact(__spreadValues(__spreadValues({}, defaults && defaults.variables), options.variables))
  });
}

// node_modules/@apollo/client/utilities/internal/preventUnhandledRejection.js
function preventUnhandledRejection(promise) {
  promise.catch(() => {
  });
  return promise;
}

// node_modules/@apollo/client/utilities/internal/removeDirectivesFromDocument.js
function removeDirectivesFromDocument(directives, doc) {
  checkDocument(doc);
  const getInUseByOperationName = makeInUseGetterFunction("");
  const getInUseByFragmentName = makeInUseGetterFunction("");
  const getInUse = (ancestors) => {
    for (let p = 0, ancestor; p < ancestors.length && (ancestor = ancestors[p]); ++p) {
      if (isArray(ancestor))
        continue;
      if (ancestor.kind === Kind.OPERATION_DEFINITION) {
        return getInUseByOperationName(ancestor.name && ancestor.name.value);
      }
      if (ancestor.kind === Kind.FRAGMENT_DEFINITION) {
        return getInUseByFragmentName(ancestor.name.value);
      }
    }
    invariant3.error(14);
    return null;
  };
  let operationCount = 0;
  for (let i = doc.definitions.length - 1; i >= 0; --i) {
    if (doc.definitions[i].kind === Kind.OPERATION_DEFINITION) {
      ++operationCount;
    }
  }
  const directiveMatcher = getDirectiveMatcher(directives);
  const shouldRemoveField = (nodeDirectives) => isNonEmptyArray(nodeDirectives) && nodeDirectives.map(directiveMatcher).some((config) => config && config.remove);
  const originalFragmentDefsByPath = /* @__PURE__ */ new Map();
  let firstVisitMadeChanges = false;
  const fieldOrInlineFragmentVisitor = {
    enter(node) {
      if (shouldRemoveField(node.directives)) {
        firstVisitMadeChanges = true;
        return null;
      }
    }
  };
  const docWithoutDirectiveSubtrees = visit(doc, {
    // These two AST node types share the same implementation, defined above.
    Field: fieldOrInlineFragmentVisitor,
    InlineFragment: fieldOrInlineFragmentVisitor,
    VariableDefinition: {
      enter() {
        return false;
      }
    },
    Variable: {
      enter(node, _key, _parent, _path, ancestors) {
        const inUse = getInUse(ancestors);
        if (inUse) {
          inUse.variables.add(node.name.value);
        }
      }
    },
    FragmentSpread: {
      enter(node, _key, _parent, _path, ancestors) {
        if (shouldRemoveField(node.directives)) {
          firstVisitMadeChanges = true;
          return null;
        }
        const inUse = getInUse(ancestors);
        if (inUse) {
          inUse.fragmentSpreads.add(node.name.value);
        }
      }
    },
    FragmentDefinition: {
      enter(node, _key, _parent, path) {
        originalFragmentDefsByPath.set(JSON.stringify(path), node);
      },
      leave(node, _key, _parent, path) {
        const originalNode = originalFragmentDefsByPath.get(JSON.stringify(path));
        if (node === originalNode) {
          return node;
        }
        if (
          // This logic applies only if the document contains one or more
          // operations, since removing all fragments from a document containing
          // only fragments makes the document useless.
          operationCount > 0 && node.selectionSet.selections.every((selection) => selection.kind === Kind.FIELD && selection.name.value === "__typename")
        ) {
          getInUseByFragmentName(node.name.value).removed = true;
          firstVisitMadeChanges = true;
          return null;
        }
      }
    },
    Directive: {
      leave(node) {
        if (directiveMatcher(node)) {
          firstVisitMadeChanges = true;
          return null;
        }
      }
    }
  });
  if (!firstVisitMadeChanges) {
    return doc;
  }
  const populateTransitiveVars = (inUse) => {
    if (!inUse.transitiveVars) {
      inUse.transitiveVars = new Set(inUse.variables);
      if (!inUse.removed) {
        inUse.fragmentSpreads.forEach((childFragmentName) => {
          populateTransitiveVars(getInUseByFragmentName(childFragmentName)).transitiveVars.forEach((varName) => {
            inUse.transitiveVars.add(varName);
          });
        });
      }
    }
    return inUse;
  };
  const allFragmentNamesUsed = /* @__PURE__ */ new Set();
  docWithoutDirectiveSubtrees.definitions.forEach((def) => {
    if (def.kind === Kind.OPERATION_DEFINITION) {
      populateTransitiveVars(getInUseByOperationName(def.name && def.name.value)).fragmentSpreads.forEach((childFragmentName) => {
        allFragmentNamesUsed.add(childFragmentName);
      });
    } else if (def.kind === Kind.FRAGMENT_DEFINITION && // If there are no operations in the document, then all fragment
    // definitions count as usages of their own fragment names. This heuristic
    // prevents accidentally removing all fragment definitions from the
    // document just because it contains no operations that use the fragments.
    operationCount === 0 && !getInUseByFragmentName(def.name.value).removed) {
      allFragmentNamesUsed.add(def.name.value);
    }
  });
  allFragmentNamesUsed.forEach((fragmentName) => {
    populateTransitiveVars(getInUseByFragmentName(fragmentName)).fragmentSpreads.forEach((childFragmentName) => {
      allFragmentNamesUsed.add(childFragmentName);
    });
  });
  const fragmentWillBeRemoved = (fragmentName) => !!// A fragment definition will be removed if there are no spreads that refer
  // to it, or the fragment was explicitly removed because it had no fields
  // other than __typename.
  (!allFragmentNamesUsed.has(fragmentName) || getInUseByFragmentName(fragmentName).removed);
  const enterVisitor = {
    enter(node) {
      if (fragmentWillBeRemoved(node.name.value)) {
        return null;
      }
    }
  };
  return nullIfDocIsEmpty(visit(docWithoutDirectiveSubtrees, {
    // If the fragment is going to be removed, then leaving any dangling
    // FragmentSpread nodes with the same name would be a mistake.
    FragmentSpread: enterVisitor,
    // This is where the fragment definition is actually removed.
    FragmentDefinition: enterVisitor,
    OperationDefinition: {
      leave(node) {
        if (node.variableDefinitions) {
          const usedVariableNames = populateTransitiveVars(
            // If an operation is anonymous, we use the empty string as its key.
            getInUseByOperationName(node.name && node.name.value)
          ).transitiveVars;
          if (usedVariableNames.size < node.variableDefinitions.length) {
            return __spreadProps(__spreadValues({}, node), {
              variableDefinitions: node.variableDefinitions.filter((varDef) => usedVariableNames.has(varDef.variable.name.value))
            });
          }
        }
      }
    }
  }));
}
function makeInUseGetterFunction(defaultKey) {
  const map2 = /* @__PURE__ */ new Map();
  return function inUseGetterFunction(key = defaultKey) {
    let inUse = map2.get(key);
    if (!inUse) {
      map2.set(key, inUse = {
        // Variable and fragment spread names used directly within this
        // operation or fragment definition, as identified by key. These sets
        // will be populated during the first traversal of the document in
        // removeDirectivesFromDocument below.
        variables: /* @__PURE__ */ new Set(),
        fragmentSpreads: /* @__PURE__ */ new Set()
      });
    }
    return inUse;
  };
}
function getDirectiveMatcher(configs) {
  const names = /* @__PURE__ */ new Map();
  const tests = /* @__PURE__ */ new Map();
  configs.forEach((directive) => {
    if (directive) {
      if (directive.name) {
        names.set(directive.name, directive);
      } else if (directive.test) {
        tests.set(directive.test, directive);
      }
    }
  });
  return (directive) => {
    let config = names.get(directive.name.value);
    if (!config && tests.size) {
      tests.forEach((testConfig, test) => {
        if (test(directive)) {
          config = testConfig;
        }
      });
    }
    return config;
  };
}
function isEmpty(op, fragmentMap) {
  return !op || op.selectionSet.selections.every((selection) => selection.kind === Kind.FRAGMENT_SPREAD && isEmpty(fragmentMap[selection.name.value], fragmentMap));
}
function nullIfDocIsEmpty(doc) {
  return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc))) ? null : doc;
}

// node_modules/@apollo/client/utilities/internal/removeFragmentSpreads.js
function removeMaskedFragmentSpreads(document) {
  return visit(document, {
    FragmentSpread(node) {
      if (!node.directives?.some(({ name }) => name.value === "unmask")) {
        return null;
      }
    }
  });
}

// node_modules/@apollo/client/utilities/internal/resultKeyNameFromField.js
function resultKeyNameFromField(field) {
  return field.alias ? field.alias.value : field.name.value;
}

// node_modules/@apollo/client/utilities/internal/shouldInclude.js
function shouldInclude({ directives }, variables) {
  if (!directives || !directives.length) {
    return true;
  }
  return getInclusionDirectives(directives).every(({ directive, ifArgument }) => {
    let evaledValue = false;
    if (ifArgument.value.kind === "Variable") {
      evaledValue = variables && variables[ifArgument.value.name.value];
      invariant3(evaledValue !== void 0, 15, directive.name.value);
    } else {
      evaledValue = ifArgument.value.value;
    }
    return directive.name.value === "skip" ? !evaledValue : evaledValue;
  });
}
function isInclusionDirective({ name: { value } }) {
  return value === "skip" || value === "include";
}
function getInclusionDirectives(directives) {
  const result = [];
  if (directives && directives.length) {
    directives.forEach((directive) => {
      if (!isInclusionDirective(directive))
        return;
      const directiveArguments = directive.arguments;
      const directiveName = directive.name.value;
      invariant3(directiveArguments && directiveArguments.length === 1, 16, directiveName);
      const ifArgument = directiveArguments[0];
      invariant3(ifArgument.name && ifArgument.name.value === "if", 17, directiveName);
      const ifValue = ifArgument.value;
      invariant3(ifValue && (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), 18, directiveName);
      result.push({ directive, ifArgument });
    });
  }
  return result;
}

// node_modules/@apollo/client/utilities/internal/storeKeyNameFromField.js
function storeKeyNameFromField(field, variables) {
  let directivesObj = null;
  if (field.directives) {
    directivesObj = {};
    field.directives.forEach((directive) => {
      directivesObj[directive.name.value] = {};
      if (directive.arguments) {
        directive.arguments.forEach(({ name, value }) => valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables));
      }
    });
  }
  let argObj = null;
  if (field.arguments && field.arguments.length) {
    argObj = {};
    field.arguments.forEach(({ name, value }) => valueToObjectRepresentation(argObj, name, value, variables));
  }
  return getStoreKeyName(field.name.value, argObj, directivesObj);
}

// node_modules/@apollo/client/utilities/internal/toQueryResult.js
function toQueryResult(value) {
  const result = {
    data: value.data
  };
  if (value.error) {
    result.error = value.error;
  }
  return result;
}

// node_modules/@apollo/client/utilities/internal/filterMap.js
function filterMap(fn, makeContext = () => void 0) {
  return (source) => new Observable((subscriber) => {
    let context = makeContext();
    return source.subscribe({
      next(value) {
        let result;
        try {
          result = fn(value, context);
        } catch (e) {
          subscriber.error(e);
        }
        if (result === void 0) {
          return;
        }
        subscriber.next(result);
      },
      error(err) {
        subscriber.error(err);
      },
      complete() {
        subscriber.complete();
      }
    });
  });
}

// node_modules/@apollo/client/utilities/internal/equalByQuery.js
function equalByQuery(query, _a, _c, variables) {
  var _b = _a, { data: aData } = _b, aRest = __objRest(_b, ["data"]);
  var _d = _c, { data: bData } = _d, bRest = __objRest(_d, ["data"]);
  return equal(aRest, bRest) && equalBySelectionSet(getMainDefinition(query).selectionSet, aData, bData, {
    fragmentMap: createFragmentMap(getFragmentDefinitions(query)),
    variables
  });
}
function equalBySelectionSet(selectionSet, aResult, bResult, context) {
  if (aResult === bResult) {
    return true;
  }
  const seenSelections = /* @__PURE__ */ new Set();
  return selectionSet.selections.every((selection) => {
    if (seenSelections.has(selection))
      return true;
    seenSelections.add(selection);
    if (!shouldInclude(selection, context.variables))
      return true;
    if (selectionHasNonreactiveDirective(selection))
      return true;
    if (isField(selection)) {
      const resultKey = resultKeyNameFromField(selection);
      const aResultChild = aResult && aResult[resultKey];
      const bResultChild = bResult && bResult[resultKey];
      const childSelectionSet = selection.selectionSet;
      if (!childSelectionSet) {
        return equal(aResultChild, bResultChild);
      }
      const aChildIsArray = Array.isArray(aResultChild);
      const bChildIsArray = Array.isArray(bResultChild);
      if (aChildIsArray !== bChildIsArray)
        return false;
      if (aChildIsArray && bChildIsArray) {
        const length = aResultChild.length;
        if (bResultChild.length !== length) {
          return false;
        }
        for (let i = 0; i < length; ++i) {
          if (!equalBySelectionSet(childSelectionSet, aResultChild[i], bResultChild[i], context)) {
            return false;
          }
        }
        return true;
      }
      return equalBySelectionSet(childSelectionSet, aResultChild, bResultChild, context);
    } else {
      const fragment = getFragmentFromSelection(selection, context.fragmentMap);
      if (fragment) {
        if (selectionHasNonreactiveDirective(fragment))
          return true;
        return equalBySelectionSet(
          fragment.selectionSet,
          // Notice that we reuse the same aResult and bResult values here,
          // since the fragment ...spread does not specify a field name, but
          // consists of multiple fields (within the fragment's selection set)
          // that should be applied to the current result value(s).
          aResult,
          bResult,
          context
        );
      }
    }
  });
}
function selectionHasNonreactiveDirective(selection) {
  return !!selection.directives && selection.directives.some(directiveIsNonreactive);
}
function directiveIsNonreactive(dir) {
  return dir.name.value === "nonreactive";
}

// node_modules/@apollo/client/utilities/internal/mapObservableFragment.js
function mapObservableFragment(observable, mapFn) {
  let currentResult;
  let stableMappedResult;
  function toMapped(result) {
    if (result !== currentResult) {
      currentResult = result;
      stableMappedResult = mapFn(currentResult);
    }
    return stableMappedResult;
  }
  return Object.assign(observable.pipe(map(toMapped), shareReplay({ bufferSize: 1, refCount: true })), {
    getCurrentResult: () => toMapped(observable.getCurrentResult())
  });
}
var mapObservableFragmentMemoized = memoize(function mapObservableFragmentMemoized2(observable, _cacheKey, mapFn) {
  return mapObservableFragment(observable, mapFn);
}, { max: 1, makeCacheKey: (args) => args.slice(0, 2) });

// node_modules/@apollo/client/utilities/internal/constants.js
var extensionsSymbol = /* @__PURE__ */ Symbol.for("apollo.result.extensions");
var streamInfoSymbol = /* @__PURE__ */ Symbol.for("apollo.result.streamInfo");
var variablesUnknownSymbol = /* @__PURE__ */ Symbol.for("apollo.observableQuery.variablesUnknown");

// node_modules/@apollo/client/utilities/internal/bindCacheKey.js
function bindCacheKey(...prebound) {
  return defaultMakeCacheKey.bind(null, ...prebound);
}

// node_modules/@apollo/client/utilities/graphql/DocumentTransform.js
function identity(document) {
  return document;
}
var DocumentTransform = class _DocumentTransform {
  transform;
  cached;
  resultCache = /* @__PURE__ */ new WeakSet();
  // This default implementation of getCacheKey can be overridden by providing
  // options.getCacheKey to the DocumentTransform constructor. In general, a
  // getCacheKey function may either return an array of keys (often including
  // the document) to be used as a cache key, or undefined to indicate the
  // transform for this document should not be cached.
  getCacheKey(document) {
    return [document];
  }
  /**
   * Creates a DocumentTransform that returns the input document unchanged.
   *
   * @returns The input document
   */
  static identity() {
    return new _DocumentTransform(identity, { cache: false });
  }
  /**
   * Creates a DocumentTransform that conditionally applies one of two transforms.
   *
   * @param predicate - Function that determines which transform to apply
   * @param left - Transform to apply when `predicate` returns `true`
   * @param right - Transform to apply when `predicate` returns `false`. If not provided, it defaults to `DocumentTransform.identity()`.
   * @returns A DocumentTransform that conditionally applies a document transform based on the predicate
   *
   * @example
   *
   * ```ts
   * import { isQueryOperation } from "@apollo/client/utilities";
   *
   * const conditionalTransform = DocumentTransform.split(
   *   (document) => isQueryOperation(document),
   *   queryTransform,
   *   mutationTransform
   * );
   * ```
   */
  static split(predicate, left, right = _DocumentTransform.identity()) {
    return Object.assign(new _DocumentTransform(
      (document) => {
        const documentTransform = predicate(document) ? left : right;
        return documentTransform.transformDocument(document);
      },
      // Reasonably assume both `left` and `right` transforms handle their own caching
      { cache: false }
    ), { left, right });
  }
  constructor(transform, options = {}) {
    this.transform = transform;
    if (options.getCacheKey) {
      this.getCacheKey = options.getCacheKey;
    }
    this.cached = options.cache !== false;
    this.resetCache();
  }
  /**
   * Resets the internal cache of this transform, if it is cached.
   */
  resetCache() {
    if (this.cached) {
      const stableCacheKeys = new Trie();
      this.performWork = wrap(_DocumentTransform.prototype.performWork.bind(this), {
        makeCacheKey: (document) => {
          const cacheKeys = this.getCacheKey(document);
          if (cacheKeys) {
            invariant3(Array.isArray(cacheKeys), 20);
            return stableCacheKeys.lookupArray(cacheKeys);
          }
        },
        max: cacheSizes["documentTransform.cache"],
        cache: WeakCache
      });
    }
  }
  performWork(document) {
    checkDocument(document);
    return this.transform(document);
  }
  /**
   * Transforms a GraphQL document using the configured transform function.
   *
   * @remarks
   *
   * Note that `transformDocument` caches the transformed document. Calling
   * `transformDocument` again with the already-transformed document will
   * immediately return it.
   *
   * @param document - The GraphQL document to transform
   * @returns The transformed document
   *
   * @example
   *
   * ```ts
   * const document = gql`
   *   # ...
   * `;
   *
   * const documentTransform = new DocumentTransform(transformFn);
   * const transformedDocument = documentTransform.transformDocument(document);
   * ```
   */
  transformDocument(document) {
    if (this.resultCache.has(document)) {
      return document;
    }
    const transformedDocument = this.performWork(document);
    this.resultCache.add(transformedDocument);
    return transformedDocument;
  }
  /**
   * Combines this document transform with another document transform. The
   * returned document transform first applies the current document transform,
   * then applies the other document transform.
   *
   * @param otherTransform - The transform to apply after this one
   * @returns A new DocumentTransform that applies both transforms in sequence
   *
   * @example
   *
   * ```ts
   * const combinedTransform = addTypenameTransform.concat(
   *   removeDirectivesTransform
   * );
   * ```
   */
  concat(otherTransform) {
    return Object.assign(new _DocumentTransform(
      (document) => {
        return otherTransform.transformDocument(this.transformDocument(document));
      },
      // Reasonably assume both transforms handle their own caching
      { cache: false }
    ), {
      left: this,
      right: otherTransform
    });
  }
  /**
  * @internal
  * Used to iterate through all transforms that are concatenations or `split` links.
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  left;
  /**
  * @internal
  * Used to iterate through all transforms that are concatenations or `split` links.
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  right;
};

// node_modules/@apollo/client/utilities/graphql/print.js
var printCache;
var print2 = Object.assign((ast) => {
  let result = printCache.get(ast);
  if (!result) {
    result = print(ast);
    printCache.set(ast, result);
  }
  return result;
}, {
  reset() {
    printCache = new AutoCleanedWeakCache(
      cacheSizes.print || 2e3
      /* defaultCacheSizes.print */
    );
  }
});
print2.reset();
if (__DEV__) {
  registerGlobalCache("print", () => printCache ? printCache.size : 0);
}

// node_modules/@apollo/client/utilities/graphql/storeUtils.js
function isReference(obj) {
  return Boolean(obj && typeof obj === "object" && typeof obj.__ref === "string");
}

// node_modules/@apollo/client/utilities/graphql/transform.js
var TYPENAME_FIELD = {
  kind: Kind.FIELD,
  name: {
    kind: Kind.NAME,
    value: "__typename"
  }
};
var addTypenameToDocument = Object.assign(function(doc) {
  return visit(doc, {
    SelectionSet: {
      enter(node, _key, parent) {
        if (parent && parent.kind === Kind.OPERATION_DEFINITION) {
          return;
        }
        const { selections } = node;
        if (!selections) {
          return;
        }
        const skip = selections.some((selection) => {
          return selection.kind === Kind.FIELD && (selection.name.value === "__typename" || selection.name.value.lastIndexOf("__", 0) === 0);
        });
        if (skip) {
          return;
        }
        const field = parent;
        if (field.kind === Kind.FIELD && field.directives && field.directives.some((d) => d.name.value === "export")) {
          return;
        }
        return __spreadProps(__spreadValues({}, node), {
          selections: [...selections, TYPENAME_FIELD]
        });
      }
    }
  });
}, {
  added(field) {
    return field === TYPENAME_FIELD;
  }
});

// node_modules/@apollo/client/utilities/isNetworkRequestSettled.js
function isNetworkRequestSettled(networkStatus) {
  return networkStatus === 7 || networkStatus === 8;
}

// node_modules/@apollo/client/utilities/isNetworkRequestInFlight.js
function isNetworkRequestInFlight(networkStatus) {
  return !isNetworkRequestSettled(networkStatus);
}

// node_modules/@apollo/client/cache/core/cache.js
var ApolloCache = class {
  assumeImmutableResults = false;
  // Function used to lookup a fragment when a fragment definition is not part
  // of the GraphQL document. This is useful for caches, such as InMemoryCache,
  // that register fragments ahead of time so they can be referenced by name.
  lookupFragment(fragmentName) {
    return null;
  }
  // Transactional API
  /**
   * Executes multiple cache operations as a single batch, ensuring that
   * watchers are only notified once after all operations complete. This is
   * useful for improving performance when making multiple cache updates, as it
   * prevents unnecessary re-renders or query refetches between individual
   * operations.
   *
   * The `batch` method supports both optimistic and non-optimistic updates, and
   * provides fine-grained control over which cache layer receives the updates
   * and when watchers are notified.
   *
   * For usage instructions, see [Interacting with cached data: `cache.batch`](https://www.apollographql.com/docs/react/caching/cache-interaction#using-cachebatch).
   *
   * @example
   *
   * ```js
   * cache.batch({
   *   update(cache) {
   *     cache.writeQuery({
   *       query: GET_TODOS,
   *       data: { todos: updatedTodos },
   *     });
   *     cache.evict({ id: "Todo:123" });
   *   },
   * });
   * ```
   *
   * @example
   *
   * ```js
   * // Optimistic update with a custom layer ID
   * cache.batch({
   *   optimistic: "add-todo-optimistic",
   *   update(cache) {
   *     cache.modify({
   *       fields: {
   *         todos(existing = []) {
   *           return [...existing, newTodoRef];
   *         },
   *       },
   *     });
   *   },
   * });
   * ```
   *
   * @returns The return value of the `update` function.
   */
  batch(options) {
    const optimisticId = typeof options.optimistic === "string" ? options.optimistic : options.optimistic === false ? null : void 0;
    let updateResult;
    this.performTransaction(() => updateResult = options.update(this), optimisticId);
    return updateResult;
  }
  recordOptimisticTransaction(transaction, optimisticId) {
    this.performTransaction(transaction, optimisticId);
  }
  // Optional API
  // Called once per input document, allowing the cache to make static changes
  // to the query, such as adding __typename fields.
  transformDocument(document) {
    return document;
  }
  // Called before each ApolloLink request, allowing the cache to make dynamic
  // changes to the query, such as filling in missing fragment definitions.
  transformForLink(document) {
    return document;
  }
  identify(object) {
    return;
  }
  gc() {
    return [];
  }
  modify(options) {
    return false;
  }
  readQuery(options, optimistic = !!options.optimistic) {
    return this.read(__spreadProps(__spreadValues({}, options), {
      rootId: options.id || "ROOT_QUERY",
      optimistic
    }));
  }
  fragmentWatches = new Trie(true);
  /**
  * Watches the cache store of the fragment according to the options specified
  * and returns an `Observable`. We can subscribe to this
  * `Observable` and receive updated results through an
  * observer when the cache store changes.
  * 
  * You must pass in a GraphQL document with a single fragment or a document
  * with multiple fragments that represent what you are reading. If you pass
  * in a document with multiple fragments then you must also specify a
  * `fragmentName`.
  * 
  * @since 3.10.0
  * @param options - An object of type `WatchFragmentOptions` that allows
  * the cache to identify the fragment and optionally specify whether to react
  * to optimistic updates.
  */
  watchFragment(options) {
    const { fragment, fragmentName, from: from3 } = options;
    const query = this.getFragmentDoc(fragment, fragmentName);
    const fromArray = Array.isArray(from3) ? from3 : [from3];
    const ids = fromArray.map((value) => {
      const id = value == null ? value : this.toCacheId(value);
      if (__DEV__) {
        const actualFragmentName = fragmentName || getFragmentDefinition(fragment).name.value;
        if (id === void 0) {
          __DEV__ && invariant3.warn(113, actualFragmentName);
        }
      }
      return id;
    });
    if (!Array.isArray(from3)) {
      const observable2 = this.watchSingleFragment(ids[0], query, options);
      return from3 === null ? observable2 : mapObservableFragmentMemoized(observable2, /* @__PURE__ */ Symbol.for("apollo.transform.individualResult"), (result) => __spreadProps(__spreadValues({}, result), {
        data: result.data ?? {}
      }));
    }
    let currentResult;
    function toResult(results) {
      const result = results.reduce((memo, result2, idx) => {
        memo.data.push(result2.data);
        memo.complete &&= result2.complete;
        memo.dataState = memo.complete ? "complete" : "partial";
        if (result2.missing) {
          memo.missing ||= {};
          memo.missing[idx] = result2.missing;
        }
        return memo;
      }, {
        data: [],
        dataState: "complete",
        complete: true
      });
      if (!equal(currentResult, result)) {
        currentResult = result;
      }
      return currentResult;
    }
    if (ids.length === 0) {
      return emptyArrayObservable;
    }
    let subscribed = false;
    const observables = ids.map((id) => this.watchSingleFragment(id, query, options));
    const observable = combineLatestBatched(observables).pipe(map(toResult), tap({
      subscribe: () => subscribed = true,
      unsubscribe: () => subscribed = false
    }), shareReplay({ bufferSize: 1, refCount: true }));
    return Object.assign(observable, {
      getCurrentResult: () => {
        if (subscribed && currentResult) {
          return currentResult;
        }
        const results = observables.map((observable2) => observable2.getCurrentResult());
        return toResult(results);
      }
    });
  }
  /**
   * Can be overridden by subclasses to delay calling the provided callback
   * until after all broadcasts have been completed - e.g. in a cache scenario
   * where many watchers are notified in parallel.
   */
  onAfterBroadcast = (cb) => cb();
  watchSingleFragment(id, fragmentQuery, options) {
    if (id === null) {
      return nullObservable;
    }
    const { optimistic = true, variables } = options;
    const cacheKey = [
      fragmentQuery,
      canonicalStringify({ id, optimistic, variables })
    ];
    const cacheEntry = this.fragmentWatches.lookupArray(cacheKey);
    if (!cacheEntry.observable) {
      let getNewestResult2 = function(diff) {
        const data = diff.result;
        if (!currentResult || !equalByQuery(fragmentQuery, { data: currentResult.data }, { data }, options.variables)) {
          currentResult = {
            data,
            dataState: diff.complete ? "complete" : "partial",
            complete: diff.complete
          };
          if (diff.missing) {
            currentResult.missing = diff.missing.missing;
          }
        }
        return currentResult;
      };
      var getNewestResult = getNewestResult2;
      let subscribed = false;
      let currentResult;
      const observable = new Observable((observer) => {
        subscribed = true;
        const cleanup = this.watch({
          variables,
          returnPartialData: true,
          id,
          query: fragmentQuery,
          optimistic,
          immediate: true,
          callback: (diff) => {
            observable.dirty = true;
            this.onAfterBroadcast(() => {
              observer.next(getNewestResult2(diff));
              observable.dirty = false;
            });
          }
        });
        return () => {
          subscribed = false;
          cleanup();
          this.fragmentWatches.removeArray(cacheKey);
        };
      }).pipe(distinctUntilChanged(), share({
        connector: () => new ReplaySubject(1),
        // debounce so a synchronous unsubscribe+resubscribe doesn't tear down the watch and create a new one
        resetOnRefCountZero: () => timer(0)
      }));
      cacheEntry.observable = Object.assign(observable, {
        dirty: false,
        getCurrentResult: () => {
          if (subscribed && currentResult) {
            return currentResult;
          }
          return getNewestResult2(this.diff({
            id,
            query: fragmentQuery,
            returnPartialData: true,
            optimistic,
            variables
          }));
        }
      });
    }
    return cacheEntry.observable;
  }
  // Make sure we compute the same (===) fragment query document every
  // time we receive the same fragment in readFragment.
  getFragmentDoc = wrap(getFragmentQueryDocument, {
    max: cacheSizes["cache.fragmentQueryDocuments"] || 1e3,
    cache: WeakCache,
    makeCacheKey: bindCacheKey(this)
  });
  readFragment(options, optimistic = !!options.optimistic) {
    const id = options.from !== void 0 ? this.toCacheId(options.from) : options.id;
    return this.read(__spreadProps(__spreadValues({}, options), {
      query: this.getFragmentDoc(options.fragment, options.fragmentName),
      rootId: id,
      optimistic
    }));
  }
  writeQuery(_a) {
    var _b = _a, { id, data } = _b, options = __objRest(_b, ["id", "data"]);
    return this.write(Object.assign(options, {
      dataId: id || "ROOT_QUERY",
      result: data
    }));
  }
  writeFragment(_c) {
    var _d = _c, { data, fragment, fragmentName } = _d, options = __objRest(_d, ["data", "fragment", "fragmentName"]);
    const id = options.from !== void 0 ? this.toCacheId(options.from) : options.id;
    return this.write(Object.assign(options, {
      query: this.getFragmentDoc(fragment, fragmentName),
      dataId: id,
      result: data
    }));
  }
  updateQuery(options, update) {
    return this.batch({
      update(cache) {
        const value = cache.readQuery(options);
        const data = update(value);
        if (data === void 0 || data === null)
          return value;
        cache.writeQuery(__spreadProps(__spreadValues({}, options), { data }));
        return data;
      }
    });
  }
  updateFragment(options, update) {
    return this.batch({
      update(cache) {
        const value = cache.readFragment(options);
        const data = update(value);
        if (data === void 0 || data === null)
          return value;
        cache.writeFragment(__spreadProps(__spreadValues({}, options), { data }));
        return data;
      }
    });
  }
  toCacheId(from3) {
    return typeof from3 === "string" ? from3 : this.identify(from3);
  }
};
if (__DEV__) {
  ApolloCache.prototype.getMemoryInternals = getApolloCacheMemoryInternals;
}
var nullResult = Object.freeze({
  data: null,
  dataState: "complete",
  complete: true
});
var nullObservable = Object.assign(new Observable((observer) => {
  observer.next(nullResult);
}), { dirty: false, getCurrentResult: () => nullResult });
var emptyArrayResult = Object.freeze({
  data: [],
  dataState: "complete",
  complete: true
});
var emptyArrayObservable = Object.assign(new Observable((observer) => {
  observer.next(emptyArrayResult);
}), { getCurrentResult: () => emptyArrayResult });

// node_modules/@apollo/client/cache/inmemory/helpers.js
var { hasOwnProperty: hasOwn } = Object.prototype;
function defaultDataIdFromObject({ __typename, id, _id }, context) {
  if (typeof __typename === "string") {
    if (context) {
      context.keyObject = id != null ? { id } : _id != null ? { _id } : void 0;
    }
    if (id == null && _id != null) {
      id = _id;
    }
    if (id != null) {
      return `${__typename}:${typeof id === "number" || typeof id === "string" ? id : JSON.stringify(id)}`;
    }
  }
}
var defaultConfig = {
  dataIdFromObject: defaultDataIdFromObject,
  resultCaching: true
};
function normalizeConfig(config) {
  return compact(defaultConfig, config);
}
function getTypenameFromStoreObject(store, objectOrReference) {
  return isReference(objectOrReference) ? store.get(objectOrReference.__ref, "__typename") : objectOrReference && objectOrReference.__typename;
}
var TypeOrFieldNameRegExp = /^[_a-z][_0-9a-z]*/i;
function fieldNameFromStoreName(storeFieldName) {
  const match = storeFieldName.match(TypeOrFieldNameRegExp);
  return match ? match[0] : storeFieldName;
}
function selectionSetMatchesResult(selectionSet, result, variables) {
  if (isNonNullObject(result)) {
    return isArray(result) ? result.every((item) => selectionSetMatchesResult(selectionSet, item, variables)) : selectionSet.selections.every((field) => {
      if (isField(field) && shouldInclude(field, variables)) {
        const key = resultKeyNameFromField(field);
        return hasOwn.call(result, key) && (!field.selectionSet || selectionSetMatchesResult(field.selectionSet, result[key], variables));
      }
      return true;
    });
  }
  return false;
}
function storeValueIsStoreObject(value) {
  return isNonNullObject(value) && !isReference(value) && !isArray(value);
}
function makeProcessedFieldsMerger() {
  return new DeepMerger();
}
function extractFragmentContext(document, fragments) {
  const fragmentMap = createFragmentMap(getFragmentDefinitions(document));
  return {
    fragmentMap,
    lookupFragment(name) {
      let def = fragmentMap[name];
      if (!def && fragments) {
        def = fragments.lookup(name);
      }
      return def || null;
    }
  };
}

// node_modules/@apollo/client/cache/inmemory/entityStore.js
var DELETE = {};
var delModifier = () => DELETE;
var INVALIDATE = {};
var EntityStore = class {
  policies;
  group;
  data = {};
  constructor(policies, group) {
    this.policies = policies;
    this.group = group;
  }
  // Although the EntityStore class is abstract, it contains concrete
  // implementations of the various NormalizedCache interface methods that
  // are inherited by the Root and Layer subclasses.
  toObject() {
    return __spreadValues({}, this.data);
  }
  has(dataId) {
    return this.lookup(dataId, true) !== void 0;
  }
  get(dataId, fieldName) {
    this.group.depend(dataId, fieldName);
    if (hasOwn.call(this.data, dataId)) {
      const storeObject = this.data[dataId];
      if (storeObject && hasOwn.call(storeObject, fieldName)) {
        return storeObject[fieldName];
      }
    }
    if (fieldName === "__typename" && hasOwn.call(this.policies.rootTypenamesById, dataId)) {
      return this.policies.rootTypenamesById[dataId];
    }
    if (this instanceof Layer) {
      return this.parent.get(dataId, fieldName);
    }
  }
  lookup(dataId, dependOnExistence) {
    if (dependOnExistence)
      this.group.depend(dataId, "__exists");
    if (hasOwn.call(this.data, dataId)) {
      return this.data[dataId];
    }
    if (this instanceof Layer) {
      return this.parent.lookup(dataId, dependOnExistence);
    }
    if (this.policies.rootTypenamesById[dataId]) {
      return {};
    }
  }
  merge(older, newer) {
    let dataId;
    if (isReference(older))
      older = older.__ref;
    if (isReference(newer))
      newer = newer.__ref;
    const existing = typeof older === "string" ? this.lookup(dataId = older) : older;
    const incoming = typeof newer === "string" ? this.lookup(dataId = newer) : newer;
    if (!incoming)
      return;
    invariant3(typeof dataId === "string", 99);
    const merged = new DeepMerger({
      reconciler: storeObjectReconciler
    }).merge(existing, incoming);
    this.data[dataId] = merged;
    if (merged !== existing) {
      delete this.refs[dataId];
      if (this.group.caching) {
        const fieldsToDirty = {};
        if (!existing)
          fieldsToDirty.__exists = 1;
        Object.keys(incoming).forEach((storeFieldName) => {
          if (!existing || existing[storeFieldName] !== merged[storeFieldName]) {
            fieldsToDirty[storeFieldName] = 1;
            const fieldName = fieldNameFromStoreName(storeFieldName);
            if (fieldName !== storeFieldName && !this.policies.hasKeyArgs(merged.__typename, fieldName)) {
              fieldsToDirty[fieldName] = 1;
            }
            if (merged[storeFieldName] === void 0 && !(this instanceof Layer)) {
              delete merged[storeFieldName];
            }
          }
        });
        if (fieldsToDirty.__typename && !(existing && existing.__typename) && // Since we return default root __typename strings
        // automatically from store.get, we don't need to dirty the
        // ROOT_QUERY.__typename field if merged.__typename is equal
        // to the default string (usually "Query").
        this.policies.rootTypenamesById[dataId] === merged.__typename) {
          delete fieldsToDirty.__typename;
        }
        Object.keys(fieldsToDirty).forEach((fieldName) => this.group.dirty(dataId, fieldName));
      }
    }
  }
  modify(dataId, fields, exact) {
    const storeObject = this.lookup(dataId);
    if (storeObject) {
      const changedFields = {};
      let needToMerge = false;
      let allDeleted = true;
      const sharedDetails = {
        DELETE,
        INVALIDATE,
        isReference,
        toReference: this.toReference,
        canRead: this.canRead,
        readField: (fieldNameOrOptions, from3) => this.policies.readField(typeof fieldNameOrOptions === "string" ? {
          fieldName: fieldNameOrOptions,
          from: from3 || makeReference(dataId)
        } : fieldNameOrOptions, { store: this })
      };
      Object.keys(storeObject).forEach((storeFieldName) => {
        const fieldName = fieldNameFromStoreName(storeFieldName);
        let fieldValue = storeObject[storeFieldName];
        if (fieldValue === void 0)
          return;
        const modify = typeof fields === "function" ? fields : fields[storeFieldName] || (exact ? void 0 : fields[fieldName]);
        if (modify) {
          let newValue = modify === delModifier ? DELETE : modify(maybeDeepFreeze(fieldValue), __spreadProps(__spreadValues({}, sharedDetails), {
            fieldName,
            storeFieldName,
            storage: this.getStorage(dataId, storeFieldName)
          }));
          if (newValue === INVALIDATE) {
            this.group.dirty(dataId, storeFieldName);
          } else {
            if (newValue === DELETE)
              newValue = void 0;
            if (newValue !== fieldValue) {
              changedFields[storeFieldName] = newValue;
              needToMerge = true;
              fieldValue = newValue;
              if (__DEV__) {
                const checkReference = (ref) => {
                  if (this.lookup(ref.__ref) === void 0) {
                    __DEV__ && invariant3.warn(100, ref);
                    return true;
                  }
                };
                if (isReference(newValue)) {
                  checkReference(newValue);
                } else if (Array.isArray(newValue)) {
                  let seenReference = false;
                  let someNonReference;
                  for (const value of newValue) {
                    if (isReference(value)) {
                      seenReference = true;
                      if (checkReference(value))
                        break;
                    } else {
                      if (typeof value === "object" && !!value) {
                        const [id] = this.policies.identify(value);
                        if (id) {
                          someNonReference = value;
                        }
                      }
                    }
                    if (seenReference && someNonReference !== void 0) {
                      __DEV__ && invariant3.warn(101, someNonReference);
                      break;
                    }
                  }
                }
              }
            }
          }
        }
        if (fieldValue !== void 0) {
          allDeleted = false;
        }
      });
      if (needToMerge) {
        this.merge(dataId, changedFields);
        if (allDeleted) {
          if (this instanceof Layer) {
            this.data[dataId] = void 0;
          } else {
            delete this.data[dataId];
          }
          this.group.dirty(dataId, "__exists");
        }
        return true;
      }
    }
    return false;
  }
  // If called with only one argument, removes the entire entity
  // identified by dataId. If called with a fieldName as well, removes all
  // fields of that entity whose names match fieldName according to the
  // fieldNameFromStoreName helper function. If called with a fieldName
  // and variables, removes all fields of that entity whose names match fieldName
  // and whose arguments when cached exactly match the variables passed.
  delete(dataId, fieldName, args) {
    const storeObject = this.lookup(dataId);
    if (storeObject) {
      const typename = this.getFieldValue(storeObject, "__typename");
      const storeFieldName = fieldName && args ? this.policies.getStoreFieldName({ typename, fieldName, args }) : fieldName;
      return this.modify(dataId, storeFieldName ? {
        [storeFieldName]: delModifier
      } : delModifier, !!args);
    }
    return false;
  }
  evict(options, limit) {
    let evicted = false;
    if (options.id) {
      if (hasOwn.call(this.data, options.id)) {
        evicted = this.delete(options.id, options.fieldName, options.args);
      }
      if (this instanceof Layer && this !== limit) {
        evicted = this.parent.evict(options, limit) || evicted;
      }
      if (options.fieldName || evicted) {
        this.group.dirty(options.id, options.fieldName || "__exists");
      }
    }
    return evicted;
  }
  clear() {
    this.replace(null);
  }
  extract() {
    const obj = this.toObject();
    const extraRootIds = [];
    this.getRootIdSet().forEach((id) => {
      if (!hasOwn.call(this.policies.rootTypenamesById, id)) {
        extraRootIds.push(id);
      }
    });
    if (extraRootIds.length) {
      obj.__META = { extraRootIds: extraRootIds.sort() };
    }
    return obj;
  }
  replace(newData) {
    Object.keys(this.data).forEach((dataId) => {
      if (!(newData && hasOwn.call(newData, dataId))) {
        this.delete(dataId);
      }
    });
    if (newData) {
      const _a = newData, { __META } = _a, rest = __objRest(_a, ["__META"]);
      Object.keys(rest).forEach((dataId) => {
        this.merge(dataId, rest[dataId]);
      });
      if (__META) {
        __META.extraRootIds.forEach(this.retain, this);
      }
    }
  }
  // Maps root entity IDs to the number of times they have been retained, minus
  // the number of times they have been released. Retained entities keep other
  // entities they reference (even indirectly) from being garbage collected.
  rootIds = {};
  retain(rootId) {
    return this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1;
  }
  release(rootId) {
    if (this.rootIds[rootId] > 0) {
      const count = --this.rootIds[rootId];
      if (!count)
        delete this.rootIds[rootId];
      return count;
    }
    return 0;
  }
  // Return a Set<string> of all the ID strings that have been retained by
  // this layer/root *and* any layers/roots beneath it.
  getRootIdSet(ids = /* @__PURE__ */ new Set()) {
    Object.keys(this.rootIds).forEach(ids.add, ids);
    if (this instanceof Layer) {
      this.parent.getRootIdSet(ids);
    } else {
      Object.keys(this.policies.rootTypenamesById).forEach(ids.add, ids);
    }
    return ids;
  }
  // The goal of garbage collection is to remove IDs from the Root layer of the
  // store that are no longer reachable starting from any IDs that have been
  // explicitly retained (see retain and release, above). Returns an array of
  // dataId strings that were removed from the store.
  gc() {
    const ids = this.getRootIdSet();
    const snapshot = this.toObject();
    ids.forEach((id) => {
      if (hasOwn.call(snapshot, id)) {
        Object.keys(this.findChildRefIds(id)).forEach(ids.add, ids);
        delete snapshot[id];
      }
    });
    const idsToRemove = Object.keys(snapshot);
    if (idsToRemove.length) {
      let root = this;
      while (root instanceof Layer)
        root = root.parent;
      idsToRemove.forEach((id) => root.delete(id));
    }
    return idsToRemove;
  }
  // Lazily tracks { __ref: <dataId> } strings contained by this.data[dataId].
  refs = {};
  findChildRefIds(dataId) {
    if (!hasOwn.call(this.refs, dataId)) {
      const found = this.refs[dataId] = {};
      const root = this.data[dataId];
      if (!root)
        return found;
      const workSet = /* @__PURE__ */ new Set([root]);
      workSet.forEach((obj) => {
        if (isReference(obj)) {
          found[obj.__ref] = true;
        }
        if (isNonNullObject(obj)) {
          Object.keys(obj).forEach((key) => {
            const child = obj[key];
            if (isNonNullObject(child)) {
              workSet.add(child);
            }
          });
        }
      });
    }
    return this.refs[dataId];
  }
  makeCacheKey() {
    return this.group.keyMaker.lookupArray(arguments);
  }
  // Bound function that can be passed around to provide easy access to fields
  // of Reference objects as well as ordinary objects.
  getFieldValue = (objectOrReference, storeFieldName) => maybeDeepFreeze(isReference(objectOrReference) ? this.get(objectOrReference.__ref, storeFieldName) : objectOrReference && objectOrReference[storeFieldName]);
  // Returns true for non-normalized StoreObjects and non-dangling
  // References, indicating that readField(name, objOrRef) has a chance of
  // working. Useful for filtering out dangling references from lists.
  canRead = (objOrRef) => {
    return isReference(objOrRef) ? this.has(objOrRef.__ref) : typeof objOrRef === "object";
  };
  // Bound function that converts an id or an object with a __typename and
  // primary key fields to a Reference object. If called with a Reference object,
  // that same Reference object is returned. Pass true for mergeIntoStore to persist
  // an object into the store.
  toReference = (objOrIdOrRef, mergeIntoStore) => {
    if (typeof objOrIdOrRef === "string") {
      return makeReference(objOrIdOrRef);
    }
    if (isReference(objOrIdOrRef)) {
      return objOrIdOrRef;
    }
    const [id] = this.policies.identify(objOrIdOrRef);
    if (id) {
      const ref = makeReference(id);
      if (mergeIntoStore) {
        this.merge(id, objOrIdOrRef);
      }
      return ref;
    }
  };
  get supportsResultCaching() {
    return this.group.caching;
  }
};
var CacheGroup = class {
  caching;
  parent;
  d = null;
  // Used by the EntityStore#makeCacheKey method to compute cache keys
  // specific to this CacheGroup.
  keyMaker;
  constructor(caching, parent = null) {
    this.caching = caching;
    this.parent = parent;
    this.resetCaching();
  }
  resetCaching() {
    this.d = this.caching ? dep() : null;
    this.keyMaker = new Trie();
  }
  depend(dataId, storeFieldName) {
    if (this.d) {
      this.d(makeDepKey(dataId, storeFieldName));
      const fieldName = fieldNameFromStoreName(storeFieldName);
      if (fieldName !== storeFieldName) {
        this.d(makeDepKey(dataId, fieldName));
      }
      if (this.parent) {
        this.parent.depend(dataId, storeFieldName);
      }
    }
  }
  dirty(dataId, storeFieldName) {
    if (this.d) {
      this.d.dirty(
        makeDepKey(dataId, storeFieldName),
        // When storeFieldName === "__exists", that means the entity identified
        // by dataId has either disappeared from the cache or was newly added,
        // so the result caching system would do well to "forget everything it
        // knows" about that object. To achieve that kind of invalidation, we
        // not only dirty the associated result cache entry, but also remove it
        // completely from the dependency graph. For the optimism implementation
        // details, see https://github.com/benjamn/optimism/pull/195.
        storeFieldName === "__exists" ? "forget" : "setDirty"
      );
    }
  }
};
function makeDepKey(dataId, storeFieldName) {
  return storeFieldName + "#" + dataId;
}
function maybeDependOnExistenceOfEntity(store, entityId) {
  if (supportsResultCaching(store)) {
    store.group.depend(entityId, "__exists");
  }
}
var Root = class extends EntityStore {
  constructor({ policies, resultCaching = true, seed }) {
    super(policies, new CacheGroup(resultCaching));
    if (seed)
      this.replace(seed);
  }
  stump = new Stump(this);
  addLayer(layerId, replay) {
    return this.stump.addLayer(layerId, replay);
  }
  removeLayer() {
    return this;
  }
  storageTrie = new Trie();
  getStorage() {
    return this.storageTrie.lookupArray(arguments);
  }
};
EntityStore.Root = Root;
var Layer = class _Layer extends EntityStore {
  id;
  parent;
  replay;
  group;
  constructor(id, parent, replay, group) {
    super(parent.policies, group);
    this.id = id;
    this.parent = parent;
    this.replay = replay;
    this.group = group;
    replay(this);
  }
  addLayer(layerId, replay) {
    return new _Layer(layerId, this, replay, this.group);
  }
  removeLayer(layerId) {
    const parent = this.parent.removeLayer(layerId);
    if (layerId === this.id) {
      if (this.group.caching) {
        Object.keys(this.data).forEach((dataId) => {
          const ownStoreObject = this.data[dataId];
          const parentStoreObject = parent["lookup"](dataId);
          if (!parentStoreObject) {
            this.delete(dataId);
          } else if (!ownStoreObject) {
            this.group.dirty(dataId, "__exists");
            Object.keys(parentStoreObject).forEach((storeFieldName) => {
              this.group.dirty(dataId, storeFieldName);
            });
          } else if (ownStoreObject !== parentStoreObject) {
            Object.keys(ownStoreObject).forEach((storeFieldName) => {
              if (!equal(ownStoreObject[storeFieldName], parentStoreObject[storeFieldName])) {
                this.group.dirty(dataId, storeFieldName);
              }
            });
          }
        });
      }
      return parent;
    }
    if (parent === this.parent)
      return this;
    return parent.addLayer(this.id, this.replay);
  }
  toObject() {
    return __spreadValues(__spreadValues({}, this.parent.toObject()), this.data);
  }
  findChildRefIds(dataId) {
    const fromParent = this.parent.findChildRefIds(dataId);
    return hasOwn.call(this.data, dataId) ? __spreadValues(__spreadValues({}, fromParent), super.findChildRefIds(dataId)) : fromParent;
  }
  getStorage(...args) {
    let p = this.parent;
    while (p.parent)
      p = p.parent;
    return p.getStorage(...args);
  }
};
var Stump = class extends Layer {
  constructor(root) {
    super("EntityStore.Stump", root, () => {
    }, new CacheGroup(root.group.caching, root.group));
  }
  removeLayer() {
    return this;
  }
  merge(older, newer) {
    return this.parent.merge(older, newer);
  }
};
function storeObjectReconciler(existingObject, incomingObject, property) {
  const existingValue = existingObject[property];
  const incomingValue = incomingObject[property];
  return equal(existingValue, incomingValue) ? existingValue : incomingValue;
}
function supportsResultCaching(store) {
  return !!(store && store.supportsResultCaching);
}

// node_modules/@apollo/client/masking/utils.js
var disableWarningsSlot = new Slot();
function getFragmentMaskMode(fragment) {
  const directive = fragment.directives?.find(({ name }) => name.value === "unmask");
  if (!directive) {
    return "mask";
  }
  const modeArg = directive.arguments?.find(({ name }) => name.value === "mode");
  if (__DEV__) {
    if (modeArg) {
      if (modeArg.value.kind === Kind.VARIABLE) {
        __DEV__ && invariant3.warn(44);
      } else if (modeArg.value.kind !== Kind.STRING) {
        __DEV__ && invariant3.warn(45);
      } else if (modeArg.value.value !== "migrate") {
        __DEV__ && invariant3.warn(46, modeArg.value.value);
      }
    }
  }
  if (modeArg && "value" in modeArg.value && modeArg.value.value === "migrate") {
    return "migrate";
  }
  return "unmask";
}

// node_modules/@apollo/client/masking/maskDefinition.js
function maskDefinition(data, selectionSet, context) {
  return disableWarningsSlot.withValue(true, () => {
    const masked = maskSelectionSet(data, selectionSet, context, false);
    if (Object.isFrozen(data)) {
      maybeDeepFreeze(masked);
    }
    return masked;
  });
}
function getMutableTarget(data, mutableTargets) {
  if (mutableTargets.has(data)) {
    return mutableTargets.get(data);
  }
  const mutableTarget = Array.isArray(data) ? [] : {};
  mutableTargets.set(data, mutableTarget);
  return mutableTarget;
}
function maskSelectionSet(data, selectionSet, context, migration, path) {
  const { knownChanged } = context;
  const memo = getMutableTarget(data, context.mutableTargets);
  if (Array.isArray(data)) {
    for (const [index, item] of Array.from(data.entries())) {
      if (item === null) {
        memo[index] = null;
        continue;
      }
      const masked = maskSelectionSet(item, selectionSet, context, migration, __DEV__ ? `${path || ""}[${index}]` : void 0);
      if (knownChanged.has(masked)) {
        knownChanged.add(memo);
      }
      memo[index] = masked;
    }
    return knownChanged.has(memo) ? memo : data;
  }
  for (const selection of selectionSet.selections) {
    let value;
    if (migration) {
      knownChanged.add(memo);
    }
    if (selection.kind === Kind.FIELD) {
      const keyName = resultKeyNameFromField(selection);
      const childSelectionSet = selection.selectionSet;
      value = memo[keyName] || data[keyName];
      if (value === void 0) {
        continue;
      }
      if (childSelectionSet && value !== null) {
        const masked = maskSelectionSet(data[keyName], childSelectionSet, context, migration, __DEV__ ? `${path || ""}.${keyName}` : void 0);
        if (knownChanged.has(masked)) {
          value = masked;
        }
      }
      if (!__DEV__) {
        memo[keyName] = value;
      }
      if (__DEV__) {
        if (migration && keyName !== "__typename" && // either the field is not present in the memo object
        // or it has a `get` descriptor, not a `value` descriptor
        // => it is a warning accessor and we can overwrite it
        // with another accessor
        !Object.getOwnPropertyDescriptor(memo, keyName)?.value) {
          Object.defineProperty(memo, keyName, getAccessorWarningDescriptor(keyName, value, path || "", context.operationName, context.operationType));
        } else {
          delete memo[keyName];
          memo[keyName] = value;
        }
      }
    }
    if (selection.kind === Kind.INLINE_FRAGMENT && (!selection.typeCondition || context.cache.fragmentMatches(selection, data.__typename))) {
      value = maskSelectionSet(data, selection.selectionSet, context, migration, path);
    }
    if (selection.kind === Kind.FRAGMENT_SPREAD) {
      const fragmentName = selection.name.value;
      const fragment = context.fragmentMap[fragmentName] || (context.fragmentMap[fragmentName] = context.cache.lookupFragment(fragmentName));
      invariant3(fragment, 39, fragmentName);
      const mode = getFragmentMaskMode(selection);
      if (mode !== "mask") {
        value = maskSelectionSet(data, fragment.selectionSet, context, mode === "migrate", path);
      }
    }
    if (knownChanged.has(value)) {
      knownChanged.add(memo);
    }
  }
  if ("__typename" in data && !("__typename" in memo)) {
    memo.__typename = data.__typename;
  }
  if (Object.keys(memo).length !== Object.keys(data).length) {
    knownChanged.add(memo);
  }
  return knownChanged.has(memo) ? memo : data;
}
function getAccessorWarningDescriptor(fieldName, value, path, operationName, operationType) {
  let getValue = () => {
    if (disableWarningsSlot.getValue()) {
      return value;
    }
    __DEV__ && invariant3.warn(40, operationName ? `${operationType} '${operationName}'` : `anonymous ${operationType}`, `${path}.${fieldName}`.replace(/^\./, ""));
    getValue = () => value;
    return value;
  };
  return {
    get() {
      return getValue();
    },
    set(newValue) {
      getValue = () => newValue;
    },
    enumerable: true,
    configurable: true
  };
}

// node_modules/@apollo/client/masking/maskFragment.js
function maskFragment(data, document, cache, fragmentName) {
  const fragments = document.definitions.filter((node) => node.kind === Kind.FRAGMENT_DEFINITION);
  if (typeof fragmentName === "undefined") {
    invariant3(fragments.length === 1, 41, fragments.length);
    fragmentName = fragments[0].name.value;
  }
  const fragment = fragments.find((fragment2) => fragment2.name.value === fragmentName);
  invariant3(!!fragment, 42, fragmentName);
  if (data == null) {
    return data;
  }
  if (equal(data, {})) {
    return data;
  }
  return maskDefinition(data, fragment.selectionSet, {
    operationType: "fragment",
    operationName: fragment.name.value,
    fragmentMap: createFragmentMap(getFragmentDefinitions(document)),
    cache,
    mutableTargets: /* @__PURE__ */ new WeakMap(),
    knownChanged: /* @__PURE__ */ new WeakSet()
  });
}

// node_modules/@apollo/client/masking/maskOperation.js
function maskOperation(data, document, cache) {
  const definition = getOperationDefinition(document);
  invariant3(definition, 43);
  if (data == null) {
    return data;
  }
  return maskDefinition(data, definition.selectionSet, {
    operationType: definition.operation,
    operationName: definition.name?.value,
    fragmentMap: createFragmentMap(getFragmentDefinitions(document)),
    cache,
    mutableTargets: /* @__PURE__ */ new WeakMap(),
    knownChanged: /* @__PURE__ */ new WeakSet()
  });
}

// node_modules/@apollo/client/cache/inmemory/key-extractor.js
var specifierInfoCache = {};
function lookupSpecifierInfo(spec) {
  const cacheKey = JSON.stringify(spec);
  return specifierInfoCache[cacheKey] || (specifierInfoCache[cacheKey] = {});
}
function keyFieldsFnFromSpecifier(specifier) {
  const info = lookupSpecifierInfo(specifier);
  return info.keyFieldsFn || (info.keyFieldsFn = (object, context) => {
    const extract = (from3, key) => context.readField(key, from3);
    const keyObject = context.keyObject = collectSpecifierPaths(specifier, (schemaKeyPath) => {
      let extracted = extractKeyPath(
        context.storeObject,
        schemaKeyPath,
        // Using context.readField to extract paths from context.storeObject
        // allows the extraction to see through Reference objects and respect
        // custom read functions.
        extract
      );
      if (extracted === void 0 && object !== context.storeObject && hasOwn.call(object, schemaKeyPath[0])) {
        extracted = extractKeyPath(object, schemaKeyPath, extractKey);
      }
      invariant3(extracted !== void 0, 102, schemaKeyPath.join("."), object);
      return extracted;
    });
    return `${context.typename}:${JSON.stringify(keyObject)}`;
  });
}
function keyArgsFnFromSpecifier(specifier) {
  const info = lookupSpecifierInfo(specifier);
  return info.keyArgsFn || (info.keyArgsFn = (args, { field, variables, fieldName }) => {
    const collected = collectSpecifierPaths(specifier, (keyPath) => {
      const firstKey = keyPath[0];
      const firstChar = firstKey.charAt(0);
      if (firstChar === "@") {
        if (field && isNonEmptyArray(field.directives)) {
          const directiveName = firstKey.slice(1);
          const d = field.directives.find((d2) => d2.name.value === directiveName);
          const directiveArgs = d && argumentsObjectFromField(d, variables);
          return directiveArgs && extractKeyPath(
            directiveArgs,
            // If keyPath.length === 1, this code calls extractKeyPath with an
            // empty path, which works because it uses directiveArgs as the
            // extracted value.
            keyPath.slice(1)
          );
        }
        return;
      }
      if (firstChar === "$") {
        const variableName = firstKey.slice(1);
        if (variables && hasOwn.call(variables, variableName)) {
          const varKeyPath = keyPath.slice(0);
          varKeyPath[0] = variableName;
          return extractKeyPath(variables, varKeyPath);
        }
        return;
      }
      if (args) {
        return extractKeyPath(args, keyPath);
      }
    });
    const suffix = JSON.stringify(collected);
    if (args || suffix !== "{}") {
      fieldName += ":" + suffix;
    }
    return fieldName;
  });
}
function collectSpecifierPaths(specifier, extractor) {
  const merger = new DeepMerger();
  return getSpecifierPaths(specifier).reduce((collected, path) => {
    let toMerge = extractor(path);
    if (toMerge !== void 0) {
      for (let i = path.length - 1; i >= 0; --i) {
        toMerge = { [path[i]]: toMerge };
      }
      collected = merger.merge(collected, toMerge);
    }
    return collected;
  }, {});
}
function getSpecifierPaths(spec) {
  const info = lookupSpecifierInfo(spec);
  if (!info.paths) {
    const paths = info.paths = [];
    const currentPath = [];
    spec.forEach((s, i) => {
      if (isArray(s)) {
        getSpecifierPaths(s).forEach((p) => paths.push(currentPath.concat(p)));
        currentPath.length = 0;
      } else {
        currentPath.push(s);
        if (!isArray(spec[i + 1])) {
          paths.push(currentPath.slice(0));
          currentPath.length = 0;
        }
      }
    });
  }
  return info.paths;
}
function extractKey(object, key) {
  return object[key];
}
function extractKeyPath(object, path, extract) {
  extract = extract || extractKey;
  return normalize(path.reduce(function reducer(obj, key) {
    return isArray(obj) ? obj.map((child) => reducer(child, key)) : obj && extract(obj, key);
  }, object));
}
function normalize(value) {
  if (isNonNullObject(value)) {
    if (isArray(value)) {
      return value.map(normalize);
    }
    return collectSpecifierPaths(Object.keys(value).sort(), (path) => extractKeyPath(value, path));
  }
  return value;
}

// node_modules/@apollo/client/cache/inmemory/reactiveVars.js
var cacheSlot = new Slot();
var cacheInfoMap = /* @__PURE__ */ new WeakMap();
function getCacheInfo(cache) {
  let info = cacheInfoMap.get(cache);
  if (!info) {
    cacheInfoMap.set(cache, info = {
      vars: /* @__PURE__ */ new Set(),
      dep: dep()
    });
  }
  return info;
}
function forgetCache(cache) {
  getCacheInfo(cache).vars.forEach((rv) => rv.forgetCache(cache));
}
function recallCache(cache) {
  getCacheInfo(cache).vars.forEach((rv) => rv.attachCache(cache));
}
function makeVar(value) {
  const caches2 = /* @__PURE__ */ new Set();
  const listeners = /* @__PURE__ */ new Set();
  const rv = function(newValue) {
    if (arguments.length > 0) {
      if (value !== newValue) {
        value = newValue;
        caches2.forEach((cache) => {
          getCacheInfo(cache).dep.dirty(rv);
          broadcast(cache);
        });
        const oldListeners = Array.from(listeners);
        listeners.clear();
        oldListeners.forEach((listener) => listener(value));
      }
    } else {
      const cache = cacheSlot.getValue();
      if (cache) {
        attach(cache);
        getCacheInfo(cache).dep(rv);
      }
    }
    return value;
  };
  rv.onNextChange = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };
  const attach = rv.attachCache = (cache) => {
    caches2.add(cache);
    getCacheInfo(cache).vars.add(rv);
    return rv;
  };
  rv.forgetCache = (cache) => caches2.delete(cache);
  return rv;
}
function broadcast(cache) {
  if (cache.broadcastWatches) {
    cache.broadcastWatches();
  }
}

// node_modules/@apollo/client/cache/inmemory/policies.js
function argsFromFieldSpecifier(spec) {
  return spec.args !== void 0 ? spec.args : spec.field ? argumentsObjectFromField(spec.field, spec.variables) : null;
}
var nullKeyFieldsFn = () => void 0;
var simpleKeyArgsFn = (_args, context) => context.fieldName;
var mergeTrueFn = (existing, incoming, { mergeObjects }) => mergeObjects(existing, incoming);
var mergeFalseFn = (_, incoming) => incoming;
var defaultStreamFieldMergeFn = (existing, incoming, { streamFieldInfo, existingData }) => {
  if (!existing && !existingData) {
    return incoming;
  }
  const results = [];
  const previous = existing ?? existingData;
  const length = streamFieldInfo?.isLastChunk ? incoming.length : Math.max(previous.length, incoming.length);
  for (let i = 0; i < length; i++) {
    results[i] = incoming[i] === void 0 ? previous[i] : incoming[i];
  }
  return results;
};
var Policies = class {
  config;
  typePolicies = {};
  toBeAdded = {};
  // Map from subtype names to sets of supertype names. Note that this
  // representation inverts the structure of possibleTypes (whose keys are
  // supertypes and whose values are arrays of subtypes) because it tends
  // to be much more efficient to search upwards than downwards.
  supertypeMap = /* @__PURE__ */ new Map();
  // Any fuzzy subtypes specified by possibleTypes will be converted to
  // RegExp objects and recorded here. Every key of this map can also be
  // found in supertypeMap. In many cases this Map will be empty, which
  // means no fuzzy subtype checking will happen in fragmentMatches.
  fuzzySubtypes = /* @__PURE__ */ new Map();
  cache;
  rootIdsByTypename = {};
  rootTypenamesById = {};
  usingPossibleTypes = false;
  constructor(config) {
    this.config = config;
    this.config = __spreadValues({
      dataIdFromObject: defaultDataIdFromObject
    }, config);
    this.cache = this.config.cache;
    this.setRootTypename("Query");
    this.setRootTypename("Mutation");
    this.setRootTypename("Subscription");
    if (config.possibleTypes) {
      this.addPossibleTypes(config.possibleTypes);
    }
    if (config.typePolicies) {
      this.addTypePolicies(config.typePolicies);
    }
  }
  identify(object, partialContext) {
    const policies = this;
    const typename = partialContext && (partialContext.typename || partialContext.storeObject?.__typename) || object.__typename;
    if (typename === this.rootTypenamesById.ROOT_QUERY) {
      return ["ROOT_QUERY"];
    }
    const storeObject = partialContext && partialContext.storeObject || object;
    const context = __spreadProps(__spreadValues({}, partialContext), {
      typename,
      storeObject,
      readField: partialContext && partialContext.readField || ((...args) => {
        const options = normalizeReadFieldOptions(args, storeObject);
        return policies.readField(options, {
          store: policies.cache["data"],
          variables: options.variables
        });
      })
    });
    let id;
    const policy = typename && this.getTypePolicy(typename);
    let keyFn = policy && policy.keyFn || this.config.dataIdFromObject;
    disableWarningsSlot.withValue(true, () => {
      while (keyFn) {
        const specifierOrId = keyFn(__spreadValues(__spreadValues({}, object), storeObject), context);
        if (isArray(specifierOrId)) {
          keyFn = keyFieldsFnFromSpecifier(specifierOrId);
        } else {
          id = specifierOrId;
          break;
        }
      }
    });
    id = id ? String(id) : void 0;
    return context.keyObject ? [id, context.keyObject] : [id];
  }
  addTypePolicies(typePolicies) {
    Object.keys(typePolicies).forEach((typename) => {
      const _a = typePolicies[typename], { queryType, mutationType, subscriptionType } = _a, incoming = __objRest(_a, ["queryType", "mutationType", "subscriptionType"]);
      if (queryType)
        this.setRootTypename("Query", typename);
      if (mutationType)
        this.setRootTypename("Mutation", typename);
      if (subscriptionType)
        this.setRootTypename("Subscription", typename);
      if (hasOwn.call(this.toBeAdded, typename)) {
        this.toBeAdded[typename].push(incoming);
      } else {
        this.toBeAdded[typename] = [incoming];
      }
    });
  }
  updateTypePolicy(typename, incoming, existingFieldPolicies) {
    const existing = this.getTypePolicy(typename);
    const { keyFields, fields } = incoming;
    function setMerge(existing2, merge) {
      existing2.merge = typeof merge === "function" ? merge : merge === true ? mergeTrueFn : merge === false ? mergeFalseFn : existing2.merge;
    }
    setMerge(existing, incoming.merge);
    existing.keyFn = // Pass false to disable normalization for this typename.
    keyFields === false ? nullKeyFieldsFn : isArray(keyFields) ? keyFieldsFnFromSpecifier(keyFields) : typeof keyFields === "function" ? keyFields : existing.keyFn;
    if (fields) {
      Object.keys(fields).forEach((fieldName) => {
        let existing2 = existingFieldPolicies[fieldName];
        if (!existing2 || existing2?.typename !== typename) {
          existing2 = existingFieldPolicies[fieldName] = { typename };
        }
        const incoming2 = fields[fieldName];
        if (typeof incoming2 === "function") {
          existing2.read = incoming2;
        } else {
          const { keyArgs, read, merge } = incoming2;
          existing2.keyFn = // Pass false to disable argument-based differentiation of
          // field identities.
          keyArgs === false ? simpleKeyArgsFn : isArray(keyArgs) ? keyArgsFnFromSpecifier(keyArgs) : typeof keyArgs === "function" ? keyArgs : existing2.keyFn;
          if (typeof read === "function") {
            existing2.read = read;
          }
          setMerge(existing2, merge);
        }
        if (existing2.read && existing2.merge) {
          existing2.keyFn = existing2.keyFn || simpleKeyArgsFn;
        }
      });
    }
  }
  setRootTypename(which, typename = which) {
    const rootId = "ROOT_" + which.toUpperCase();
    const old = this.rootTypenamesById[rootId];
    if (typename !== old) {
      invariant3(!old || old === which, 103, which);
      if (old)
        delete this.rootIdsByTypename[old];
      this.rootIdsByTypename[typename] = rootId;
      this.rootTypenamesById[rootId] = typename;
    }
  }
  addPossibleTypes(possibleTypes) {
    this.usingPossibleTypes = true;
    Object.keys(possibleTypes).forEach((supertype) => {
      this.getSupertypeSet(supertype, true);
      possibleTypes[supertype].forEach((subtype) => {
        this.getSupertypeSet(subtype, true).add(supertype);
        const match = subtype.match(TypeOrFieldNameRegExp);
        if (!match || match[0] !== subtype) {
          this.fuzzySubtypes.set(subtype, new RegExp(subtype));
        }
      });
    });
  }
  getTypePolicy(typename) {
    if (!hasOwn.call(this.typePolicies, typename)) {
      const policy = this.typePolicies[typename] = {};
      policy.fields = {};
      let supertypes = this.supertypeMap.get(typename);
      if (!supertypes && this.fuzzySubtypes.size) {
        supertypes = this.getSupertypeSet(typename, true);
        this.fuzzySubtypes.forEach((regExp, fuzzy) => {
          if (regExp.test(typename)) {
            const fuzzySupertypes = this.supertypeMap.get(fuzzy);
            if (fuzzySupertypes) {
              fuzzySupertypes.forEach((supertype) => supertypes.add(supertype));
            }
          }
        });
      }
      if (supertypes && supertypes.size) {
        supertypes.forEach((supertype) => {
          const _a = this.getTypePolicy(supertype), { fields } = _a, rest = __objRest(_a, ["fields"]);
          Object.assign(policy, rest);
          Object.assign(policy.fields, fields);
        });
      }
    }
    const inbox = this.toBeAdded[typename];
    if (inbox && inbox.length) {
      inbox.splice(0).forEach((policy) => {
        this.updateTypePolicy(typename, policy, this.typePolicies[typename].fields);
      });
    }
    return this.typePolicies[typename];
  }
  getFieldPolicy(typename, fieldName) {
    if (typename) {
      return this.getTypePolicy(typename).fields[fieldName];
    }
  }
  getSupertypeSet(subtype, createIfMissing) {
    let supertypeSet = this.supertypeMap.get(subtype);
    if (!supertypeSet && createIfMissing) {
      this.supertypeMap.set(subtype, supertypeSet = /* @__PURE__ */ new Set());
    }
    return supertypeSet;
  }
  fragmentMatches(fragment, typename, result, variables) {
    if (!fragment.typeCondition)
      return true;
    if (!typename)
      return false;
    const supertype = fragment.typeCondition.name.value;
    if (typename === supertype)
      return true;
    if (this.usingPossibleTypes && this.supertypeMap.has(supertype)) {
      const typenameSupertypeSet = this.getSupertypeSet(typename, true);
      const workQueue = [typenameSupertypeSet];
      const maybeEnqueue = (subtype) => {
        const supertypeSet = this.getSupertypeSet(subtype, false);
        if (supertypeSet && supertypeSet.size && workQueue.indexOf(supertypeSet) < 0) {
          workQueue.push(supertypeSet);
        }
      };
      let needToCheckFuzzySubtypes = !!(result && this.fuzzySubtypes.size);
      let checkingFuzzySubtypes = false;
      for (let i = 0; i < workQueue.length; ++i) {
        const supertypeSet = workQueue[i];
        if (supertypeSet.has(supertype)) {
          if (!typenameSupertypeSet.has(supertype)) {
            if (checkingFuzzySubtypes) {
              __DEV__ && invariant3.warn(104, typename, supertype);
            }
            typenameSupertypeSet.add(supertype);
          }
          return true;
        }
        supertypeSet.forEach(maybeEnqueue);
        if (needToCheckFuzzySubtypes && // Start checking fuzzy subtypes only after exhausting all
        // non-fuzzy subtypes (after the final iteration of the loop).
        i === workQueue.length - 1 && // We could wait to compare fragment.selectionSet to result
        // after we verify the supertype, but this check is often less
        // expensive than that search, and we will have to do the
        // comparison anyway whenever we find a potential match.
        selectionSetMatchesResult(fragment.selectionSet, result, variables)) {
          needToCheckFuzzySubtypes = false;
          checkingFuzzySubtypes = true;
          this.fuzzySubtypes.forEach((regExp, fuzzyString) => {
            const match = typename.match(regExp);
            if (match && match[0] === typename) {
              maybeEnqueue(fuzzyString);
            }
          });
        }
      }
    }
    return false;
  }
  hasKeyArgs(typename, fieldName) {
    const policy = this.getFieldPolicy(typename, fieldName);
    return !!(policy && policy.keyFn);
  }
  getStoreFieldName(fieldSpec) {
    const { typename, fieldName } = fieldSpec;
    const policy = this.getFieldPolicy(typename, fieldName);
    let storeFieldName;
    let keyFn = policy && policy.keyFn;
    if (keyFn && typename) {
      const context = {
        typename,
        fieldName,
        field: fieldSpec.field || null,
        variables: fieldSpec.variables
      };
      const args = argsFromFieldSpecifier(fieldSpec);
      while (keyFn) {
        const specifierOrString = keyFn(args, context);
        if (isArray(specifierOrString)) {
          keyFn = keyArgsFnFromSpecifier(specifierOrString);
        } else {
          storeFieldName = specifierOrString || fieldName;
          break;
        }
      }
    }
    if (storeFieldName === void 0) {
      storeFieldName = fieldSpec.field ? storeKeyNameFromField(fieldSpec.field, fieldSpec.variables) : getStoreKeyName(fieldName, argsFromFieldSpecifier(fieldSpec));
    }
    if (storeFieldName === false) {
      return fieldName;
    }
    return fieldName === fieldNameFromStoreName(storeFieldName) ? storeFieldName : fieldName + ":" + storeFieldName;
  }
  readField(options, context) {
    const objectOrReference = options.from;
    if (!objectOrReference)
      return;
    const nameOrField = options.field || options.fieldName;
    if (!nameOrField)
      return;
    if (options.typename === void 0) {
      const typename = context.store.getFieldValue(objectOrReference, "__typename");
      if (typename)
        options.typename = typename;
    }
    const storeFieldName = this.getStoreFieldName(options);
    const fieldName = fieldNameFromStoreName(storeFieldName);
    const existing = context.store.getFieldValue(objectOrReference, storeFieldName);
    const policy = this.getFieldPolicy(options.typename, fieldName);
    const read = policy && policy.read;
    if (read) {
      const readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context, context.store.getStorage(isReference(objectOrReference) ? objectOrReference.__ref : objectOrReference, storeFieldName));
      return cacheSlot.withValue(this.cache, read, [
        existing,
        readOptions
      ]);
    }
    return existing;
  }
  getReadFunction(typename, fieldName) {
    const policy = this.getFieldPolicy(typename, fieldName);
    return policy && policy.read;
  }
  getMergeFunction(parentTypename, fieldName, childTypename) {
    let policy = this.getFieldPolicy(parentTypename, fieldName);
    let merge = policy && policy.merge;
    if (!merge && childTypename) {
      policy = this.getTypePolicy(childTypename);
      merge = policy && policy.merge;
    }
    return merge;
  }
  runMergeFunction(existing, incoming, { field, typename, merge, path }, context, storage) {
    const existingData = existing;
    if (merge === mergeTrueFn) {
      return makeMergeObjectsFunction(context.store)(existing, incoming);
    }
    if (merge === mergeFalseFn) {
      return incoming;
    }
    if (context.overwrite) {
      existing = void 0;
    }
    const streamInfo = context.extensions?.[streamInfoSymbol]?.deref()?.peekArray(path);
    if (streamInfo) {
      const { current, previous } = streamInfo;
      if (previous && equal(previous.incoming, incoming) && equal(previous.streamFieldInfo, current)) {
        return previous.result;
      }
    }
    const result = merge(existing, incoming, makeMergeFieldFunctionOptions(
      this,
      // Unlike options.readField for read functions, we do not fall
      // back to the current object if no foreignObjOrRef is provided,
      // because it's not clear what the current object should be for
      // merge functions: the (possibly undefined) existing object, or
      // the incoming object? If you think your merge function needs
      // to read sibling fields in order to produce a new value for
      // the current field, you might want to rethink your strategy,
      // because that's a recipe for making merge behavior sensitive
      // to the order in which fields are written into the cache.
      // However, readField(name, ref) is useful for merge functions
      // that need to deduplicate child objects and references.
      void 0,
      {
        typename,
        fieldName: field.name.value,
        field,
        variables: context.variables,
        path
      },
      context,
      storage || {},
      existingData
    ));
    if (streamInfo) {
      streamInfo.previous = {
        incoming,
        streamFieldInfo: streamInfo.current,
        result
      };
    }
    return result;
  }
};
function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage) {
  const storeFieldName = policies.getStoreFieldName(fieldSpec);
  const fieldName = fieldNameFromStoreName(storeFieldName);
  const variables = fieldSpec.variables || context.variables;
  const { toReference, canRead } = context.store;
  return {
    args: argsFromFieldSpecifier(fieldSpec),
    field: fieldSpec.field || null,
    fieldName,
    storeFieldName,
    variables,
    isReference,
    toReference,
    storage,
    cache: policies.cache,
    canRead,
    readField(...args) {
      return policies.readField(normalizeReadFieldOptions(args, objectOrReference, variables), context);
    },
    mergeObjects: makeMergeObjectsFunction(context.store)
  };
}
function makeMergeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage, existingData) {
  var _a;
  const options = __spreadProps(__spreadValues({}, makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage)), {
    extensions: context.extensions,
    existingData
  });
  const extensions = context.extensions;
  if (extensions && streamInfoSymbol in extensions) {
    const _b = extensions, { [_a = streamInfoSymbol]: streamInfo } = _b, otherExtensions = __objRest(_b, [__restKey(_a)]);
    const streamFieldInfo = streamInfo?.deref()?.peekArray(fieldSpec.path);
    if (streamFieldInfo) {
      options.streamFieldInfo = streamFieldInfo.current;
    }
    options.extensions = Object.keys(otherExtensions).length === 0 ? void 0 : otherExtensions;
  }
  return options;
}
function normalizeReadFieldOptions(readFieldArgs, objectOrReference, variables) {
  const { 0: fieldNameOrOptions, 1: from3, length: argc } = readFieldArgs;
  let options;
  if (typeof fieldNameOrOptions === "string") {
    options = {
      fieldName: fieldNameOrOptions,
      // Default to objectOrReference only when no second argument was
      // passed for the from parameter, not when undefined is explicitly
      // passed as the second argument.
      from: argc > 1 ? from3 : objectOrReference
    };
  } else {
    options = __spreadValues({}, fieldNameOrOptions);
    if (!hasOwn.call(options, "from")) {
      options.from = objectOrReference;
    }
  }
  if (__DEV__ && options.from === void 0) {
    __DEV__ && invariant3.warn(105, stringifyForDisplay(Array.from(readFieldArgs)));
  }
  if (void 0 === options.variables) {
    options.variables = variables;
  }
  return options;
}
function makeMergeObjectsFunction(store) {
  return function mergeObjects(existing, incoming) {
    if (isArray(existing) || isArray(incoming)) {
      throw newInvariantError(106);
    }
    if (isNonNullObject(existing) && isNonNullObject(incoming)) {
      const eType = store.getFieldValue(existing, "__typename");
      const iType = store.getFieldValue(incoming, "__typename");
      const typesDiffer = eType && iType && eType !== iType;
      if (typesDiffer) {
        return incoming;
      }
      if (isReference(existing) && storeValueIsStoreObject(incoming)) {
        store.merge(existing.__ref, incoming);
        return existing;
      }
      if (storeValueIsStoreObject(existing) && isReference(incoming)) {
        store.merge(existing, incoming.__ref);
        return incoming;
      }
      if (storeValueIsStoreObject(existing) && storeValueIsStoreObject(incoming)) {
        return __spreadValues(__spreadValues({}, existing), incoming);
      }
    }
    return incoming;
  };
}

// node_modules/@apollo/client/cache/core/types/common.js
var MissingFieldError = class _MissingFieldError extends Error {
  message;
  path;
  query;
  variables;
  constructor(message, path, query, variables) {
    super(message);
    this.message = message;
    this.path = path;
    this.query = query;
    this.variables = variables;
    this.name = "MissingFieldError";
    if (Array.isArray(this.path)) {
      this.missing = this.message;
      for (let i = this.path.length - 1; i >= 0; --i) {
        this.missing = { [this.path[i]]: this.missing };
      }
    } else {
      this.missing = this.path;
    }
    this.__proto__ = _MissingFieldError.prototype;
  }
  missing;
};

// node_modules/@apollo/client/cache/inmemory/readFromStore.js
function execSelectionSetKeyArgs(options) {
  return [options.selectionSet, options.objectOrReference, options.context];
}
var StoreReader = class {
  // cached version of executeSelectionSet
  executeSelectionSet;
  // cached version of executeSubSelectedArray
  executeSubSelectedArray;
  config;
  knownResults = /* @__PURE__ */ new WeakMap();
  constructor(config) {
    this.config = config;
    this.executeSelectionSet = wrap((options) => {
      const peekArgs = execSelectionSetKeyArgs(options);
      const other = this.executeSelectionSet.peek(...peekArgs);
      if (other) {
        return other;
      }
      maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
      return this.execSelectionSetImpl(options);
    }, {
      max: cacheSizes["inMemoryCache.executeSelectionSet"] || 5e4,
      keyArgs: execSelectionSetKeyArgs,
      // Note that the parameters of makeCacheKey are determined by the
      // array returned by keyArgs.
      makeCacheKey(selectionSet, parent, context) {
        if (supportsResultCaching(context.store)) {
          return context.store.makeCacheKey(selectionSet, isReference(parent) ? parent.__ref : parent, context.varString);
        }
      }
    });
    this.executeSubSelectedArray = wrap((options) => {
      maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
      return this.execSubSelectedArrayImpl(options);
    }, {
      max: cacheSizes["inMemoryCache.executeSubSelectedArray"] || 1e4,
      makeCacheKey({ field, array, context }) {
        if (supportsResultCaching(context.store)) {
          return context.store.makeCacheKey(field, array, context.varString);
        }
      }
    });
  }
  /**
   * Given a store and a query, return as much of the result as possible and
   * identify if any data was missing from the store.
   */
  diffQueryAgainstStore({ store, query, rootId = "ROOT_QUERY", variables, returnPartialData = true }) {
    const policies = this.config.cache.policies;
    variables = __spreadValues(__spreadValues({}, getDefaultValues(getQueryDefinition(query))), variables);
    const rootRef = makeReference(rootId);
    const execResult = this.executeSelectionSet({
      selectionSet: getMainDefinition(query).selectionSet,
      objectOrReference: rootRef,
      enclosingRef: rootRef,
      context: __spreadValues({
        store,
        query,
        policies,
        variables,
        varString: canonicalStringify(variables)
      }, extractFragmentContext(query, this.config.fragments))
    });
    let missing;
    if (execResult.missing) {
      missing = new MissingFieldError(firstMissing(execResult.missing), execResult.missing, query, variables);
    }
    const complete = !missing;
    const { result } = execResult;
    return {
      result: complete ? result : returnPartialData ? Object.keys(result).length === 0 ? null : result : null,
      complete,
      missing
    };
  }
  isFresh(result, parent, selectionSet, context) {
    if (supportsResultCaching(context.store) && this.knownResults.get(result) === selectionSet) {
      const latest = this.executeSelectionSet.peek(selectionSet, parent, context);
      if (latest && result === latest.result) {
        return true;
      }
    }
    return false;
  }
  // Uncached version of executeSelectionSet.
  execSelectionSetImpl({ selectionSet, objectOrReference, enclosingRef, context }) {
    if (isReference(objectOrReference) && !context.policies.rootTypenamesById[objectOrReference.__ref] && !context.store.has(objectOrReference.__ref)) {
      return {
        result: {},
        missing: `Dangling reference to missing ${objectOrReference.__ref} object`
      };
    }
    const { variables, policies, store } = context;
    const typename = store.getFieldValue(objectOrReference, "__typename");
    const objectsToMerge = [];
    let missing;
    const missingMerger = new DeepMerger();
    if (typeof typename === "string" && !policies.rootIdsByTypename[typename]) {
      objectsToMerge.push({ __typename: typename });
    }
    function handleMissing(result2, resultName) {
      if (result2.missing) {
        missing = missingMerger.merge(missing, {
          [resultName]: result2.missing
        });
      }
      return result2.result;
    }
    const workSet = new Set(selectionSet.selections);
    workSet.forEach((selection) => {
      if (!shouldInclude(selection, variables))
        return;
      if (isField(selection)) {
        let fieldValue = policies.readField({
          fieldName: selection.name.value,
          field: selection,
          variables: context.variables,
          from: objectOrReference
        }, context);
        const resultName = resultKeyNameFromField(selection);
        if (fieldValue === void 0) {
          if (!addTypenameToDocument.added(selection)) {
            missing = missingMerger.merge(missing, {
              [resultName]: `Can't find field '${selection.name.value}' on ${isReference(objectOrReference) ? objectOrReference.__ref + " object" : "object " + JSON.stringify(objectOrReference, null, 2)}`
            });
          }
        } else if (isArray(fieldValue)) {
          if (fieldValue.length > 0) {
            fieldValue = handleMissing(this.executeSubSelectedArray({
              field: selection,
              array: fieldValue,
              enclosingRef,
              context
            }), resultName);
          }
        } else if (!selection.selectionSet) {
        } else if (fieldValue != null) {
          fieldValue = handleMissing(this.executeSelectionSet({
            selectionSet: selection.selectionSet,
            objectOrReference: fieldValue,
            enclosingRef: isReference(fieldValue) ? fieldValue : enclosingRef,
            context
          }), resultName);
        }
        if (fieldValue !== void 0) {
          objectsToMerge.push({ [resultName]: fieldValue });
        }
      } else {
        const fragment = getFragmentFromSelection(selection, context.lookupFragment);
        if (!fragment && selection.kind === Kind.FRAGMENT_SPREAD) {
          throw newInvariantError(107, selection.name.value);
        }
        if (fragment && policies.fragmentMatches(fragment, typename)) {
          fragment.selectionSet.selections.forEach(workSet.add, workSet);
        }
      }
    });
    const result = mergeDeepArray(objectsToMerge);
    const finalResult = { result, missing };
    const frozen = maybeDeepFreeze(finalResult);
    if (frozen.result) {
      this.knownResults.set(frozen.result, selectionSet);
    }
    return frozen;
  }
  // Uncached version of executeSubSelectedArray.
  execSubSelectedArrayImpl({ field, array, enclosingRef, context }) {
    let missing;
    let missingMerger = new DeepMerger();
    function handleMissing(childResult, i) {
      if (childResult.missing) {
        missing = missingMerger.merge(missing, { [i]: childResult.missing });
      }
      return childResult.result;
    }
    if (field.selectionSet) {
      array = array.filter((item) => item === void 0 || context.store.canRead(item));
    }
    array = array.map((item, i) => {
      if (item === null) {
        return null;
      }
      if (isArray(item)) {
        return handleMissing(this.executeSubSelectedArray({
          field,
          array: item,
          enclosingRef,
          context
        }), i);
      }
      if (field.selectionSet) {
        return handleMissing(this.executeSelectionSet({
          selectionSet: field.selectionSet,
          objectOrReference: item,
          enclosingRef: isReference(item) ? item : enclosingRef,
          context
        }), i);
      }
      if (__DEV__) {
        assertSelectionSetForIdValue(context.store, field, item);
      }
      return item;
    });
    return {
      result: array,
      missing
    };
  }
};
function firstMissing(tree) {
  try {
    JSON.stringify(tree, (_, value) => {
      if (typeof value === "string")
        throw value;
      return value;
    });
  } catch (result) {
    return result;
  }
}
function assertSelectionSetForIdValue(store, field, fieldValue) {
  if (!field.selectionSet) {
    const workSet = /* @__PURE__ */ new Set([fieldValue]);
    workSet.forEach((value) => {
      if (isNonNullObject(value)) {
        invariant3(
          !isReference(value),
          108,
          getTypenameFromStoreObject(store, value),
          field.name.value
        );
        Object.values(value).forEach(workSet.add, workSet);
      }
    });
  }
}

// node_modules/@apollo/client/cache/inmemory/writeToStore.js
function getContextFlavor(context, clientOnly, deferred) {
  const key = `${clientOnly}${deferred}`;
  let flavored = context.flavors.get(key);
  if (!flavored) {
    context.flavors.set(key, flavored = context.clientOnly === clientOnly && context.deferred === deferred ? context : __spreadProps(__spreadValues({}, context), {
      clientOnly,
      deferred
    }));
  }
  return flavored;
}
var StoreWriter = class {
  cache;
  reader;
  fragments;
  constructor(cache, reader, fragments) {
    this.cache = cache;
    this.reader = reader;
    this.fragments = fragments;
  }
  writeToStore(store, { query, result, dataId, variables, overwrite, extensions }) {
    const operationDefinition = getOperationDefinition(query);
    const merger = makeProcessedFieldsMerger();
    variables = __spreadValues(__spreadValues({}, getDefaultValues(operationDefinition)), variables);
    const context = __spreadProps(__spreadValues({
      store,
      written: {},
      merge(existing, incoming) {
        return merger.merge(existing, incoming);
      },
      variables,
      varString: canonicalStringify(variables)
    }, extractFragmentContext(query, this.fragments)), {
      overwrite: !!overwrite,
      incomingById: /* @__PURE__ */ new Map(),
      clientOnly: false,
      deferred: false,
      flavors: /* @__PURE__ */ new Map(),
      extensions
    });
    const ref = this.processSelectionSet({
      result: result || {},
      dataId,
      selectionSet: operationDefinition.selectionSet,
      mergeTree: { map: /* @__PURE__ */ new Map() },
      context,
      path: []
    });
    if (!isReference(ref)) {
      throw newInvariantError(109, result);
    }
    context.incomingById.forEach(({ storeObject, mergeTree, fieldNodeSet }, dataId2) => {
      const entityRef = makeReference(dataId2);
      if (mergeTree && mergeTree.map.size) {
        const applied = this.applyMerges(mergeTree, entityRef, storeObject, context);
        if (isReference(applied)) {
          return;
        }
        storeObject = applied;
      }
      if (__DEV__ && !context.overwrite) {
        const fieldsWithSelectionSets = {};
        fieldNodeSet.forEach((field) => {
          if (field.selectionSet) {
            fieldsWithSelectionSets[field.name.value] = true;
          }
        });
        const hasSelectionSet = (storeFieldName) => fieldsWithSelectionSets[fieldNameFromStoreName(storeFieldName)] === true;
        const hasMergeFunction = (storeFieldName) => {
          const childTree = mergeTree && mergeTree.map.get(storeFieldName);
          return Boolean(childTree && childTree.info && childTree.info.merge);
        };
        Object.keys(storeObject).forEach((storeFieldName) => {
          if (hasSelectionSet(storeFieldName) && !hasMergeFunction(storeFieldName)) {
            warnAboutDataLoss(entityRef, storeObject, storeFieldName, context.store);
          }
        });
      }
      store.merge(dataId2, storeObject);
    });
    store.retain(ref.__ref);
    return ref;
  }
  processSelectionSet({
    dataId,
    result,
    selectionSet,
    context,
    // This object allows processSelectionSet to report useful information
    // to its callers without explicitly returning that information.
    mergeTree,
    path: currentPath
  }) {
    const { policies } = this.cache;
    let incoming = {};
    const typename = dataId && policies.rootTypenamesById[dataId] || getTypenameFromResult(result, selectionSet, context.fragmentMap) || dataId && context.store.get(dataId, "__typename");
    if ("string" === typeof typename) {
      incoming.__typename = typename;
    }
    const readField = (...args) => {
      const options = normalizeReadFieldOptions(args, incoming, context.variables);
      if (isReference(options.from)) {
        const info = context.incomingById.get(options.from.__ref);
        if (info) {
          const result2 = policies.readField(__spreadProps(__spreadValues({}, options), {
            from: info.storeObject
          }), context);
          if (result2 !== void 0) {
            return result2;
          }
        }
      }
      return policies.readField(options, context);
    };
    const fieldNodeSet = /* @__PURE__ */ new Set();
    this.flattenFields(
      selectionSet,
      result,
      // This WriteContext will be the default context value for fields returned
      // by the flattenFields method, but some fields may be assigned a modified
      // context, depending on the presence of @client and other directives.
      context,
      typename
    ).forEach((context2, field) => {
      const resultFieldKey = resultKeyNameFromField(field);
      const value = result[resultFieldKey];
      const path = [...currentPath, field.name.value];
      fieldNodeSet.add(field);
      if (value !== void 0) {
        const storeFieldName = policies.getStoreFieldName({
          typename,
          fieldName: field.name.value,
          field,
          variables: context2.variables
        });
        const childTree = getChildMergeTree(mergeTree, storeFieldName);
        let incomingValue = this.processFieldValue(
          value,
          field,
          // Reset context.clientOnly and context.deferred to their default
          // values before processing nested selection sets.
          field.selectionSet ? getContextFlavor(context2, false, false) : context2,
          childTree,
          path
        );
        let childTypename;
        if (field.selectionSet && (isReference(incomingValue) || storeValueIsStoreObject(incomingValue))) {
          childTypename = readField("__typename", incomingValue);
        }
        const merge = policies.getMergeFunction(typename, field.name.value, childTypename);
        if (merge) {
          childTree.info = {
            // TODO Check compatibility against any existing childTree.field?
            field,
            typename,
            merge,
            path
          };
        } else if (hasDirectives(["stream"], field) && Array.isArray(incomingValue) && context2.extensions?.[streamInfoSymbol]) {
          childTree.info = {
            field,
            typename,
            merge: defaultStreamFieldMergeFn,
            path
          };
        } else {
          maybeRecycleChildMergeTree(mergeTree, storeFieldName);
        }
        incoming = context2.merge(incoming, {
          [storeFieldName]: incomingValue
        });
      } else if (__DEV__ && !context2.clientOnly && !context2.deferred && !addTypenameToDocument.added(field) && // If the field has a read function, it may be a synthetic field or
      // provide a default value, so its absence from the written data should
      // not be cause for alarm.
      !policies.getReadFunction(typename, field.name.value)) {
        invariant3.error(110, resultKeyNameFromField(field), result);
      }
    });
    try {
      const [id, keyObject] = policies.identify(result, {
        typename,
        selectionSet,
        fragmentMap: context.fragmentMap,
        storeObject: incoming,
        readField
      });
      dataId = dataId || id;
      if (keyObject) {
        incoming = context.merge(incoming, keyObject);
      }
    } catch (e) {
      if (!dataId)
        throw e;
    }
    if ("string" === typeof dataId) {
      const dataRef = makeReference(dataId);
      const sets = context.written[dataId] || (context.written[dataId] = []);
      if (sets.indexOf(selectionSet) >= 0)
        return dataRef;
      sets.push(selectionSet);
      if (this.reader && this.reader.isFresh(result, dataRef, selectionSet, context)) {
        return dataRef;
      }
      const previous = context.incomingById.get(dataId);
      if (previous) {
        previous.storeObject = context.merge(previous.storeObject, incoming);
        previous.mergeTree = mergeMergeTrees(previous.mergeTree, mergeTree);
        fieldNodeSet.forEach((field) => previous.fieldNodeSet.add(field));
      } else {
        context.incomingById.set(dataId, {
          storeObject: incoming,
          // Save a reference to mergeTree only if it is not empty, because
          // empty MergeTrees may be recycled by maybeRecycleChildMergeTree and
          // reused for entirely different parts of the result tree.
          mergeTree: mergeTreeIsEmpty(mergeTree) ? void 0 : mergeTree,
          fieldNodeSet
        });
      }
      return dataRef;
    }
    return incoming;
  }
  processFieldValue(value, field, context, mergeTree, path) {
    if (!field.selectionSet || value === null) {
      return __DEV__ ? cloneDeep(value) : value;
    }
    if (isArray(value)) {
      return value.map((item, i) => {
        const value2 = this.processFieldValue(item, field, context, getChildMergeTree(mergeTree, i), [...path, i]);
        maybeRecycleChildMergeTree(mergeTree, i);
        return value2;
      });
    }
    return this.processSelectionSet({
      result: value,
      selectionSet: field.selectionSet,
      context,
      mergeTree,
      path
    });
  }
  // Implements https://spec.graphql.org/draft/#sec-Field-Collection, but with
  // some additions for tracking @client and @defer directives.
  flattenFields(selectionSet, result, context, typename = getTypenameFromResult(result, selectionSet, context.fragmentMap)) {
    const fieldMap = /* @__PURE__ */ new Map();
    const { policies } = this.cache;
    const limitingTrie = new Trie(false);
    (function flatten(selectionSet2, inheritedContext) {
      const visitedNode = limitingTrie.lookup(
        selectionSet2,
        // Because we take inheritedClientOnly and inheritedDeferred into
        // consideration here (in addition to selectionSet), it's possible for
        // the same selection set to be flattened more than once, if it appears
        // in the query with different @client and/or @directive configurations.
        inheritedContext.clientOnly,
        inheritedContext.deferred
      );
      if (visitedNode.visited)
        return;
      visitedNode.visited = true;
      selectionSet2.selections.forEach((selection) => {
        if (!shouldInclude(selection, context.variables))
          return;
        let { clientOnly, deferred } = inheritedContext;
        if (
          // Since the presence of @client or @defer on this field can only
          // cause clientOnly or deferred to become true, we can skip the
          // forEach loop if both clientOnly and deferred are already true.
          !(clientOnly && deferred) && isNonEmptyArray(selection.directives)
        ) {
          selection.directives.forEach((dir) => {
            const name = dir.name.value;
            if (name === "client")
              clientOnly = true;
            if (name === "defer") {
              const args = argumentsObjectFromField(dir, context.variables);
              if (!args || args.if !== false) {
                deferred = true;
              }
            }
          });
        }
        if (isField(selection)) {
          const existing = fieldMap.get(selection);
          if (existing) {
            clientOnly = clientOnly && existing.clientOnly;
            deferred = deferred && existing.deferred;
          }
          fieldMap.set(selection, getContextFlavor(context, clientOnly, deferred));
        } else {
          const fragment = getFragmentFromSelection(selection, context.lookupFragment);
          if (!fragment && selection.kind === Kind.FRAGMENT_SPREAD) {
            throw newInvariantError(111, selection.name.value);
          }
          if (fragment && policies.fragmentMatches(fragment, typename, result, context.variables)) {
            flatten(fragment.selectionSet, getContextFlavor(context, clientOnly, deferred));
          }
        }
      });
    })(selectionSet, context);
    return fieldMap;
  }
  applyMerges(mergeTree, existing, incoming, context, getStorageArgs) {
    if (mergeTree.map.size && !isReference(incoming)) {
      const e = (
        // Items in the same position in different arrays are not
        // necessarily related to each other, so when incoming is an array
        // we process its elements as if there was no existing data.
        !isArray(incoming) && // Likewise, existing must be either a Reference or a StoreObject
        // in order for its fields to be safe to merge with the fields of
        // the incoming object.
        (isReference(existing) || storeValueIsStoreObject(existing)) ? existing : void 0
      );
      const i = incoming;
      if (e && !getStorageArgs) {
        getStorageArgs = [isReference(e) ? e.__ref : e];
      }
      let changedFields;
      const getValue = (from3, name) => {
        return isArray(from3) ? typeof name === "number" ? from3[name] : void 0 : context.store.getFieldValue(from3, String(name));
      };
      mergeTree.map.forEach((childTree, storeFieldName) => {
        const eVal = getValue(e, storeFieldName);
        const iVal = getValue(i, storeFieldName);
        if (void 0 === iVal)
          return;
        if (getStorageArgs) {
          getStorageArgs.push(storeFieldName);
        }
        const aVal = this.applyMerges(childTree, eVal, iVal, context, getStorageArgs);
        if (aVal !== iVal) {
          changedFields = changedFields || /* @__PURE__ */ new Map();
          changedFields.set(storeFieldName, aVal);
        }
        if (getStorageArgs) {
          invariant3(getStorageArgs.pop() === storeFieldName);
        }
      });
      if (changedFields) {
        incoming = isArray(i) ? i.slice(0) : __spreadValues({}, i);
        changedFields.forEach((value, name) => {
          incoming[name] = value;
        });
      }
    }
    if (mergeTree.info) {
      return this.cache.policies.runMergeFunction(existing, incoming, mergeTree.info, context, getStorageArgs && context.store.getStorage(...getStorageArgs));
    }
    return incoming;
  }
};
var emptyMergeTreePool = [];
function getChildMergeTree({ map: map2 }, name) {
  if (!map2.has(name)) {
    map2.set(name, emptyMergeTreePool.pop() || { map: /* @__PURE__ */ new Map() });
  }
  return map2.get(name);
}
function mergeMergeTrees(left, right) {
  if (left === right || !right || mergeTreeIsEmpty(right))
    return left;
  if (!left || mergeTreeIsEmpty(left))
    return right;
  const info = left.info && right.info ? __spreadValues(__spreadValues({}, left.info), right.info) : left.info || right.info;
  const needToMergeMaps = left.map.size && right.map.size;
  const map2 = needToMergeMaps ? /* @__PURE__ */ new Map() : left.map.size ? left.map : right.map;
  const merged = { info, map: map2 };
  if (needToMergeMaps) {
    const remainingRightKeys = new Set(right.map.keys());
    left.map.forEach((leftTree, key) => {
      merged.map.set(key, mergeMergeTrees(leftTree, right.map.get(key)));
      remainingRightKeys.delete(key);
    });
    remainingRightKeys.forEach((key) => {
      merged.map.set(key, mergeMergeTrees(right.map.get(key), left.map.get(key)));
    });
  }
  return merged;
}
function mergeTreeIsEmpty(tree) {
  return !tree || !(tree.info || tree.map.size);
}
function maybeRecycleChildMergeTree({ map: map2 }, name) {
  const childTree = map2.get(name);
  if (childTree && mergeTreeIsEmpty(childTree)) {
    emptyMergeTreePool.push(childTree);
    map2.delete(name);
  }
}
var warnings = /* @__PURE__ */ new Set();
function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store) {
  const getChild = (objOrRef) => {
    const child = store.getFieldValue(objOrRef, storeFieldName);
    return typeof child === "object" && child;
  };
  const existing = getChild(existingRef);
  if (!existing)
    return;
  const incoming = getChild(incomingObj);
  if (!incoming)
    return;
  if (isReference(existing))
    return;
  if (equal(existing, incoming))
    return;
  if (Object.keys(existing).every((key) => store.getFieldValue(incoming, key) !== void 0)) {
    return;
  }
  const parentType = store.getFieldValue(existingRef, "__typename") || store.getFieldValue(incomingObj, "__typename");
  const fieldName = fieldNameFromStoreName(storeFieldName);
  const typeDotName = `${parentType}.${fieldName}`;
  if (warnings.has(typeDotName))
    return;
  warnings.add(typeDotName);
  const childTypenames = [];
  if (!isArray(existing) && !isArray(incoming)) {
    [existing, incoming].forEach((child) => {
      const typename = store.getFieldValue(child, "__typename");
      if (typeof typename === "string" && !childTypenames.includes(typename)) {
        childTypenames.push(typename);
      }
    });
  }
  __DEV__ && invariant3.warn(112, fieldName, parentType, childTypenames.length ? "either ensure all objects of type " + childTypenames.join(" and ") + " have an ID or a custom merge function, or " : "", typeDotName, Array.isArray(existing) ? [...existing] : __spreadValues({}, existing), Array.isArray(incoming) ? [...incoming] : __spreadValues({}, incoming));
}
function getTypenameFromResult(result, selectionSet, fragmentMap) {
  let fragments;
  for (const selection of selectionSet.selections) {
    if (isField(selection)) {
      if (selection.name.value === "__typename") {
        return result[resultKeyNameFromField(selection)];
      }
    } else if (fragments) {
      fragments.push(selection);
    } else {
      fragments = [selection];
    }
  }
  if (typeof result.__typename === "string") {
    return result.__typename;
  }
  if (fragments) {
    for (const selection of fragments) {
      const typename = getTypenameFromResult(result, getFragmentFromSelection(selection, fragmentMap).selectionSet, fragmentMap);
      if (typeof typename === "string") {
        return typename;
      }
    }
  }
}

// node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
var InMemoryCache = class extends ApolloCache {
  data;
  optimisticData;
  config;
  watches = /* @__PURE__ */ new Set();
  storeReader;
  storeWriter;
  addTypenameTransform = new DocumentTransform(addTypenameToDocument);
  maybeBroadcastWatch;
  // Override the default value, since InMemoryCache result objects are frozen
  // in development and expected to remain logically immutable in production.
  assumeImmutableResults = true;
  // Dynamically imported code can augment existing typePolicies or
  // possibleTypes by calling cache.policies.addTypePolicies or
  // cache.policies.addPossibletypes.
  policies;
  makeVar = makeVar;
  constructor(config = {}) {
    super();
    this.config = normalizeConfig(config);
    this.policies = new Policies({
      cache: this,
      dataIdFromObject: this.config.dataIdFromObject,
      possibleTypes: this.config.possibleTypes,
      typePolicies: this.config.typePolicies
    });
    this.init();
  }
  init() {
    const rootStore = this.data = new EntityStore.Root({
      policies: this.policies,
      resultCaching: this.config.resultCaching
    });
    this.optimisticData = rootStore.stump;
    this.resetResultCache();
  }
  resetResultCache() {
    const { fragments } = this.config;
    this.addTypenameTransform.resetCache();
    fragments?.resetCaches();
    this.storeWriter = new StoreWriter(this, this.storeReader = new StoreReader({ cache: this, fragments }), fragments);
    this.maybeBroadcastWatch = wrap((c, options) => {
      return this.broadcastWatch(c, options);
    }, {
      max: cacheSizes["inMemoryCache.maybeBroadcastWatch"] || 5e3,
      makeCacheKey: (c) => {
        const store = c.optimistic ? this.optimisticData : this.data;
        if (supportsResultCaching(store)) {
          const { optimistic, id, variables } = c;
          return store.makeCacheKey(
            c.query,
            // Different watches can have the same query, optimistic
            // status, rootId, and variables, but if their callbacks are
            // different, the (identical) result needs to be delivered to
            // each distinct callback. The easiest way to achieve that
            // separation is to include c.callback in the cache key for
            // maybeBroadcastWatch calls. See issue #5733.
            c.callback,
            canonicalStringify({ optimistic, id, variables })
          );
        }
      }
    });
    (/* @__PURE__ */ new Set([this.data.group, this.optimisticData.group])).forEach((group) => group.resetCaching());
  }
  restore(data) {
    this.init();
    if (data)
      this.data.replace(data);
    return this;
  }
  extract(optimistic = false) {
    return (optimistic ? this.optimisticData : this.data).extract();
  }
  read(options) {
    const {
      // Since read returns data or null, without any additional metadata
      // about whether/where there might have been missing fields, the
      // default behavior cannot be returnPartialData = true (like it is
      // for the diff method), since defaulting to true would violate the
      // integrity of the T in the return type. However, partial data may
      // be useful in some cases, so returnPartialData:true may be
      // specified explicitly.
      returnPartialData = false
    } = options;
    return this.storeReader.diffQueryAgainstStore(__spreadProps(__spreadValues({}, options), {
      store: options.optimistic ? this.optimisticData : this.data,
      config: this.config,
      returnPartialData
    })).result;
  }
  write(options) {
    try {
      ++this.txCount;
      return this.storeWriter.writeToStore(this.data, options);
    } finally {
      if (!--this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  }
  modify(options) {
    if (hasOwn.call(options, "id") && !options.id) {
      return false;
    }
    const store = options.optimistic ? this.optimisticData : this.data;
    try {
      ++this.txCount;
      return store.modify(options.id || "ROOT_QUERY", options.fields, false);
    } finally {
      if (!--this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  }
  diff(options) {
    return this.storeReader.diffQueryAgainstStore(__spreadProps(__spreadValues({}, options), {
      store: options.optimistic ? this.optimisticData : this.data,
      rootId: options.id || "ROOT_QUERY",
      config: this.config
    }));
  }
  watch(watch) {
    if (!this.watches.size) {
      recallCache(this);
    }
    this.watches.add(watch);
    if (watch.immediate) {
      this.maybeBroadcastWatch(watch);
    }
    return () => {
      if (this.watches.delete(watch) && !this.watches.size) {
        forgetCache(this);
      }
      this.maybeBroadcastWatch.forget(watch);
    };
  }
  gc(options) {
    canonicalStringify.reset();
    print2.reset();
    const ids = this.optimisticData.gc();
    if (options && !this.txCount && options.resetResultCache) {
      this.resetResultCache();
    }
    return ids;
  }
  // Call this method to ensure the given root ID remains in the cache after
  // garbage collection, along with its transitive child entities. Note that
  // the cache automatically retains all directly written entities. By default,
  // the retainment persists after optimistic updates are removed. Pass true
  // for the optimistic argument if you would prefer for the retainment to be
  // discarded when the top-most optimistic layer is removed. Returns the
  // resulting (non-negative) retainment count.
  retain(rootId, optimistic) {
    return (optimistic ? this.optimisticData : this.data).retain(rootId);
  }
  // Call this method to undo the effect of the retain method, above. Once the
  // retainment count falls to zero, the given ID will no longer be preserved
  // during garbage collection, though it may still be preserved by other safe
  // entities that refer to it. Returns the resulting (non-negative) retainment
  // count, in case that's useful.
  release(rootId, optimistic) {
    return (optimistic ? this.optimisticData : this.data).release(rootId);
  }
  // Returns the canonical ID for a given StoreObject, obeying typePolicies
  // and keyFields (and dataIdFromObject, if you still use that). At minimum,
  // the object must contain a __typename and any primary key fields required
  // to identify entities of that type. If you pass a query result object, be
  // sure that none of the primary key fields have been renamed by aliasing.
  // If you pass a Reference object, its __ref ID string will be returned.
  identify(object) {
    if (isReference(object))
      return object.__ref;
    try {
      return this.policies.identify(object)[0];
    } catch (e) {
      __DEV__ && invariant3.warn(e);
    }
  }
  evict(options) {
    if (!options.id) {
      if (hasOwn.call(options, "id")) {
        return false;
      }
      options = __spreadProps(__spreadValues({}, options), { id: "ROOT_QUERY" });
    }
    try {
      ++this.txCount;
      return this.optimisticData.evict(options, this.data);
    } finally {
      if (!--this.txCount && options.broadcast !== false) {
        this.broadcastWatches();
      }
    }
  }
  reset(options) {
    this.init();
    canonicalStringify.reset();
    if (options && options.discardWatches) {
      this.watches.forEach((watch) => this.maybeBroadcastWatch.forget(watch));
      this.watches.clear();
      forgetCache(this);
    } else {
      this.broadcastWatches();
    }
    return Promise.resolve();
  }
  removeOptimistic(idToRemove) {
    const newOptimisticData = this.optimisticData.removeLayer(idToRemove);
    if (newOptimisticData !== this.optimisticData) {
      this.optimisticData = newOptimisticData;
      this.broadcastWatches();
    }
  }
  txCount = 0;
  /**
  * Executes multiple cache operations as a single batch, ensuring that
  * watchers are only notified once after all operations complete. This is
  * useful for improving performance when making multiple cache updates, as it
  * prevents unnecessary re-renders or query refetches between individual
  * operations.
  * 
  * The `batch` method supports both optimistic and non-optimistic updates, and
  * provides fine-grained control over which cache layer receives the updates
  * and when watchers are notified.
  * 
  * For usage instructions, see [Interacting with cached data: `cache.batch`](https://www.apollographql.com/docs/react/caching/cache-interaction#using-cachebatch).
  * 
  * @example
  * 
  * ```js
  * cache.batch({
  *   update(cache) {
  *     cache.writeQuery({
  *       query: GET_TODOS,
  *       data: { todos: updatedTodos },
  *     });
  *     cache.evict({ id: "Todo:123" });
  *   },
  * });
  * ```
  * 
  * @example
  * 
  * ```js
  * // Optimistic update with a custom layer ID
  * cache.batch({
  *   optimistic: "add-todo-optimistic",
  *   update(cache) {
  *     cache.modify({
  *       fields: {
  *         todos(existing = []) {
  *           return [...existing, newTodoRef];
  *         },
  *       },
  *     });
  *   },
  * });
  * ```
  * 
  * @returns The return value of the `update` function.
  */
  batch(options) {
    const { update, optimistic = true, removeOptimistic, onWatchUpdated } = options;
    let updateResult;
    const perform = (layer) => {
      const { data, optimisticData } = this;
      ++this.txCount;
      if (layer) {
        this.data = this.optimisticData = layer;
      }
      try {
        return updateResult = update(this);
      } finally {
        --this.txCount;
        this.data = data;
        this.optimisticData = optimisticData;
      }
    };
    const alreadyDirty = /* @__PURE__ */ new Set();
    if (onWatchUpdated && !this.txCount) {
      this.broadcastWatches(__spreadProps(__spreadValues({}, options), {
        onWatchUpdated(watch) {
          alreadyDirty.add(watch);
          return false;
        }
      }));
    }
    if (typeof optimistic === "string") {
      this.optimisticData = this.optimisticData.addLayer(optimistic, perform);
    } else if (optimistic === false) {
      perform(this.data);
    } else {
      perform();
    }
    if (typeof removeOptimistic === "string") {
      this.optimisticData = this.optimisticData.removeLayer(removeOptimistic);
    }
    if (onWatchUpdated && alreadyDirty.size) {
      this.broadcastWatches(__spreadProps(__spreadValues({}, options), {
        onWatchUpdated(watch, diff) {
          const result = onWatchUpdated.call(this, watch, diff);
          if (result !== false) {
            alreadyDirty.delete(watch);
          }
          return result;
        }
      }));
      if (alreadyDirty.size) {
        alreadyDirty.forEach((watch) => this.maybeBroadcastWatch.dirty(watch));
      }
    } else {
      this.broadcastWatches(options);
    }
    return updateResult;
  }
  performTransaction(update, optimisticId) {
    return this.batch({
      update,
      optimistic: optimisticId || optimisticId !== null
    });
  }
  transformDocument(document) {
    return this.addTypenameTransform.transformDocument(this.addFragmentsToDocument(document));
  }
  fragmentMatches(fragment, typename) {
    return this.policies.fragmentMatches(fragment, typename);
  }
  lookupFragment(fragmentName) {
    return this.config.fragments?.lookup(fragmentName) || null;
  }
  resolvesClientField(typename, fieldName) {
    return !!this.policies.getReadFunction(typename, fieldName);
  }
  broadcastWatches(options) {
    if (!this.txCount) {
      const prevOnAfter = this.onAfterBroadcast;
      const callbacks = /* @__PURE__ */ new Set();
      this.onAfterBroadcast = (cb) => {
        callbacks.add(cb);
      };
      try {
        this.watches.forEach((c) => this.maybeBroadcastWatch(c, options));
        callbacks.forEach((cb) => cb());
      } finally {
        this.onAfterBroadcast = prevOnAfter;
      }
    }
  }
  addFragmentsToDocument(document) {
    const { fragments } = this.config;
    return fragments ? fragments.transform(document) : document;
  }
  // This method is wrapped by maybeBroadcastWatch, which is called by
  // broadcastWatches, so that we compute and broadcast results only when
  // the data that would be broadcast might have changed. It would be
  // simpler to check for changes after recomputing a result but before
  // broadcasting it, but this wrapping approach allows us to skip both
  // the recomputation and the broadcast, in most cases.
  broadcastWatch(c, options) {
    const { lastDiff } = c;
    const diff = this.diff(c);
    if (options) {
      if (c.optimistic && typeof options.optimistic === "string") {
        diff.fromOptimisticTransaction = true;
      }
      if (options.onWatchUpdated && options.onWatchUpdated.call(this, c, diff, lastDiff) === false) {
        return;
      }
    }
    if (!lastDiff || !equal(lastDiff.result, diff.result)) {
      c.callback(c.lastDiff = diff, lastDiff);
    }
  }
};
if (__DEV__) {
  InMemoryCache.prototype.getMemoryInternals = getInMemoryCacheMemoryInternals;
}

// node_modules/@apollo/client/incremental/handlers/notImplemented.js
var NotImplementedHandler = class {
  isIncrementalResult(_) {
    return false;
  }
  prepareRequest(request) {
    invariant3(!hasDirectives(["defer", "stream"], request.query), 67);
    return request;
  }
  extractErrors() {
  }
  // This code path can never be reached, so we won't implement it.
  startRequest = void 0;
};

// node_modules/@apollo/client/link/utils/createOperation.js
function createOperation(request, { client }) {
  const operation = {
    query: request.query,
    variables: request.variables || {},
    extensions: request.extensions || {},
    operationName: getOperationName(request.query),
    operationType: getOperationDefinition(request.query).operation
  };
  let context = __spreadValues({}, request.context);
  const setContext = (next) => {
    if (typeof next === "function") {
      context = __spreadValues(__spreadValues({}, context), next(getContext()));
    } else {
      context = __spreadValues(__spreadValues({}, context), next);
    }
  };
  const getContext = () => Object.freeze(__spreadValues({}, context));
  Object.defineProperty(operation, "setContext", {
    enumerable: false,
    value: setContext
  });
  Object.defineProperty(operation, "getContext", {
    enumerable: false,
    value: getContext
  });
  Object.defineProperty(operation, "client", {
    enumerable: false,
    value: client
  });
  return operation;
}

// node_modules/@apollo/client/link/core/ApolloLink.js
var ApolloLink = class _ApolloLink {
  /**
   * Creates a link that completes immediately and does not emit a result.
   *
   * @example
   *
   * ```ts
   * const link = ApolloLink.empty();
   * ```
   */
  static empty() {
    return new _ApolloLink(() => EMPTY);
  }
  /**
   * Composes multiple links into a single composed link that executes each
   * provided link in serial order.
   *
   * @example
   *
   * ```ts
   * import { from, HttpLink, ApolloLink } from "@apollo/client";
   * import { RetryLink } from "@apollo/client/link/retry";
   * import MyAuthLink from "../auth";
   *
   * const link = ApolloLink.from([
   *   new RetryLink(),
   *   new MyAuthLink(),
   *   new HttpLink({ uri: "http://localhost:4000/graphql" }),
   * ]);
   * ```
   *
   * @param links - An array of `ApolloLink` instances or request handlers that
   * are executed in serial order.
   */
  static from(links) {
    if (links.length === 0)
      return _ApolloLink.empty();
    const [first, ...rest] = links;
    return first.concat(...rest);
  }
  /**
   * Creates a link that conditionally routes a request to different links.
   *
   * @example
   *
   * ```ts
   * import { ApolloLink, HttpLink } from "@apollo/client";
   *
   * const link = ApolloLink.split(
   *   (operation) => operation.getContext().version === 1,
   *   new HttpLink({ uri: "http://localhost:4000/v1/graphql" }),
   *   new HttpLink({ uri: "http://localhost:4000/v2/graphql" })
   * );
   * ```
   *
   * @param test - A predicate function that receives the current `operation`
   * and returns a boolean indicating which link to execute. Returning `true`
   * executes the `left` link. Returning `false` executes the `right` link.
   *
   * @param left - The link that executes when the `test` function returns
   * `true`.
   *
   * @param right - The link that executes when the `test` function returns
   * `false`. If the `right` link is not provided, the request is forwarded to
   * the next link in the chain.
   */
  static split(test, left, right = new _ApolloLink((op, forward) => forward(op))) {
    const link = new _ApolloLink((operation, forward) => {
      const result = test(operation);
      if (__DEV__) {
        if (typeof result !== "boolean") {
          __DEV__ && invariant3.warn(63, result);
        }
      }
      return result ? left.request(operation, forward) : right.request(operation, forward);
    });
    return Object.assign(link, { left, right });
  }
  /**
   * Executes a GraphQL request against a link. The `execute` function begins
   * the request by calling the request handler of the link.
   *
   * @example
   *
   * ```ts
   * const observable = ApolloLink.execute(link, { query, variables }, { client });
   *
   * observable.subscribe({
   *   next(value) {
   *     console.log("Received", value);
   *   },
   *   error(error) {
   *     console.error("Oops got error", error);
   *   },
   *   complete() {
   *     console.log("Request complete");
   *   },
   * });
   * ```
   *
   * @param link - The `ApolloLink` instance to execute the request.
   *
   * @param request - The GraphQL request details, such as the `query` and
   * `variables`.
   *
   * @param context - The execution context for the request, such as the
   * `client` making the request.
   */
  static execute(link, request, context) {
    return link.request(createOperation(request, context), () => {
      if (__DEV__) {
        __DEV__ && invariant3.warn(64);
      }
      return EMPTY;
    });
  }
  /**
   * Combines multiple links into a single composed link.
   *
   * @example
   *
   * ```ts
   * const link = ApolloLink.concat(firstLink, secondLink, thirdLink);
   * ```
   *
   * @param links - The links to concatenate into a single link. Each link will
   * execute in serial order.
   *
   * @deprecated Use `ApolloLink.from` instead. `ApolloLink.concat` will be
   * removed in a future major version.
   */
  static concat(...links) {
    return _ApolloLink.from(links);
  }
  constructor(request) {
    if (request)
      this.request = request;
  }
  /**
   * Concatenates a link that conditionally routes a request to different links.
   *
   * @example
   *
   * ```ts
   * import { ApolloLink, HttpLink } from "@apollo/client";
   *
   * const previousLink = new ApolloLink((operation, forward) => {
   *   // Handle the request
   *
   *   return forward(operation);
   * });
   *
   * const link = previousLink.split(
   *   (operation) => operation.getContext().version === 1,
   *   new HttpLink({ uri: "http://localhost:4000/v1/graphql" }),
   *   new HttpLink({ uri: "http://localhost:4000/v2/graphql" })
   * );
   * ```
   *
   * @param test - A predicate function that receives the current `operation`
   * and returns a boolean indicating which link to execute. Returning `true`
   * executes the `left` link. Returning `false` executes the `right` link.
   *
   * @param left - The link that executes when the `test` function returns
   * `true`.
   *
   * @param right - The link that executes when the `test` function returns
   * `false`. If the `right` link is not provided, the request is forwarded to
   * the next link in the chain.
   */
  split(test, left, right) {
    return this.concat(_ApolloLink.split(test, left, right));
  }
  /**
   * Combines the link with other links into a single composed link.
   *
   * @example
   *
   * ```ts
   * import { ApolloLink, HttpLink } from "@apollo/client";
   *
   * const previousLink = new ApolloLink((operation, forward) => {
   *   // Handle the request
   *
   *   return forward(operation);
   * });
   *
   * const link = previousLink.concat(
   *   link1,
   *   link2,
   *   new HttpLink({ uri: "http://localhost:4000/graphql" })
   * );
   * ```
   */
  concat(...links) {
    if (links.length === 0) {
      return this;
    }
    return links.reduce(this.combine.bind(this), this);
  }
  combine(left, right) {
    const link = new _ApolloLink((operation, forward) => {
      return left.request(operation, (op) => right.request(op, forward));
    });
    return Object.assign(link, { left, right });
  }
  /**
   * Runs the request handler for the provided operation.
   *
   * > [!NOTE]
   * > This is called by the `ApolloLink.execute` function for you and should
   * > not be called directly. Prefer using `ApolloLink.execute` to make the
   * > request instead.
   */
  request(operation, forward) {
    throw newInvariantError(65);
  }
  /**
  * @internal
  * Used to iterate through all links that are concatenations or `split` links.
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  left;
  /**
  * @internal
  * Used to iterate through all links that are concatenations or `split` links.
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  right;
};

// node_modules/@apollo/client/link/core/execute.js
var execute = ApolloLink.execute;

// node_modules/@apollo/client/errors/utils.js
function isBranded(error, name) {
  return typeof error === "object" && error !== null && error[/* @__PURE__ */ Symbol.for("apollo.error")] === name;
}
function brand(error) {
  Object.defineProperty(error, /* @__PURE__ */ Symbol.for("apollo.error"), {
    value: error.name,
    enumerable: false,
    writable: false,
    configurable: false
  });
}

// node_modules/@apollo/client/errors/CombinedProtocolErrors.js
function defaultFormatMessage(errors) {
  return errors.map((e) => e.message || "Error message not found.").join("\n");
}
var CombinedProtocolErrors = class _CombinedProtocolErrors extends Error {
  /**
   * A method that determines whether an error is a `CombinedProtocolErrors`
   * object. This method enables TypeScript to narrow the error type.
   *
   * @example
   *
   * ```ts
   * if (CombinedProtocolErrors.is(error)) {
   *   // TypeScript now knows `error` is a CombinedProtocolErrors object
   *   console.log(error.errors);
   * }
   * ```
   */
  static is(error) {
    return isBranded(error, "CombinedProtocolErrors");
  }
  /**
  * A function that formats the error message used for the error's `message`
  * property. Override this method to provide your own formatting.
  * 
  * @remarks
  * 
  * The `formatMessage` function is called by the `CombinedProtocolErrors`
  * constructor to provide a formatted message as the `message` property of the
  * `CombinedProtocolErrors` object. Follow the ["Providing a custom message
  * formatter"](https://www.apollographql.com/docs/react/api/errors/CombinedProtocolErrors#providing-a-custom-message-formatter) guide to learn how to modify the message format.
  * 
  * @param errors - The array of GraphQL errors returned from the server in the
  * `errors` field of the response.
  * @param options - Additional context that could be useful when formatting
  * the message.
  */
  static formatMessage = defaultFormatMessage;
  /**
  * The raw list of errors returned by the top-level `errors` field in the
  * multipart HTTP subscription response.
  */
  errors;
  constructor(protocolErrors) {
    super(_CombinedProtocolErrors.formatMessage(protocolErrors, {
      defaultFormatMessage
    }));
    this.name = "CombinedProtocolErrors";
    this.errors = protocolErrors;
    brand(this);
    Object.setPrototypeOf(this, _CombinedProtocolErrors.prototype);
  }
};

// node_modules/@apollo/client/errors/isErrorLike.js
function isErrorLike(error) {
  return error !== null && typeof error === "object" && typeof error.message === "string" && typeof error.name === "string" && (typeof error.stack === "string" || typeof error.stack === "undefined");
}

// node_modules/@apollo/client/errors/UnconventionalError.js
var UnconventionalError = class _UnconventionalError extends Error {
  /**
   * A method that determines whether an error is an `UnconventionalError`
   * object. This method enables TypeScript to narrow the error type.
   *
   * @example
   *
   * ```ts
   * if (UnconventionalError.is(error)) {
   *   // TypeScript now knows `error` is a UnconventionalError object
   *   console.log("What caused this?", error.cause);
   * }
   * ```
   */
  static is(error) {
    return isBranded(error, "UnconventionalError");
  }
  constructor(errorType) {
    super("An error of unexpected shape occurred.", { cause: errorType });
    this.name = "UnconventionalError";
    brand(this);
    Object.setPrototypeOf(this, _UnconventionalError.prototype);
  }
};

// node_modules/@apollo/client/errors/CombinedGraphQLErrors.js
function defaultFormatMessage2(errors) {
  return errors.filter((e) => e).map((e) => e.message || "Error message not found.").join("\n");
}
var CombinedGraphQLErrors = class _CombinedGraphQLErrors extends Error {
  /**
  * A method that determines whether an error is a `CombinedGraphQLErrors`
  * object. This method enables TypeScript to narrow the error type.
  * 
  * @example
  * 
  * ```ts
  * if (CombinedGraphQLErrors.is(error)) {
  *   // TypeScript now knows `error` is a `CombinedGraphQLErrors` object
  *   console.log(error.errors);
  * }
  * ```
  */
  static is(error) {
    return isBranded(error, "CombinedGraphQLErrors");
  }
  /**
  * A function that formats the error message used for the error's `message`
  * property. Override this method to provide your own formatting.
  * 
  * @remarks
  * 
  * The `formatMessage` function is called by the `CombinedGraphQLErrors`
  * constructor to provide a formatted message as the `message` property of the
  * `CombinedGraphQLErrors` object. Follow the ["Providing a custom message
  * formatter"](https://www.apollographql.com/docs/react/api/errors/CombinedGraphQLErrors#providing-a-custom-message-formatter) guide to learn how to modify the message format.
  * 
  * @param errors - The array of GraphQL errors returned from the server in
  * the `errors` field of the response.
  * @param options - Additional context that could be useful when formatting
  * the message.
  */
  static formatMessage = defaultFormatMessage2;
  /**
  * The raw list of GraphQL errors returned by the `errors` field in the GraphQL response.
  */
  errors;
  /**
  * Partial data returned in the `data` field of the GraphQL response.
  */
  data;
  /**
  * Extensions returned by the `extensions` field in the GraphQL response.
  */
  extensions;
  constructor(result, errors = result.errors || []) {
    super(_CombinedGraphQLErrors.formatMessage(errors, {
      result,
      defaultFormatMessage: defaultFormatMessage2
    }));
    this.errors = errors;
    this.data = result.data;
    this.extensions = result.extensions;
    this.name = "CombinedGraphQLErrors";
    brand(this);
    Object.setPrototypeOf(this, _CombinedGraphQLErrors.prototype);
  }
};

// node_modules/@apollo/client/errors/LinkError.js
var registry = /* @__PURE__ */ new WeakSet();
function registerLinkError(error) {
  registry.add(error);
}

// node_modules/@apollo/client/errors/index.js
var PROTOCOL_ERRORS_SYMBOL = /* @__PURE__ */ Symbol();
function graphQLResultHasProtocolErrors(result) {
  if ("extensions" in result) {
    return CombinedProtocolErrors.is(result.extensions[PROTOCOL_ERRORS_SYMBOL]);
  }
  return false;
}
function toErrorLike(error) {
  if (isErrorLike(error)) {
    return error;
  }
  if (typeof error === "string") {
    return new Error(error, { cause: error });
  }
  return new UnconventionalError(error);
}

// node_modules/@apollo/client/core/networkStatus.js
var NetworkStatus;
(function(NetworkStatus2) {
  NetworkStatus2[NetworkStatus2["loading"] = 1] = "loading";
  NetworkStatus2[NetworkStatus2["setVariables"] = 2] = "setVariables";
  NetworkStatus2[NetworkStatus2["fetchMore"] = 3] = "fetchMore";
  NetworkStatus2[NetworkStatus2["refetch"] = 4] = "refetch";
  NetworkStatus2[NetworkStatus2["poll"] = 6] = "poll";
  NetworkStatus2[NetworkStatus2["ready"] = 7] = "ready";
  NetworkStatus2[NetworkStatus2["error"] = 8] = "error";
  NetworkStatus2[NetworkStatus2["streaming"] = 9] = "streaming";
})(NetworkStatus || (NetworkStatus = {}));

// node_modules/@apollo/client/core/ObservableQuery.js
var { assign, hasOwnProperty: hasOwnProperty5 } = Object;
var uninitialized = {
  loading: true,
  networkStatus: NetworkStatus.loading,
  data: void 0,
  dataState: "empty",
  partial: true
};
var empty = {
  loading: false,
  networkStatus: NetworkStatus.ready,
  data: void 0,
  dataState: "empty",
  partial: true
};
var ObservableQuery = class {
  options;
  queryName;
  variablesUnknown = false;
  /**
  * @internal will be read and written from `QueryInfo`
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  _lastWrite;
  // The `query` computed property will always reflect the document transformed
  // by the last run query. `this.options.query` will always reflect the raw
  // untransformed query to ensure document transforms with runtime conditionals
  // are run on the original document.
  get query() {
    return this.lastQuery;
  }
  /**
   * An object containing the variables that were provided for the query.
   */
  get variables() {
    return this.options.variables;
  }
  unsubscribeFromCache;
  input;
  subject;
  isTornDown;
  queryManager;
  subscriptions = /* @__PURE__ */ new Set();
  /**
   * If an `ObservableQuery` is created with a `network-only` fetch policy,
   * it should actually start receiving cache updates, but not before it has
   * received the first result from the network.
   */
  waitForNetworkResult;
  lastQuery;
  linkSubscription;
  pollingInfo;
  get networkStatus() {
    return this.subject.getValue().result.networkStatus;
  }
  get cache() {
    return this.queryManager.cache;
  }
  constructor({ queryManager, options, transformedQuery = queryManager.transform(options.query) }) {
    this.queryManager = queryManager;
    this.waitForNetworkResult = options.fetchPolicy === "network-only";
    this.isTornDown = false;
    this.subscribeToMore = this.subscribeToMore.bind(this);
    this.maskResult = this.maskResult.bind(this);
    const { watchQuery: { fetchPolicy: defaultFetchPolicy = "cache-first" } = {} } = queryManager.defaultOptions;
    const {
      fetchPolicy = defaultFetchPolicy,
      // Make sure we don't store "standby" as the initialFetchPolicy.
      initialFetchPolicy = fetchPolicy === "standby" ? defaultFetchPolicy : fetchPolicy
    } = options;
    if (options[variablesUnknownSymbol]) {
      invariant3(fetchPolicy === "standby", 80);
      this.variablesUnknown = true;
    }
    this.lastQuery = transformedQuery;
    this.options = __spreadProps(__spreadValues({}, options), {
      // Remember the initial options.fetchPolicy so we can revert back to this
      // policy when variables change. This information can also be specified
      // (or overridden) by providing options.initialFetchPolicy explicitly.
      initialFetchPolicy,
      // This ensures this.options.fetchPolicy always has a string value, in
      // case options.fetchPolicy was not provided.
      fetchPolicy,
      variables: this.getVariablesWithDefaults(options.variables)
    });
    this.initializeObservablesQueue();
    this["@@observable"] = () => this;
    if (Symbol.observable) {
      this[Symbol.observable] = () => this;
    }
    const opDef = getOperationDefinition(this.query);
    this.queryName = opDef && opDef.name && opDef.name.value;
  }
  initializeObservablesQueue() {
    this.subject = new BehaviorSubject({
      query: this.query,
      variables: this.variables,
      result: uninitialized,
      meta: {}
    });
    const observable = this.subject.pipe(tap({
      subscribe: () => {
        if (!this.subject.observed) {
          this.reobserve();
          setTimeout(() => this.updatePolling());
        }
      },
      unsubscribe: () => {
        if (!this.subject.observed) {
          this.tearDownQuery();
        }
      }
    }), filterMap(({ query, variables, result: current, meta }, context) => {
      const { shouldEmit } = meta;
      if (current === uninitialized) {
        context.previous = void 0;
        context.previousVariables = void 0;
      }
      if (this.options.fetchPolicy === "standby" || shouldEmit === 2)
        return;
      if (shouldEmit === 1)
        return emit();
      const { previous, previousVariables } = context;
      if (previous) {
        const documentInfo = this.queryManager.getDocumentInfo(query);
        const dataMasking = this.queryManager.dataMasking;
        const maskedQuery = dataMasking ? documentInfo.nonReactiveQuery : query;
        const resultIsEqual = dataMasking || documentInfo.hasNonreactiveDirective ? equalByQuery(maskedQuery, previous, current, variables) : equal(previous, current);
        if (resultIsEqual && equal(previousVariables, variables)) {
          return;
        }
      }
      if (shouldEmit === 3 && (!this.options.notifyOnNetworkStatusChange || equal(previous, current))) {
        return;
      }
      return emit();
      function emit() {
        context.previous = current;
        context.previousVariables = variables;
        return current;
      }
    }, () => ({})));
    this.pipe = observable.pipe.bind(observable);
    this.subscribe = observable.subscribe.bind(observable);
    this.input = new Subject();
    this.input.complete = () => {
    };
    this.input.pipe(this.operator).subscribe(this.subject);
  }
  // We can't use Observable['subscribe'] here as the type as it conflicts with
  // the ability to infer T from Subscribable<T>. This limits the surface area
  // to the non-deprecated signature which works properly with type inference.
  /**
   * Subscribes to the `ObservableQuery`.
   * @param observerOrNext - Either an RxJS `Observer` with some or all callback methods,
   * or the `next` handler that is called for each value emitted from the subscribed Observable.
   * @returns A subscription reference to the registered handlers.
   */
  subscribe;
  /**
   * Used to stitch together functional operators into a chain.
   *
   * @example
   *
   * ```ts
   * import { filter, map } from 'rxjs';
   *
   * observableQuery
   *   .pipe(
   *     filter(...),
   *     map(...),
   *   )
   *   .subscribe(x => console.log(x));
   * ```
   *
   * @returns The Observable result of all the operators having been called
   * in the order they were passed in.
   */
  pipe;
  [Symbol.observable];
  ["@@observable"];
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  getCacheDiff({ optimistic = true } = {}) {
    return this.cache.diff({
      query: this.query,
      variables: this.variables,
      returnPartialData: true,
      optimistic
    });
  }
  getInitialResult(initialFetchPolicy) {
    let fetchPolicy = initialFetchPolicy || this.options.fetchPolicy;
    if (this.queryManager.prioritizeCacheValues && (fetchPolicy === "network-only" || fetchPolicy === "cache-and-network")) {
      fetchPolicy = "cache-first";
    }
    const cacheResult = () => {
      const diff = this.getCacheDiff();
      const data = this.options.returnPartialData || diff.complete ? diff.result ?? void 0 : void 0;
      return this.maskResult({
        data,
        dataState: diff.complete ? "complete" : data === void 0 ? "empty" : "partial",
        loading: !diff.complete,
        networkStatus: diff.complete ? NetworkStatus.ready : NetworkStatus.loading,
        partial: !diff.complete
      });
    };
    switch (fetchPolicy) {
      case "cache-only": {
        return __spreadProps(__spreadValues({}, cacheResult()), {
          loading: false,
          networkStatus: NetworkStatus.ready
        });
      }
      case "cache-first":
        return cacheResult();
      case "cache-and-network":
        return __spreadProps(__spreadValues({}, cacheResult()), {
          loading: true,
          networkStatus: NetworkStatus.loading
        });
      case "standby":
        return empty;
      default:
        return uninitialized;
    }
  }
  resubscribeCache() {
    const { variables, fetchPolicy } = this.options;
    const query = this.query;
    const shouldUnsubscribe = fetchPolicy === "standby" || fetchPolicy === "no-cache" || this.waitForNetworkResult;
    const shouldResubscribe = !isEqualQuery({ query, variables }, this.unsubscribeFromCache) && !this.waitForNetworkResult;
    if (shouldUnsubscribe || shouldResubscribe) {
      this.unsubscribeFromCache?.();
    }
    if (shouldUnsubscribe || !shouldResubscribe) {
      return;
    }
    const watch = {
      query,
      variables,
      optimistic: true,
      watcher: this,
      callback: (diff) => {
        const info = this.queryManager.getDocumentInfo(query);
        if (info.hasClientExports || info.hasForcedResolvers) {
          watch.lastDiff = void 0;
        }
        if (watch.lastOwnDiff === diff) {
          return;
        }
        const { result: previousResult } = this.subject.getValue();
        if (!diff.complete && // If we are trying to deliver an incomplete cache result, we avoid
        // reporting it if the query has errored, otherwise we let the broadcast try
        // and repair the partial result by refetching the query. This check avoids
        // a situation where a query that errors and another succeeds with
        // overlapping data does not report the partial data result to the errored
        // query.
        //
        // See https://github.com/apollographql/apollo-client/issues/11400 for more
        // information on this issue.
        (previousResult.error || // Prevent to schedule a notify directly after the `ObservableQuery`
        // has been `reset` (which will set the `previousResult` to `uninitialized` or `empty`)
        // as in those cases, `resetCache` will manually call `refetch` with more intentional timing.
        previousResult === uninitialized || previousResult === empty)) {
          return;
        }
        if (!equal(previousResult.data, diff.result)) {
          this.scheduleNotify();
        }
      }
    };
    const cancelWatch = this.cache.watch(watch);
    this.unsubscribeFromCache = Object.assign(() => {
      this.unsubscribeFromCache = void 0;
      cancelWatch();
    }, { query, variables });
  }
  stableLastResult;
  getCurrentResult() {
    const { result: current } = this.subject.getValue();
    let value = (
      // if the `current` result is in an error state, we will always return that
      // error state, even if we have no observers
      current.networkStatus === NetworkStatus.error || // if we have observers, we are watching the cache and
      // this.subject.getValue() will always be up to date
      this.hasObservers() || // if we are using a `no-cache` fetch policy in which case this
      // `ObservableQuery` cannot have been updated from the outside - in
      // that case, we prefer to keep the current value
      this.options.fetchPolicy === "no-cache" ? current : this.getInitialResult()
    );
    if (value === uninitialized) {
      value = this.getInitialResult();
    }
    if (!equal(this.stableLastResult, value)) {
      this.stableLastResult = value;
    }
    return this.stableLastResult;
  }
  /**
   * Update the variables of this observable query, and fetch the new results.
   * This method should be preferred over `setVariables` in most use cases.
   *
   * Returns a `ResultPromise` with an additional `.retain()` method. Calling
   * `.retain()` keeps the network operation running even if the `ObservableQuery`
   * no longer requires the result.
   *
   * Note: `refetch()` guarantees that a value will be emitted from the
   * observable, even if the result is deep equal to the previous value.
   *
   * @param variables - The new set of variables. If there are missing variables,
   * the previous values of those variables will be used.
   */
  refetch(variables) {
    const { fetchPolicy } = this.options;
    const reobserveOptions = {
      // Always disable polling for refetches.
      pollInterval: 0
    };
    if (fetchPolicy === "no-cache") {
      reobserveOptions.fetchPolicy = "no-cache";
    } else {
      reobserveOptions.fetchPolicy = "network-only";
    }
    if (__DEV__ && variables && hasOwnProperty5.call(variables, "variables")) {
      const queryDef = getQueryDefinition(this.query);
      const vars = queryDef.variableDefinitions;
      if (!vars || !vars.some((v) => v.variable.name.value === "variables")) {
        __DEV__ && invariant3.warn(81, variables, queryDef.name?.value || queryDef);
      }
    }
    if (variables && !equal(this.variables, variables)) {
      reobserveOptions.variables = this.options.variables = this.getVariablesWithDefaults(__spreadValues(__spreadValues({}, this.variables), variables));
    }
    this._lastWrite = void 0;
    return this._reobserve(reobserveOptions, {
      newNetworkStatus: NetworkStatus.refetch
    });
  }
  fetchMore({ query, variables, context, errorPolicy, updateQuery }) {
    invariant3(
      this.options.fetchPolicy !== "cache-only",
      82,
      getOperationName(this.query, "(anonymous)")
    );
    const combinedOptions = __spreadProps(__spreadValues({}, compact(this.options, { errorPolicy: "none" }, {
      query,
      context,
      errorPolicy
    })), {
      variables: query ? variables : __spreadValues(__spreadValues({}, this.variables), variables),
      // The fetchMore request goes immediately to the network and does
      // not automatically write its result to the cache (hence no-cache
      // instead of network-only), because we allow the caller of
      // fetchMore to provide an updateQuery callback that determines how
      // the data gets written to the cache.
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange
    });
    combinedOptions.query = this.transformDocument(combinedOptions.query);
    this.lastQuery = query ? this.transformDocument(this.options.query) : combinedOptions.query;
    let wasUpdated = false;
    const isCached = this.options.fetchPolicy !== "no-cache";
    if (!isCached) {
      invariant3(updateQuery, 83);
    }
    const { finalize: finalize2, pushNotification } = this.pushOperation(NetworkStatus.fetchMore);
    pushNotification({
      source: "newNetworkStatus",
      kind: "N",
      value: {}
    }, {
      shouldEmit: 3
      /* EmitBehavior.networkStatusChange */
    });
    const { promise, operator } = getTrackingOperatorPromise();
    const { observable } = this.queryManager.fetchObservableWithInfo(combinedOptions, { networkStatus: NetworkStatus.fetchMore, exposeExtensions: true });
    const subscription = observable.pipe(operator, filter((notification) => notification.kind === "N" && notification.source === "network")).subscribe({
      next: (notification) => {
        wasUpdated = false;
        const fetchMoreResult = notification.value;
        const extensions = fetchMoreResult[extensionsSymbol];
        if (isNetworkRequestSettled(notification.value.networkStatus)) {
          finalize2();
        }
        if (isCached) {
          const lastDiff = this.getCacheDiff();
          this.cache.batch({
            update: (cache) => {
              if (updateQuery) {
                cache.updateQuery({
                  query: this.query,
                  variables: this.variables,
                  returnPartialData: true,
                  optimistic: false,
                  extensions
                }, (previous) => updateQuery(previous, {
                  fetchMoreResult: fetchMoreResult.data,
                  variables: combinedOptions.variables
                }));
              } else {
                cache.writeQuery({
                  query: combinedOptions.query,
                  variables: combinedOptions.variables,
                  data: fetchMoreResult.data,
                  extensions
                });
              }
            },
            onWatchUpdated: (watch, diff) => {
              if (watch.watcher === this && !equal(diff.result, lastDiff.result)) {
                wasUpdated = true;
                const lastResult = this.getCurrentResult();
                if (isNetworkRequestInFlight(fetchMoreResult.networkStatus)) {
                  pushNotification({
                    kind: "N",
                    source: "network",
                    value: __spreadProps(__spreadValues({}, lastResult), {
                      networkStatus: fetchMoreResult.networkStatus === NetworkStatus.error ? NetworkStatus.ready : fetchMoreResult.networkStatus,
                      // will be overwritten anyways, just here for types sake
                      loading: false,
                      data: diff.result,
                      dataState: fetchMoreResult.dataState === "streaming" ? "streaming" : "complete"
                    })
                  });
                }
              }
            }
          });
        } else {
          const lastResult = this.getCurrentResult();
          const data = updateQuery(lastResult.data, {
            fetchMoreResult: fetchMoreResult.data,
            variables: combinedOptions.variables
          });
          pushNotification({
            kind: "N",
            value: __spreadProps(__spreadValues({}, lastResult), {
              networkStatus: NetworkStatus.ready,
              // will be overwritten anyways, just here for types sake
              loading: false,
              data,
              dataState: lastResult.dataState === "streaming" ? "streaming" : "complete"
            }),
            source: "network"
          });
        }
      }
    });
    return preventUnhandledRejection(promise.then((result) => toQueryResult(this.maskResult(result))).finally(() => {
      subscription.unsubscribe();
      finalize2();
      if (isCached && !wasUpdated) {
        const lastResult = this.getCurrentResult();
        if (lastResult.dataState === "streaming") {
          pushNotification({
            kind: "N",
            source: "network",
            value: __spreadProps(__spreadValues({}, lastResult), {
              dataState: "complete",
              networkStatus: NetworkStatus.ready
            })
          });
        } else {
          pushNotification({
            kind: "N",
            source: "newNetworkStatus",
            value: {}
          }, {
            shouldEmit: 1
            /* EmitBehavior.force */
          });
        }
      }
    }));
  }
  // XXX the subscription variables are separate from the query variables.
  // if you want to update subscription variables, right now you have to do that separately,
  // and you can only do it by stopping the subscription and then subscribing again with new variables.
  /**
   * A function that enables you to execute a [subscription](https://www.apollographql.com/docs/react/data/subscriptions/), usually to subscribe to specific fields that were included in the query.
   *
   * This function returns _another_ function that you can call to terminate the subscription.
   */
  subscribeToMore(options) {
    const subscription = this.queryManager.startGraphQLSubscription({
      query: options.document,
      variables: options.variables,
      context: options.context
    }).subscribe({
      next: (subscriptionData) => {
        const { updateQuery, onError } = options;
        const { error } = subscriptionData;
        if (error) {
          if (onError) {
            onError(error);
          } else {
            invariant3.error(84, error);
          }
          return;
        }
        if (updateQuery) {
          this.updateQuery((previous, updateOptions) => updateQuery(previous, __spreadValues({
            subscriptionData
          }, updateOptions)));
        }
      }
    });
    this.subscriptions.add(subscription);
    return () => {
      if (this.subscriptions.delete(subscription)) {
        subscription.unsubscribe();
      }
    };
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  applyOptions(newOptions) {
    const mergedOptions = compact(this.options, newOptions || {});
    assign(this.options, mergedOptions);
    this.updatePolling();
  }
  /**
   * Update the variables of this observable query, and fetch the new results
   * if they've changed. Most users should prefer `refetch` instead of
   * `setVariables` in order to to be properly notified of results even when
   * they come from the cache.
   *
   * Note: `setVariables()` guarantees that a value will be emitted from the
   * observable, even if the result is deeply equal to the previous value.
   *
   * Note: the promise will resolve with the last emitted result
   * when either the variables match the current variables or there
   * are no subscribers to the query.
   *
   * @param variables - The new set of variables. If there are missing variables,
   * the previous values of those variables will be used.
   */
  async setVariables(variables) {
    variables = this.getVariablesWithDefaults(variables);
    if (equal(this.variables, variables)) {
      return toQueryResult(this.getCurrentResult());
    }
    this.options.variables = variables;
    if (!this.hasObservers()) {
      return toQueryResult(this.getCurrentResult());
    }
    return this._reobserve({
      // Reset options.fetchPolicy to its original value.
      fetchPolicy: this.options.initialFetchPolicy,
      variables
    }, { newNetworkStatus: NetworkStatus.setVariables });
  }
  /**
   * A function that enables you to update the query's cached result without executing a followup GraphQL operation.
   *
   * See [using updateQuery and updateFragment](https://www.apollographql.com/docs/react/caching/cache-interaction/#using-updatequery-and-updatefragment) for additional information.
   */
  updateQuery(mapFn) {
    const { queryManager } = this;
    const { result, complete } = this.getCacheDiff({ optimistic: false });
    const newResult = mapFn(result, {
      variables: this.variables,
      complete: !!complete,
      previousData: result
    });
    if (newResult) {
      this.cache.writeQuery({
        query: this.options.query,
        data: newResult,
        variables: this.variables
      });
      queryManager.broadcastQueries();
    }
  }
  /**
   * A function that instructs the query to begin re-executing at a specified interval (in milliseconds).
   */
  startPolling(pollInterval) {
    this.options.pollInterval = pollInterval;
    this.updatePolling();
  }
  /**
   * A function that instructs the query to stop polling after a previous call to `startPolling`.
   */
  stopPolling() {
    this.options.pollInterval = 0;
    this.updatePolling();
  }
  // Update options.fetchPolicy according to options.nextFetchPolicy.
  applyNextFetchPolicy(reason, options) {
    if (options.nextFetchPolicy) {
      const { fetchPolicy = "cache-first", initialFetchPolicy = fetchPolicy } = options;
      if (fetchPolicy === "standby") {
      } else if (typeof options.nextFetchPolicy === "function") {
        options.fetchPolicy = options.nextFetchPolicy.call(options, fetchPolicy, { reason, options, observable: this, initialFetchPolicy });
      } else if (reason === "variables-changed") {
        options.fetchPolicy = initialFetchPolicy;
      } else {
        options.fetchPolicy = options.nextFetchPolicy;
      }
    }
    return options.fetchPolicy;
  }
  fetch(options, networkStatus, fetchQuery, operator) {
    const initialFetchPolicy = this.options.fetchPolicy;
    options.context ??= {};
    let synchronouslyEmitted = false;
    const onCacheHit = () => {
      synchronouslyEmitted = true;
    };
    const fetchQueryOperator = (
      // we cannot use `tap` here, since it allows only for a "before subscription"
      // hook with `subscribe` and we care for "directly before and after subscription"
      (source) => new Observable((subscriber) => {
        try {
          return source.subscribe({
            next(value) {
              synchronouslyEmitted = true;
              subscriber.next(value);
            },
            error: (error) => subscriber.error(error),
            complete: () => subscriber.complete()
          });
        } finally {
          if (!synchronouslyEmitted) {
            operation.override = networkStatus;
            this.input.next({
              kind: "N",
              source: "newNetworkStatus",
              value: {
                resetError: true
              },
              query,
              variables,
              meta: {
                shouldEmit: 3,
                /*
                 * The moment this notification is emitted, `nextFetchPolicy`
                 * might already have switched from a `network-only` to a
                 * `cache-something` policy, so we want to ensure that the
                 * loading state emit doesn't accidentally read from the cache
                 * in those cases.
                 */
                fetchPolicy: initialFetchPolicy
              }
            });
          }
        }
      })
    );
    let { observable, fromLink } = this.queryManager.fetchObservableWithInfo(options, {
      networkStatus,
      query: fetchQuery,
      onCacheHit,
      fetchQueryOperator,
      observableQuery: this
    });
    const { query, variables } = this;
    const operation = {
      abort: () => {
        subscription.unsubscribe();
      },
      query,
      variables
    };
    this.activeOperations.add(operation);
    let forceFirstValueEmit = networkStatus == NetworkStatus.refetch || networkStatus == NetworkStatus.setVariables;
    observable = observable.pipe(operator, share());
    const subscription = observable.pipe(tap({
      next: (notification) => {
        if (notification.source === "newNetworkStatus" || notification.kind === "N" && notification.value.loading) {
          operation.override = networkStatus;
        } else {
          delete operation.override;
        }
      },
      finalize: () => this.activeOperations.delete(operation)
    })).subscribe({
      next: (value) => {
        const meta = {};
        if (forceFirstValueEmit && value.kind === "N" && "loading" in value.value && !value.value.loading) {
          forceFirstValueEmit = false;
          meta.shouldEmit = 1;
        }
        this.input.next(__spreadProps(__spreadValues({}, value), { query, variables, meta }));
      }
    });
    return { fromLink, subscription, observable };
  }
  // Turns polling on or off based on this.options.pollInterval.
  didWarnCacheOnlyPolling = false;
  updatePolling() {
    if (this.queryManager.ssrMode) {
      return;
    }
    const { pollingInfo, options: { fetchPolicy, pollInterval } } = this;
    if (!pollInterval || !this.hasObservers() || fetchPolicy === "cache-only") {
      if (__DEV__) {
        if (!this.didWarnCacheOnlyPolling && pollInterval && fetchPolicy === "cache-only") {
          __DEV__ && invariant3.warn(85, getOperationName(this.query, "(anonymous)"));
          this.didWarnCacheOnlyPolling = true;
        }
      }
      this.cancelPolling();
      return;
    }
    if (pollingInfo?.interval === pollInterval) {
      return;
    }
    const info = pollingInfo || (this.pollingInfo = {});
    info.interval = pollInterval;
    const maybeFetch = () => {
      if (this.pollingInfo) {
        if (!isNetworkRequestInFlight(this.networkStatus) && !this.options.skipPollAttempt?.()) {
          this._reobserve({
            // Most fetchPolicy options don't make sense to use in a polling context, as
            // users wouldn't want to be polling the cache directly. However, network-only and
            // no-cache are both useful for when the user wants to control whether or not the
            // polled results are written to the cache.
            fetchPolicy: this.options.initialFetchPolicy === "no-cache" ? "no-cache" : "network-only"
          }, {
            newNetworkStatus: NetworkStatus.poll
          }).then(poll, poll);
        } else {
          poll();
        }
      }
    };
    const poll = () => {
      const info2 = this.pollingInfo;
      if (info2) {
        clearTimeout(info2.timeout);
        info2.timeout = setTimeout(maybeFetch, info2.interval);
      }
    };
    poll();
  }
  // This differs from stopPolling in that it does not set pollInterval to 0
  cancelPolling() {
    if (this.pollingInfo) {
      clearTimeout(this.pollingInfo.timeout);
      delete this.pollingInfo;
    }
  }
  /**
   * Reevaluate the query, optionally against new options. New options will be
   * merged with the current options when given.
   *
   * Note: `variables` can be reset back to their defaults (typically empty) by calling `reobserve` with
   * `variables: undefined`.
   */
  reobserve(newOptions) {
    return this._reobserve(newOptions);
  }
  _reobserve(newOptions, internalOptions) {
    this.isTornDown = false;
    let { newNetworkStatus } = internalOptions || {};
    this.queryManager.obsQueries.add(this);
    const useDisposableObservable = (
      // Refetching uses a disposable Observable to allow refetches using different
      // options, without permanently altering the options of the
      // original ObservableQuery.
      newNetworkStatus === NetworkStatus.refetch || // Polling uses a disposable Observable so the polling options (which force
      // fetchPolicy to be "network-only" or "no-cache") won't override the original options.
      newNetworkStatus === NetworkStatus.poll
    );
    const oldVariables = this.variables;
    const oldFetchPolicy = this.options.fetchPolicy;
    const mergedOptions = compact(this.options, newOptions || {});
    this.variablesUnknown &&= mergedOptions.fetchPolicy === "standby";
    const options = useDisposableObservable ? (
      // Disposable Observable fetches receive a shallow copy of this.options
      // (merged with newOptions), leaving this.options unmodified.
      mergedOptions
    ) : assign(this.options, mergedOptions);
    const query = this.transformDocument(options.query);
    this.lastQuery = query;
    if (newOptions && "variables" in newOptions) {
      options.variables = this.getVariablesWithDefaults(newOptions.variables);
    }
    if (!useDisposableObservable) {
      this.updatePolling();
      if (newOptions && newOptions.variables && !equal(newOptions.variables, oldVariables) && // Don't mess with the fetchPolicy if it's currently "standby".
      options.fetchPolicy !== "standby" && // If we're changing the fetchPolicy anyway, don't try to change it here
      // using applyNextFetchPolicy. The explicit options.fetchPolicy wins.
      (options.fetchPolicy === oldFetchPolicy || // A `nextFetchPolicy` function has even higher priority, though,
      // so in that case `applyNextFetchPolicy` must be called.
      typeof options.nextFetchPolicy === "function")) {
        this.applyNextFetchPolicy("variables-changed", options);
        if (newNetworkStatus === void 0) {
          newNetworkStatus = NetworkStatus.setVariables;
        }
      }
    }
    const oldNetworkStatus = this.networkStatus;
    if (!newNetworkStatus) {
      newNetworkStatus = NetworkStatus.loading;
      if (oldNetworkStatus !== NetworkStatus.loading && newOptions?.variables && !equal(newOptions.variables, oldVariables)) {
        newNetworkStatus = NetworkStatus.setVariables;
      }
      if (options.fetchPolicy === "standby") {
        newNetworkStatus = NetworkStatus.ready;
      }
    }
    if (options.fetchPolicy === "standby") {
      this.cancelPolling();
    }
    this.resubscribeCache();
    const { promise, operator: promiseOperator } = getTrackingOperatorPromise(
      // This default value should only be used when using a `fetchPolicy` of
      // `standby` since that fetch policy completes without emitting a
      // result. Since we are converting this to a QueryResult type, we
      // omit the extra fields from ApolloQueryResult in the default value.
      options.fetchPolicy === "standby" ? { data: void 0 } : void 0
    );
    const { subscription, observable, fromLink } = this.fetch(options, newNetworkStatus, query, promiseOperator);
    if (!useDisposableObservable && (fromLink || !this.linkSubscription)) {
      if (this.linkSubscription) {
        this.linkSubscription.unsubscribe();
      }
      this.linkSubscription = subscription;
    }
    const ret = Object.assign(preventUnhandledRejection(promise.then((result) => toQueryResult(this.maskResult(result))).finally(() => {
      if (!this.hasObservers() && this.activeOperations.size === 0) {
        this.tearDownQuery();
      }
    })), {
      retain: () => {
        const subscription2 = observable.subscribe({});
        const unsubscribe = () => subscription2.unsubscribe();
        promise.then(unsubscribe, unsubscribe);
        return ret;
      }
    });
    return ret;
  }
  hasObservers() {
    return this.subject.observed;
  }
  /**
   * Tears down the `ObservableQuery` and stops all active operations by sending a `complete` notification.
   */
  stop() {
    this.subject.complete();
    this.initializeObservablesQueue();
    this.tearDownQuery();
  }
  tearDownQuery() {
    if (this.isTornDown)
      return;
    this.resetNotifications();
    this.unsubscribeFromCache?.();
    if (this.linkSubscription) {
      this.linkSubscription.unsubscribe();
      delete this.linkSubscription;
    }
    this.stopPolling();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();
    this.queryManager.obsQueries.delete(this);
    this.isTornDown = true;
    this.abortActiveOperations();
    this._lastWrite = void 0;
  }
  transformDocument(document) {
    return this.queryManager.transform(document);
  }
  maskResult(result) {
    const masked = this.queryManager.maskOperation({
      document: this.query,
      data: result.data,
      fetchPolicy: this.options.fetchPolicy,
      cause: this
    });
    return masked === result.data ? result : __spreadProps(__spreadValues({}, result), { data: masked });
  }
  dirty = false;
  notifyTimeout;
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  resetNotifications() {
    if (this.notifyTimeout) {
      clearTimeout(this.notifyTimeout);
      this.notifyTimeout = void 0;
    }
    this.dirty = false;
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  scheduleNotify() {
    if (this.dirty)
      return;
    this.dirty = true;
    if (!this.notifyTimeout) {
      this.notifyTimeout = setTimeout(() => this.notify(true), 0);
    }
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  notify(scheduled = false) {
    if (!scheduled) {
      const info = this.queryManager.getDocumentInfo(this.query);
      if (info.hasClientExports || info.hasForcedResolvers) {
        return;
      }
    }
    const { dirty } = this;
    this.resetNotifications();
    if (dirty && (this.options.fetchPolicy === "cache-only" || this.options.fetchPolicy === "cache-and-network" || !this.activeOperations.size)) {
      const diff = this.getCacheDiff();
      if (
        // `fromOptimisticTransaction` is not available through the `cache.diff`
        // code path, so we need to check it this way
        equal(diff.result, this.getCacheDiff({ optimistic: false }).result)
      ) {
        this.reobserveCacheFirst();
      } else {
        this.input.next({
          kind: "N",
          value: {
            data: diff.result,
            dataState: diff.complete ? "complete" : diff.result ? "partial" : "empty",
            networkStatus: NetworkStatus.ready,
            loading: false,
            error: void 0,
            partial: !diff.complete
          },
          source: "cache",
          query: this.query,
          variables: this.variables,
          meta: {}
        });
      }
    }
  }
  activeOperations = /* @__PURE__ */ new Set();
  pushOperation(networkStatus) {
    let aborted = false;
    const { query, variables } = this;
    const finalize2 = () => {
      this.activeOperations.delete(operation);
    };
    const operation = {
      override: networkStatus,
      abort: () => {
        aborted = true;
        finalize2();
      },
      query,
      variables
    };
    this.activeOperations.add(operation);
    return {
      finalize: finalize2,
      pushNotification: (notification, additionalMeta) => {
        if (!aborted) {
          this.input.next(__spreadProps(__spreadValues({}, notification), {
            query,
            variables,
            meta: __spreadValues({}, additionalMeta)
          }));
        }
      }
    };
  }
  calculateNetworkStatus(baseNetworkStatus) {
    if (baseNetworkStatus === NetworkStatus.streaming) {
      return baseNetworkStatus;
    }
    const operation = Array.from(this.activeOperations.values()).reverse().find((operation2) => isEqualQuery(operation2, this) && operation2.override !== void 0);
    return operation?.override ?? baseNetworkStatus;
  }
  abortActiveOperations() {
    this.activeOperations.forEach((operation) => operation.abort());
  }
  /**
  * @internal
  * Called from `clearStore`.
  *
  * - resets the query to its initial state
  * - cancels all active operations and their subscriptions
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  reset() {
    const resetToEmpty = this.options.fetchPolicy === "cache-only";
    this.setResult(resetToEmpty ? empty : uninitialized, {
      shouldEmit: resetToEmpty ? 1 : 2
    });
    this.abortActiveOperations();
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  setResult(result, additionalMeta) {
    this.input.next({
      source: "setResult",
      kind: "N",
      value: result,
      query: this.query,
      variables: this.variables,
      meta: __spreadValues({}, additionalMeta)
    });
  }
  operator = filterMap((notification) => {
    const { query, variables, meta } = notification;
    if (notification.source === "setResult") {
      return { query, variables, result: notification.value, meta };
    }
    if (notification.kind === "C" || !isEqualQuery(notification, this)) {
      return;
    }
    let result;
    const previous = this.subject.getValue();
    if (notification.source === "cache") {
      result = notification.value;
      if (result.networkStatus === NetworkStatus.ready && result.partial && (!this.options.returnPartialData || previous.result.networkStatus === NetworkStatus.error) && this.options.fetchPolicy !== "cache-only") {
        return;
      }
    } else if (notification.source === "network") {
      if (this.waitForNetworkResult) {
        this.waitForNetworkResult = false;
        this.resubscribeCache();
      }
      result = notification.kind === "E" ? __spreadProps(__spreadValues({}, isEqualQuery(previous, notification) ? previous.result : { data: void 0, dataState: "empty", partial: true }), {
        error: notification.error,
        networkStatus: NetworkStatus.error,
        loading: false
      }) : notification.value;
      if (notification.kind === "E" && result.dataState === "streaming") {
        result.dataState = "complete";
      }
      if (result.error) {
        meta.shouldEmit = 1;
      }
    } else if (notification.source === "newNetworkStatus") {
      const baseResult = isEqualQuery(previous, notification) ? previous.result : this.getInitialResult(meta.fetchPolicy);
      const { resetError } = notification.value;
      const error = resetError ? void 0 : baseResult.error;
      const networkStatus = error ? NetworkStatus.error : NetworkStatus.ready;
      result = __spreadProps(__spreadValues({}, baseResult), {
        error,
        networkStatus
      });
    }
    invariant3(result);
    if (!result.error)
      delete result.error;
    result.networkStatus = this.calculateNetworkStatus(result.networkStatus);
    result.loading = isNetworkRequestInFlight(result.networkStatus);
    result = this.maskResult(result);
    return { query, variables, result, meta };
  });
  // Reobserve with fetchPolicy effectively set to "cache-first", triggering
  // delivery of any new data from the cache, possibly falling back to the network
  // if any cache data are missing. This allows _complete_ cache results to be
  // delivered without also kicking off unnecessary network requests when
  // this.options.fetchPolicy is "cache-and-network" or "network-only". When
  // this.options.fetchPolicy is any other policy ("cache-first", "cache-only",
  // "standby", or "no-cache"), we call this.reobserve() as usual.
  reobserveCacheFirst() {
    const { fetchPolicy, nextFetchPolicy } = this.options;
    if (fetchPolicy === "cache-and-network" || fetchPolicy === "network-only") {
      this.reobserve({
        fetchPolicy: "cache-first",
        // Use a temporary nextFetchPolicy function that replaces itself with the
        // previous nextFetchPolicy value and returns the original fetchPolicy.
        nextFetchPolicy(currentFetchPolicy, context) {
          this.nextFetchPolicy = nextFetchPolicy;
          if (typeof this.nextFetchPolicy === "function") {
            return this.nextFetchPolicy(currentFetchPolicy, context);
          }
          return fetchPolicy;
        }
      });
    } else {
      this.reobserve();
    }
  }
  getVariablesWithDefaults(variables) {
    return this.queryManager.getVariables(this.query, variables);
  }
};
function logMissingFieldErrors(missing) {
  if (__DEV__ && missing) {
    __DEV__ && invariant3.debug(86, missing);
  }
}
function isEqualQuery(a, b) {
  return !!(a && b && a.query === b.query && equal(a.variables, b.variables));
}
function getTrackingOperatorPromise(defaultValue) {
  let lastValue = defaultValue, resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const operator = tap({
    next(value) {
      if (value.kind === "E") {
        return reject(value.error);
      }
      if (value.kind === "N" && value.source !== "newNetworkStatus" && !value.value.loading) {
        lastValue = value.value;
      }
    },
    finalize: () => {
      if (lastValue) {
        resolve(lastValue);
      } else {
        const message = "The operation was aborted.";
        const name = "AbortError";
        reject(typeof DOMException !== "undefined" ? new DOMException(message, name) : Object.assign(new Error(message), { name }));
      }
    }
  });
  return { promise, operator };
}

// node_modules/@apollo/client/core/QueryInfo.js
var IGNORE = {};
var destructiveMethodCounts = /* @__PURE__ */ new WeakMap();
function wrapDestructiveCacheMethod(cache, methodName) {
  const original = cache[methodName];
  if (typeof original === "function") {
    cache[methodName] = function() {
      destructiveMethodCounts.set(
        cache,
        // The %1e15 allows the count to wrap around to 0 safely every
        // quadrillion evictions, so there's no risk of overflow. To be
        // clear, this is more of a pedantic principle than something
        // that matters in any conceivable practical scenario.
        (destructiveMethodCounts.get(cache) + 1) % 1e15
      );
      return original.apply(this, arguments);
    };
  }
}
var queryInfoIds = /* @__PURE__ */ new WeakMap();
var QueryInfo = class {
  // TODO remove soon - this should be able to be handled by cancelling old operations before starting new ones
  lastRequestId = 1;
  cache;
  queryManager;
  id;
  observableQuery;
  incremental;
  constructor(queryManager, observableQuery) {
    const cache = this.cache = queryManager.cache;
    const id = (queryInfoIds.get(queryManager) || 0) + 1;
    queryInfoIds.set(queryManager, id);
    this.id = id + "";
    this.observableQuery = observableQuery;
    this.queryManager = queryManager;
    if (!destructiveMethodCounts.has(cache)) {
      destructiveMethodCounts.set(cache, 0);
      wrapDestructiveCacheMethod(cache, "evict");
      wrapDestructiveCacheMethod(cache, "modify");
      wrapDestructiveCacheMethod(cache, "reset");
    }
  }
  /**
  * @internal
  * For feud-preventing behaviour, `lastWrite` should be shared by all `QueryInfo` instances of an `ObservableQuery`.
  * In the case of a standalone `QueryInfo`, we will keep a local version.
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  _lastWrite;
  get lastWrite() {
    return (this.observableQuery || this)._lastWrite;
  }
  set lastWrite(value) {
    (this.observableQuery || this)._lastWrite = value;
  }
  resetLastWrite() {
    this.lastWrite = void 0;
  }
  shouldWrite(result, variables) {
    const { lastWrite } = this;
    return !(lastWrite && // If cache.evict has been called since the last time we wrote this
    // data into the cache, there's a chance writing this result into
    // the cache will repair what was evicted.
    lastWrite.dmCount === destructiveMethodCounts.get(this.cache) && equal(variables, lastWrite.variables) && equal(result.data, lastWrite.result.data) && // We have to compare these values because its possible the final chunk
    // emitted in the incremental result is just `hasNext: false`. This
    // ensures we trigger a cache write when we get `isLastChunk: true`.
    result.extensions?.[streamInfoSymbol] === lastWrite.result.extensions?.[streamInfoSymbol]);
  }
  get hasNext() {
    return this.incremental ? this.incremental.hasNext : false;
  }
  maybeHandleIncrementalResult(cacheData, incoming, query) {
    const { incrementalHandler } = this.queryManager;
    if (incrementalHandler.isIncrementalResult(incoming)) {
      this.incremental ||= incrementalHandler.startRequest({
        query
      });
      return this.incremental.handle(cacheData, incoming);
    }
    return incoming;
  }
  markQueryResult(incoming, { document: query, variables, errorPolicy, cacheWriteBehavior }) {
    const diffOptions = {
      query,
      variables,
      returnPartialData: true,
      optimistic: true
    };
    this.observableQuery?.["resetNotifications"]();
    const skipCache = cacheWriteBehavior === 0;
    const lastDiff = skipCache ? void 0 : this.cache.diff(diffOptions);
    let result = this.maybeHandleIncrementalResult(lastDiff?.result, incoming, query);
    if (skipCache) {
      return result;
    }
    if (shouldWriteResult(result, errorPolicy)) {
      this.cache.batch({
        onWatchUpdated: (watch, diff) => {
          if (watch.watcher === this.observableQuery) {
            watch.lastOwnDiff = diff;
          }
        },
        update: (cache) => {
          if (this.shouldWrite(result, variables)) {
            cache.writeQuery({
              query,
              data: result.data,
              variables,
              overwrite: cacheWriteBehavior === 1,
              extensions: result.extensions
            });
            this.lastWrite = {
              result,
              variables,
              dmCount: destructiveMethodCounts.get(this.cache)
            };
          } else {
            if (lastDiff && lastDiff.complete) {
              result = __spreadProps(__spreadValues({}, result), { data: lastDiff.result });
              return;
            }
          }
          const diff = cache.diff(diffOptions);
          if (diff.complete) {
            result = __spreadProps(__spreadValues({}, result), { data: diff.result });
          }
        }
      });
    } else {
      this.lastWrite = void 0;
    }
    return result;
  }
  markMutationResult(incoming, mutation, cache = this.cache) {
    const cacheWrites = [];
    const skipCache = mutation.cacheWriteBehavior === 0;
    let result = this.maybeHandleIncrementalResult(skipCache ? void 0 : cache.diff({
      id: "ROOT_MUTATION",
      // The cache complains if passed a mutation where it expects a
      // query, so we transform mutations and subscriptions to queries
      // (only once, thanks to this.transformCache).
      query: this.queryManager.getDocumentInfo(mutation.document).asQuery,
      variables: mutation.variables,
      optimistic: false,
      returnPartialData: true
    }).result, incoming, mutation.document);
    if (mutation.errorPolicy === "ignore") {
      result = __spreadProps(__spreadValues({}, result), { errors: [] });
    }
    if (graphQLResultHasError(result) && mutation.errorPolicy === "none") {
      return Promise.resolve(result);
    }
    const getResultWithDataState = () => __spreadProps(__spreadValues({}, result), {
      dataState: this.hasNext ? "streaming" : "complete"
    });
    if (!skipCache && shouldWriteResult(result, mutation.errorPolicy)) {
      cacheWrites.push({
        result: result.data,
        dataId: "ROOT_MUTATION",
        query: mutation.document,
        variables: mutation.variables,
        extensions: result.extensions
      });
      const { updateQueries } = mutation;
      if (updateQueries) {
        this.queryManager.getObservableQueries("all").forEach((observableQuery) => {
          const queryName = observableQuery && observableQuery.queryName;
          if (!queryName || !Object.hasOwnProperty.call(updateQueries, queryName)) {
            return;
          }
          const updater = updateQueries[queryName];
          const { query: document, variables } = observableQuery;
          const { result: currentQueryResult, complete } = observableQuery.getCacheDiff({ optimistic: false });
          if (complete && currentQueryResult) {
            const nextQueryResult = updater(currentQueryResult, {
              mutationResult: getResultWithDataState(),
              queryName: document && getOperationName(document) || void 0,
              queryVariables: variables
            });
            if (nextQueryResult) {
              cacheWrites.push({
                result: nextQueryResult,
                dataId: "ROOT_QUERY",
                query: document,
                variables
              });
            }
          }
        });
      }
    }
    let refetchQueries = mutation.refetchQueries;
    if (typeof refetchQueries === "function") {
      refetchQueries = refetchQueries(getResultWithDataState());
    }
    if (cacheWrites.length > 0 || (refetchQueries || "").length > 0 || mutation.update || mutation.onQueryUpdated || mutation.removeOptimistic) {
      const results = [];
      this.queryManager.refetchQueries({
        updateCache: (cache2) => {
          if (!skipCache) {
            cacheWrites.forEach((write) => cache2.write(write));
          }
          const { update } = mutation;
          if (update) {
            if (!skipCache) {
              const diff = cache2.diff({
                id: "ROOT_MUTATION",
                // The cache complains if passed a mutation where it expects a
                // query, so we transform mutations and subscriptions to queries
                // (only once, thanks to this.transformCache).
                query: this.queryManager.getDocumentInfo(mutation.document).asQuery,
                variables: mutation.variables,
                optimistic: false,
                returnPartialData: true
              });
              if (diff.complete) {
                result = __spreadProps(__spreadValues({}, result), {
                  data: diff.result
                });
              }
            }
            if (!this.hasNext) {
              update(cache2, result, {
                context: mutation.context,
                variables: mutation.variables
              });
            }
          }
          if (!skipCache && !mutation.keepRootFields && !this.hasNext) {
            cache2.modify({
              id: "ROOT_MUTATION",
              fields(value, { fieldName, DELETE: DELETE2 }) {
                return fieldName === "__typename" ? value : DELETE2;
              }
            });
          }
        },
        include: refetchQueries,
        // Write the final mutation.result to the root layer of the cache.
        optimistic: false,
        // Remove the corresponding optimistic layer at the same time as we
        // write the final non-optimistic result.
        removeOptimistic: mutation.removeOptimistic,
        // Let the caller of client.mutate optionally determine the refetching
        // behavior for watched queries after the mutation.update function runs.
        // If no onQueryUpdated function was provided for this mutation, pass
        // null instead of undefined to disable the default refetching behavior.
        onQueryUpdated: mutation.onQueryUpdated || null
      }).forEach((result2) => results.push(result2));
      if (mutation.awaitRefetchQueries || mutation.onQueryUpdated) {
        return Promise.all(results).then(() => result);
      }
    }
    return Promise.resolve(result);
  }
  markMutationOptimistic(optimisticResponse, mutation) {
    const data = typeof optimisticResponse === "function" ? optimisticResponse(mutation.variables, { IGNORE }) : optimisticResponse;
    if (data === IGNORE) {
      return false;
    }
    this.cache.recordOptimisticTransaction((cache) => {
      try {
        this.markMutationResult({ data }, mutation, cache);
      } catch (error) {
        invariant3.error(error);
      }
    }, this.id);
    return true;
  }
  markSubscriptionResult(result, { document, variables, errorPolicy, cacheWriteBehavior }) {
    if (cacheWriteBehavior !== 0) {
      if (shouldWriteResult(result, errorPolicy)) {
        this.cache.write({
          query: document,
          result: result.data,
          dataId: "ROOT_SUBSCRIPTION",
          variables,
          extensions: result.extensions
        });
      }
      this.queryManager.broadcastQueries();
    }
  }
};
function shouldWriteResult(result, errorPolicy = "none") {
  const ignoreErrors = errorPolicy === "ignore" || errorPolicy === "all";
  let writeWithErrors = !graphQLResultHasError(result);
  if (!writeWithErrors && ignoreErrors && result.data) {
    writeWithErrors = true;
  }
  return writeWithErrors;
}

// node_modules/@apollo/client/core/QueryManager.js
var QueryManager = class {
  defaultOptions;
  client;
  /**
   * The options that were passed to the ApolloClient constructor.
   */
  clientOptions;
  assumeImmutableResults;
  documentTransform;
  ssrMode;
  defaultContext;
  dataMasking;
  incrementalHandler;
  localState;
  queryDeduplication;
  /**
   * Whether to prioritize cache values over network results when
   * `fetchObservableWithInfo` is called.
   * This will essentially turn a `"network-only"` or `"cache-and-network"`
   * fetchPolicy into a `"cache-first"` fetchPolicy, but without influencing
   * the `fetchPolicy` of the `ObservableQuery`.
   *
   * This can e.g. be used to prioritize the cache during the first render after
   * SSR.
   */
  prioritizeCacheValues = false;
  onBroadcast;
  mutationStore;
  /**
   * All ObservableQueries that currently have at least one subscriber.
   */
  obsQueries = /* @__PURE__ */ new Set();
  // Maps from queryInfo.id strings to Promise rejection functions for
  // currently active queries and fetches.
  // Use protected instead of private field so
  // @apollo/experimental-nextjs-app-support can access type info.
  fetchCancelFns = /* @__PURE__ */ new Map();
  constructor(options) {
    const defaultDocumentTransform = new DocumentTransform(
      (document) => this.cache.transformDocument(document),
      // Allow the apollo cache to manage its own transform caches
      { cache: false }
    );
    this.client = options.client;
    this.defaultOptions = options.defaultOptions;
    this.queryDeduplication = options.queryDeduplication;
    this.clientOptions = options.clientOptions;
    this.ssrMode = options.ssrMode;
    this.assumeImmutableResults = options.assumeImmutableResults;
    this.dataMasking = options.dataMasking;
    this.localState = options.localState;
    this.incrementalHandler = options.incrementalHandler;
    const documentTransform = options.documentTransform;
    this.documentTransform = documentTransform ? defaultDocumentTransform.concat(documentTransform).concat(defaultDocumentTransform) : defaultDocumentTransform;
    this.defaultContext = options.defaultContext || {};
    if (this.onBroadcast = options.onBroadcast) {
      this.mutationStore = {};
    }
  }
  get link() {
    return this.client.link;
  }
  get cache() {
    return this.client.cache;
  }
  /**
   * Call this method to terminate any active query processes, making it safe
   * to dispose of this QueryManager instance.
   */
  stop() {
    this.obsQueries.forEach((oq) => oq.stop());
    this.cancelPendingFetches(newInvariantError(87));
  }
  cancelPendingFetches(error) {
    this.fetchCancelFns.forEach((cancel) => cancel(error));
    this.fetchCancelFns.clear();
  }
  async mutate({ mutation, variables, optimisticResponse, updateQueries, refetchQueries = [], awaitRefetchQueries = false, update: updateWithProxyFn, onQueryUpdated, fetchPolicy, errorPolicy, keepRootFields, context }) {
    const queryInfo = new QueryInfo(this);
    mutation = this.cache.transformForLink(this.transform(mutation));
    const { hasClientExports } = this.getDocumentInfo(mutation);
    variables = this.getVariables(mutation, variables);
    if (hasClientExports) {
      if (__DEV__) {
        invariant3(this.localState, 88, getOperationName(mutation, "(anonymous)"));
      }
      variables = await this.localState.getExportedVariables({
        client: this.client,
        document: mutation,
        variables,
        context
      });
    }
    const mutationStoreValue = this.mutationStore && (this.mutationStore[queryInfo.id] = {
      mutation,
      variables,
      loading: true,
      error: null
    });
    const isOptimistic = optimisticResponse && queryInfo.markMutationOptimistic(optimisticResponse, {
      document: mutation,
      variables,
      cacheWriteBehavior: fetchPolicy === "no-cache" ? 0 : 2,
      errorPolicy,
      context,
      updateQueries,
      update: updateWithProxyFn,
      keepRootFields
    });
    this.broadcastQueries();
    return new Promise((resolve, reject) => {
      const cause = {};
      return this.getObservableFromLink(mutation, __spreadProps(__spreadValues({}, context), {
        optimisticResponse: isOptimistic ? optimisticResponse : void 0
      }), variables, fetchPolicy, {}, false).observable.pipe(validateDidEmitValue(), mergeMap((result) => {
        const storeResult = __spreadValues({}, result);
        return from(queryInfo.markMutationResult(storeResult, {
          document: mutation,
          variables,
          cacheWriteBehavior: fetchPolicy === "no-cache" ? 0 : 2,
          errorPolicy,
          context,
          update: updateWithProxyFn,
          updateQueries,
          awaitRefetchQueries,
          refetchQueries,
          removeOptimistic: isOptimistic ? queryInfo.id : void 0,
          onQueryUpdated,
          keepRootFields
        }));
      })).pipe(map((storeResult) => {
        const hasErrors = graphQLResultHasError(storeResult);
        if (hasErrors && errorPolicy === "none") {
          throw new CombinedGraphQLErrors(removeStreamDetailsFromExtensions(storeResult));
        }
        if (mutationStoreValue) {
          mutationStoreValue.loading = false;
          mutationStoreValue.error = null;
        }
        return storeResult;
      })).subscribe({
        next: (storeResult) => {
          this.broadcastQueries();
          if (!queryInfo.hasNext) {
            const result = {
              data: this.maskOperation({
                document: mutation,
                data: storeResult.data,
                fetchPolicy,
                cause
              })
            };
            if (graphQLResultHasError(storeResult)) {
              result.error = new CombinedGraphQLErrors(storeResult);
            }
            if (Object.keys(storeResult.extensions || {}).length) {
              result.extensions = storeResult.extensions;
            }
            resolve(result);
          }
        },
        error: (error) => {
          if (mutationStoreValue) {
            mutationStoreValue.loading = false;
            mutationStoreValue.error = error;
          }
          if (isOptimistic) {
            this.cache.removeOptimistic(queryInfo.id);
          }
          this.broadcastQueries();
          if (errorPolicy === "ignore") {
            return resolve({ data: void 0 });
          }
          if (errorPolicy === "all") {
            return resolve({ data: void 0, error });
          }
          reject(error);
        }
      });
    });
  }
  fetchQuery(options, networkStatus) {
    checkDocument(options.query, OperationTypeNode.QUERY);
    return (async () => lastValueFrom(this.fetchObservableWithInfo(options, {
      networkStatus
    }).observable.pipe(filterMap((value) => {
      switch (value.kind) {
        case "E":
          throw value.error;
        case "N": {
          if (value.source !== "newNetworkStatus")
            return toQueryResult(value.value);
        }
      }
    })), {
      // This default is needed when a `standby` fetch policy is used to avoid
      // an EmptyError from rejecting this promise.
      defaultValue: { data: void 0 }
    }))();
  }
  transform(document) {
    return this.documentTransform.transformDocument(document);
  }
  transformCache = new AutoCleanedWeakCache(
    cacheSizes["queryManager.getDocumentInfo"] || 2e3
    /* defaultCacheSizes["queryManager.getDocumentInfo"] */
  );
  getDocumentInfo(document) {
    const { transformCache } = this;
    if (!transformCache.has(document)) {
      const operationDefinition = getOperationDefinition(document);
      const cacheEntry = {
        // TODO These three calls (hasClientExports, shouldForceResolvers, and
        // usesNonreactiveDirective) are performing independent full traversals
        // of the transformed document. We should consider merging these
        // traversals into a single pass in the future, though the work is
        // cached after the first time.
        hasClientExports: hasDirectives(["client", "export"], document, true),
        hasForcedResolvers: hasForcedResolvers(document),
        hasNonreactiveDirective: hasDirectives(["nonreactive"], document),
        hasIncrementalDirective: hasDirectives(["defer"], document),
        nonReactiveQuery: addNonReactiveToNamedFragments(document),
        clientQuery: hasDirectives(["client"], document) ? document : null,
        serverQuery: removeDirectivesFromDocument([
          { name: "client", remove: true },
          { name: "connection" },
          { name: "nonreactive" },
          { name: "unmask" }
        ], document),
        operationType: operationDefinition?.operation,
        defaultVars: getDefaultValues(operationDefinition),
        // Transform any mutation or subscription operations to query operations
        // so we can read/write them from/to the cache.
        asQuery: __spreadProps(__spreadValues({}, document), {
          definitions: document.definitions.map((def) => {
            if (def.kind === "OperationDefinition" && def.operation !== "query") {
              return __spreadProps(__spreadValues({}, def), { operation: "query" });
            }
            return def;
          })
        })
      };
      transformCache.set(document, cacheEntry);
    }
    const entry = transformCache.get(document);
    if (entry.violation) {
      throw entry.violation;
    }
    return entry;
  }
  getVariables(document, variables) {
    const defaultVars = this.getDocumentInfo(document).defaultVars;
    const varsWithDefaults = Object.entries(variables ?? {}).map(([key, value]) => [key, value === void 0 ? defaultVars[key] : value]);
    return __spreadValues(__spreadValues({}, defaultVars), Object.fromEntries(varsWithDefaults));
  }
  watchQuery(options) {
    checkDocument(options.query, OperationTypeNode.QUERY);
    const query = this.transform(options.query);
    options = __spreadProps(__spreadValues({}, options), {
      variables: this.getVariables(query, options.variables)
    });
    if (typeof options.notifyOnNetworkStatusChange === "undefined") {
      options.notifyOnNetworkStatusChange = true;
    }
    const observable = new ObservableQuery({
      queryManager: this,
      options,
      transformedQuery: query
    });
    return observable;
  }
  query(options) {
    const query = this.transform(options.query);
    return this.fetchQuery(__spreadProps(__spreadValues({}, options), {
      query
    })).then((value) => __spreadProps(__spreadValues({}, value), {
      data: this.maskOperation({
        document: query,
        data: value?.data,
        fetchPolicy: options.fetchPolicy
      })
    }));
  }
  requestIdCounter = 1;
  generateRequestId() {
    return this.requestIdCounter++;
  }
  clearStore(options = {
    discardWatches: true
  }) {
    this.cancelPendingFetches(newInvariantError(89));
    this.obsQueries.forEach((observableQuery) => {
      observableQuery.reset();
    });
    if (this.mutationStore) {
      this.mutationStore = {};
    }
    return this.cache.reset(options);
  }
  getObservableQueries(include = "active") {
    const queries = /* @__PURE__ */ new Set();
    const queryNames = /* @__PURE__ */ new Map();
    const queryNamesAndQueryStrings = /* @__PURE__ */ new Map();
    const legacyQueryOptions = /* @__PURE__ */ new Set();
    if (Array.isArray(include)) {
      include.forEach((desc) => {
        if (typeof desc === "string") {
          queryNames.set(desc, desc);
          queryNamesAndQueryStrings.set(desc, false);
        } else if (isDocumentNode(desc)) {
          const queryString = print2(this.transform(desc));
          queryNames.set(queryString, getOperationName(desc));
          queryNamesAndQueryStrings.set(queryString, false);
        } else if (isNonNullObject(desc) && desc.query) {
          legacyQueryOptions.add(desc);
        }
      });
    }
    this.obsQueries.forEach((oq) => {
      const document = print2(this.transform(oq.options.query));
      if (include === "all") {
        queries.add(oq);
        return;
      }
      const { queryName, options: { fetchPolicy } } = oq;
      if (include === "active" && fetchPolicy === "standby") {
        return;
      }
      if (include === "active" || queryName && queryNamesAndQueryStrings.has(queryName) || document && queryNamesAndQueryStrings.has(document)) {
        queries.add(oq);
        if (queryName)
          queryNamesAndQueryStrings.set(queryName, true);
        if (document)
          queryNamesAndQueryStrings.set(document, true);
      }
    });
    if (legacyQueryOptions.size) {
      legacyQueryOptions.forEach((options) => {
        const oq = new ObservableQuery({
          queryManager: this,
          options: __spreadProps(__spreadValues({}, options), {
            fetchPolicy: "network-only"
          })
        });
        queries.add(oq);
      });
    }
    if (__DEV__ && queryNamesAndQueryStrings.size) {
      queryNamesAndQueryStrings.forEach((included, nameOrQueryString) => {
        if (!included) {
          const queryName = queryNames.get(nameOrQueryString);
          if (queryName) {
            __DEV__ && invariant3.warn(90, queryName);
          } else {
            __DEV__ && invariant3.warn(91);
          }
        }
      });
    }
    return queries;
  }
  refetchObservableQueries(includeStandby = false) {
    const observableQueryPromises = [];
    this.getObservableQueries(includeStandby ? "all" : "active").forEach((observableQuery) => {
      const { fetchPolicy } = observableQuery.options;
      if ((includeStandby || fetchPolicy !== "standby") && fetchPolicy !== "cache-only") {
        observableQueryPromises.push(observableQuery.refetch());
      }
    });
    this.broadcastQueries();
    return Promise.all(observableQueryPromises);
  }
  startGraphQLSubscription(options) {
    let { query, variables } = options;
    const { fetchPolicy = "cache-first", errorPolicy = "none", context = {}, extensions = {} } = options;
    checkDocument(query, OperationTypeNode.SUBSCRIPTION);
    query = this.transform(query);
    variables = this.getVariables(query, variables);
    let restart;
    if (__DEV__) {
      invariant3(
        !this.getDocumentInfo(query).hasClientExports || this.localState,
        92,
        getOperationName(query, "(anonymous)")
      );
    }
    const observable = (this.getDocumentInfo(query).hasClientExports ? from(this.localState.getExportedVariables({
      client: this.client,
      document: query,
      variables,
      context
    })) : of(variables)).pipe(mergeMap((variables2) => {
      const { observable: observable2, restart: res } = this.getObservableFromLink(query, context, variables2, fetchPolicy, extensions);
      const queryInfo = new QueryInfo(this);
      restart = res;
      return observable2.pipe(map((rawResult) => {
        queryInfo.markSubscriptionResult(rawResult, {
          document: query,
          variables: variables2,
          errorPolicy,
          cacheWriteBehavior: fetchPolicy === "no-cache" ? 0 : 2
        });
        const result = {
          data: rawResult.data ?? void 0
        };
        if (graphQLResultHasError(rawResult)) {
          result.error = new CombinedGraphQLErrors(rawResult);
        } else if (graphQLResultHasProtocolErrors(rawResult)) {
          result.error = rawResult.extensions[PROTOCOL_ERRORS_SYMBOL];
          delete rawResult.extensions[PROTOCOL_ERRORS_SYMBOL];
        }
        if (rawResult.extensions && Object.keys(rawResult.extensions).length) {
          result.extensions = rawResult.extensions;
        }
        if (result.error && errorPolicy === "none") {
          result.data = void 0;
        }
        if (errorPolicy === "ignore") {
          delete result.error;
        }
        return result;
      }), catchError((error) => {
        if (errorPolicy === "ignore") {
          return of({
            data: void 0
          });
        }
        return of({ data: void 0, error });
      }), filter((result) => !!(result.data || result.error)));
    }));
    return Object.assign(observable, { restart: () => restart?.() });
  }
  broadcastQueries() {
    if (this.onBroadcast)
      this.onBroadcast();
    this.obsQueries.forEach((observableQuery) => observableQuery.notify());
  }
  // Use protected instead of private field so
  // @apollo/experimental-nextjs-app-support can access type info.
  inFlightLinkObservables = new Trie(false);
  getObservableFromLink(query, context, variables, fetchPolicy, extensions, deduplication = context?.queryDeduplication ?? this.queryDeduplication) {
    let entry = {};
    const { serverQuery, clientQuery, operationType, hasIncrementalDirective } = this.getDocumentInfo(query);
    const operationName = getOperationName(query);
    const executeContext = {
      client: this.client
    };
    if (serverQuery) {
      const { inFlightLinkObservables, link } = this;
      try {
        let withRestart2 = function(source) {
          return new Observable((observer) => {
            function subscribe() {
              return source.subscribe({
                next: observer.next.bind(observer),
                complete: observer.complete.bind(observer),
                error: observer.error.bind(observer)
              });
            }
            let subscription = subscribe();
            entry.restart ||= () => {
              subscription.unsubscribe();
              subscription = subscribe();
            };
            return () => {
              subscription.unsubscribe();
              entry.restart = void 0;
            };
          });
        };
        var withRestart = withRestart2;
        const operation = this.incrementalHandler.prepareRequest({
          query: serverQuery,
          variables,
          context: __spreadProps(__spreadValues(__spreadValues({}, this.defaultContext), context), {
            queryDeduplication: deduplication
          }),
          extensions
        });
        context = operation.context;
        if (deduplication) {
          const printedServerQuery = print2(serverQuery);
          const varJson = canonicalStringify(variables);
          entry = inFlightLinkObservables.lookup(printedServerQuery, varJson);
          if (!entry.observable) {
            entry.observable = execute(link, operation, executeContext).pipe(
              withRestart2,
              finalize(() => {
                if (inFlightLinkObservables.peek(printedServerQuery, varJson) === entry) {
                  inFlightLinkObservables.remove(printedServerQuery, varJson);
                }
              }),
              // We don't want to replay the last emitted value for
              // subscriptions and instead opt to wait to receive updates until
              // the subscription emits new values.
              operationType === OperationTypeNode.SUBSCRIPTION ? share() : shareReplay({ refCount: true })
            );
          }
        } else {
          entry.observable = execute(link, operation, executeContext).pipe(withRestart2);
        }
      } catch (error) {
        entry.observable = throwError(() => error);
      }
    } else {
      entry.observable = of({ data: {} });
    }
    if (clientQuery) {
      const { operation } = getOperationDefinition(query);
      if (__DEV__) {
        invariant3(
          this.localState,
          93,
          operation[0].toUpperCase() + operation.slice(1),
          operationName ?? "(anonymous)"
        );
      }
      invariant3(
        !hasIncrementalDirective,
        94,
        operation[0].toUpperCase() + operation.slice(1),
        operationName ?? "(anonymous)"
      );
      entry.observable = entry.observable.pipe(mergeMap((result) => {
        return from(this.localState.execute({
          client: this.client,
          document: clientQuery,
          remoteResult: result,
          context,
          variables,
          fetchPolicy
        }));
      }));
    }
    return {
      restart: () => entry.restart?.(),
      observable: entry.observable.pipe(catchError((error) => {
        error = toErrorLike(error);
        registerLinkError(error);
        throw error;
      }))
    };
  }
  getResultsFromLink(options, { queryInfo, cacheWriteBehavior, observableQuery, exposeExtensions }) {
    const requestId = queryInfo.lastRequestId = this.generateRequestId();
    const { errorPolicy } = options;
    const linkDocument = this.cache.transformForLink(options.query);
    return this.getObservableFromLink(linkDocument, options.context, options.variables, options.fetchPolicy).observable.pipe(map((incoming) => {
      const result = queryInfo.markQueryResult(incoming, __spreadProps(__spreadValues({}, options), {
        document: linkDocument,
        cacheWriteBehavior
      }));
      const hasErrors = graphQLResultHasError(result);
      if (hasErrors && errorPolicy === "none") {
        queryInfo.resetLastWrite();
        observableQuery?.["resetNotifications"]();
        throw new CombinedGraphQLErrors(removeStreamDetailsFromExtensions(result));
      }
      const aqr = __spreadValues({
        data: result.data
      }, queryInfo.hasNext ? {
        loading: true,
        networkStatus: NetworkStatus.streaming,
        dataState: "streaming",
        partial: true
      } : {
        dataState: result.data ? "complete" : "empty",
        loading: false,
        networkStatus: NetworkStatus.ready,
        partial: !result.data
      });
      if (exposeExtensions && "extensions" in result) {
        aqr[extensionsSymbol] = result.extensions;
      }
      if (hasErrors) {
        if (errorPolicy === "none") {
          aqr.data = void 0;
          aqr.dataState = "empty";
        }
        if (errorPolicy !== "ignore") {
          aqr.error = new CombinedGraphQLErrors(removeStreamDetailsFromExtensions(result));
          if (aqr.dataState !== "streaming") {
            aqr.networkStatus = NetworkStatus.error;
          }
        }
      }
      return aqr;
    }), catchError((error) => {
      if (requestId >= queryInfo.lastRequestId && errorPolicy === "none") {
        queryInfo.resetLastWrite();
        observableQuery?.["resetNotifications"]();
        throw error;
      }
      const aqr = {
        data: void 0,
        dataState: "empty",
        loading: false,
        networkStatus: NetworkStatus.ready,
        partial: true
      };
      if (errorPolicy !== "ignore") {
        aqr.error = error;
        aqr.networkStatus = NetworkStatus.error;
      }
      return of(aqr);
    }));
  }
  fetchObservableWithInfo(options, {
    // The initial networkStatus for this fetch, most often
    // NetworkStatus.loading, but also possibly fetchMore, poll, refetch,
    // or setVariables.
    networkStatus = NetworkStatus.loading,
    query = options.query,
    fetchQueryOperator = (x) => x,
    onCacheHit = () => {
    },
    observableQuery,
    exposeExtensions
  }) {
    const variables = this.getVariables(query, options.variables);
    const defaults = this.defaultOptions.watchQuery;
    let { fetchPolicy = defaults && defaults.fetchPolicy || "cache-first", errorPolicy = defaults && defaults.errorPolicy || "none", returnPartialData = false, notifyOnNetworkStatusChange = true, context = {} } = options;
    if (this.prioritizeCacheValues && (fetchPolicy === "network-only" || fetchPolicy === "cache-and-network")) {
      fetchPolicy = "cache-first";
    }
    const normalized = Object.assign({}, options, {
      query,
      variables,
      fetchPolicy,
      errorPolicy,
      returnPartialData,
      notifyOnNetworkStatusChange,
      context
    });
    const queryInfo = new QueryInfo(this, observableQuery);
    const fromVariables = (variables2) => {
      normalized.variables = variables2;
      const cacheWriteBehavior = fetchPolicy === "no-cache" ? 0 : networkStatus === NetworkStatus.refetch && normalized.refetchWritePolicy !== "merge" ? 1 : 2;
      const observableWithInfo = this.fetchQueryByPolicy(normalized, {
        queryInfo,
        cacheWriteBehavior,
        onCacheHit,
        observableQuery,
        exposeExtensions
      });
      observableWithInfo.observable = observableWithInfo.observable.pipe(fetchQueryOperator);
      if (
        // If we're in standby, postpone advancing options.fetchPolicy using
        // applyNextFetchPolicy.
        normalized.fetchPolicy !== "standby"
      ) {
        observableQuery?.["applyNextFetchPolicy"]("after-fetch", options);
      }
      return observableWithInfo;
    };
    const cleanupCancelFn = () => {
      this.fetchCancelFns.delete(queryInfo.id);
    };
    this.fetchCancelFns.set(queryInfo.id, (error) => {
      fetchCancelSubject.next({
        kind: "E",
        error,
        source: "network"
      });
    });
    const fetchCancelSubject = new Subject();
    let observable, containsDataFromLink;
    if (this.getDocumentInfo(normalized.query).hasClientExports) {
      if (__DEV__) {
        invariant3(this.localState, 95, getOperationName(normalized.query, "(anonymous)"));
      }
      observable = from(this.localState.getExportedVariables({
        client: this.client,
        document: normalized.query,
        variables: normalized.variables,
        context: normalized.context
      })).pipe(mergeMap((variables2) => fromVariables(variables2).observable));
      containsDataFromLink = true;
    } else {
      const sourcesWithInfo = fromVariables(normalized.variables);
      containsDataFromLink = sourcesWithInfo.fromLink;
      observable = sourcesWithInfo.observable;
    }
    return {
      // Merge `observable` with `fetchCancelSubject`, in a way that completing or
      // erroring either of them will complete the merged obserable.
      observable: new Observable((observer) => {
        observer.add(cleanupCancelFn);
        observable.subscribe(observer);
        fetchCancelSubject.subscribe(observer);
      }).pipe(share()),
      fromLink: containsDataFromLink
    };
  }
  refetchQueries({ updateCache, include, optimistic = false, removeOptimistic = optimistic ? makeUniqueId("refetchQueries") : void 0, onQueryUpdated }) {
    const includedQueriesByOq = /* @__PURE__ */ new Map();
    if (include) {
      this.getObservableQueries(include).forEach((oq) => {
        if (oq.options.fetchPolicy === "cache-only" || oq["variablesUnknown"]) {
          return;
        }
        const current = oq.getCurrentResult();
        includedQueriesByOq.set(oq, {
          oq,
          lastDiff: {
            result: current?.data,
            complete: !current?.partial
          }
        });
      });
    }
    const results = /* @__PURE__ */ new Map();
    if (updateCache) {
      const handled = /* @__PURE__ */ new Set();
      this.cache.batch({
        update: updateCache,
        // Since you can perform any combination of cache reads and/or writes in
        // the cache.batch update function, its optimistic option can be either
        // a boolean or a string, representing three distinct modes of
        // operation:
        //
        // * false: read/write only the root layer
        // * true: read/write the topmost layer
        // * string: read/write a fresh optimistic layer with that ID string
        //
        // When typeof optimistic === "string", a new optimistic layer will be
        // temporarily created within cache.batch with that string as its ID. If
        // we then pass that same string as the removeOptimistic option, we can
        // make cache.batch immediately remove the optimistic layer after
        // running the updateCache function, triggering only one broadcast.
        //
        // However, the refetchQueries method accepts only true or false for its
        // optimistic option (not string). We interpret true to mean a temporary
        // optimistic layer should be created, to allow efficiently rolling back
        // the effect of the updateCache function, which involves passing a
        // string instead of true as the optimistic option to cache.batch, when
        // refetchQueries receives optimistic: true.
        //
        // In other words, we are deliberately not supporting the use case of
        // writing to an *existing* optimistic layer (using the refetchQueries
        // updateCache function), since that would potentially interfere with
        // other optimistic updates in progress. Instead, you can read/write
        // only the root layer by passing optimistic: false to refetchQueries,
        // or you can read/write a brand new optimistic layer that will be
        // automatically removed by passing optimistic: true.
        optimistic: optimistic && removeOptimistic || false,
        // The removeOptimistic option can also be provided by itself, even if
        // optimistic === false, to remove some previously-added optimistic
        // layer safely and efficiently, like we do in markMutationResult.
        //
        // If an explicit removeOptimistic string is provided with optimistic:
        // true, the removeOptimistic string will determine the ID of the
        // temporary optimistic layer, in case that ever matters.
        removeOptimistic,
        onWatchUpdated(watch, diff, lastDiff) {
          const oq = watch.watcher;
          if (oq instanceof ObservableQuery && !handled.has(oq)) {
            handled.add(oq);
            if (onQueryUpdated) {
              includedQueriesByOq.delete(oq);
              let result = onQueryUpdated(oq, diff, lastDiff);
              if (result === true) {
                result = oq.refetch().retain(
                  /* create a persistent subscription on the query */
                );
              }
              if (result !== false) {
                results.set(oq, result);
              }
              return result;
            }
            if (onQueryUpdated !== null && oq.options.fetchPolicy !== "cache-only") {
              includedQueriesByOq.set(oq, { oq, lastDiff, diff });
            }
          }
        }
      });
    }
    if (includedQueriesByOq.size) {
      includedQueriesByOq.forEach(({ oq, lastDiff, diff }) => {
        let result;
        if (onQueryUpdated) {
          if (!diff) {
            diff = oq.getCacheDiff();
          }
          result = onQueryUpdated(oq, diff, lastDiff);
        }
        if (!onQueryUpdated || result === true) {
          result = oq.refetch().retain(
            /* create a persistent subscription on the query */
          );
        }
        if (result !== false) {
          results.set(oq, result);
        }
      });
    }
    if (removeOptimistic) {
      this.cache.removeOptimistic(removeOptimistic);
    }
    return results;
  }
  noCacheWarningsByCause = /* @__PURE__ */ new WeakSet();
  maskOperation(options) {
    const { document, data } = options;
    if (__DEV__) {
      const { fetchPolicy, cause = {} } = options;
      const operationType = getOperationDefinition(document)?.operation;
      if (this.dataMasking && fetchPolicy === "no-cache" && !isFullyUnmaskedOperation(document) && !this.noCacheWarningsByCause.has(cause)) {
        this.noCacheWarningsByCause.add(cause);
        __DEV__ && invariant3.warn(96, getOperationName(document, `Unnamed ${operationType ?? "operation"}`));
      }
    }
    return this.dataMasking ? maskOperation(data, document, this.cache) : data;
  }
  maskFragment(options) {
    const { data, fragment, fragmentName } = options;
    return this.dataMasking ? maskFragment(data, fragment, this.cache, fragmentName) : data;
  }
  fetchQueryByPolicy({ query, variables, fetchPolicy, errorPolicy, returnPartialData, context }, { cacheWriteBehavior, onCacheHit, queryInfo, observableQuery, exposeExtensions }) {
    const readCache = () => this.cache.diff({
      query,
      variables,
      returnPartialData: true,
      optimistic: true
    });
    const resultsFromCache = (diff, networkStatus) => {
      const data = diff.result;
      if (__DEV__ && !returnPartialData && data !== null) {
        logMissingFieldErrors(diff.missing);
      }
      const toResult = (data2) => {
        if (!diff.complete && !returnPartialData) {
          data2 = void 0;
        }
        return {
          // TODO: Handle partial data
          data: data2,
          dataState: diff.complete ? "complete" : data2 ? "partial" : "empty",
          loading: isNetworkRequestInFlight(networkStatus),
          networkStatus,
          partial: !diff.complete
        };
      };
      const fromData = (data2) => {
        return of({
          kind: "N",
          value: toResult(data2),
          source: "cache"
        });
      };
      if (
        // Don't attempt to run forced resolvers if we have incomplete cache
        // data and partial isn't allowed since this result would get set to
        // `undefined` anyways in `toResult`.
        (diff.complete || returnPartialData) && this.getDocumentInfo(query).hasForcedResolvers
      ) {
        if (__DEV__) {
          invariant3(this.localState, 97, getOperationName(query, "(anonymous)"));
        }
        onCacheHit();
        return from(this.localState.execute({
          client: this.client,
          document: query,
          remoteResult: data ? { data } : void 0,
          context,
          variables,
          onlyRunForcedResolvers: true,
          returnPartialData: true,
          fetchPolicy
        }).then((resolved) => ({
          kind: "N",
          value: toResult(resolved.data || void 0),
          source: "cache"
        })));
      }
      if (errorPolicy === "none" && networkStatus === NetworkStatus.refetch && diff.missing) {
        return fromData(void 0);
      }
      return fromData(data || void 0);
    };
    const resultsFromLink = () => this.getResultsFromLink({
      query,
      variables,
      context,
      fetchPolicy,
      errorPolicy
    }, {
      cacheWriteBehavior,
      queryInfo,
      observableQuery,
      exposeExtensions
    }).pipe(validateDidEmitValue(), materialize(), map((result) => __spreadProps(__spreadValues({}, result), {
      source: "network"
    })));
    switch (fetchPolicy) {
      default:
      case "cache-first": {
        const diff = readCache();
        if (diff.complete) {
          return {
            fromLink: false,
            observable: resultsFromCache(diff, NetworkStatus.ready)
          };
        }
        if (returnPartialData) {
          return {
            fromLink: true,
            observable: concat(resultsFromCache(diff, NetworkStatus.loading), resultsFromLink())
          };
        }
        return { fromLink: true, observable: resultsFromLink() };
      }
      case "cache-and-network": {
        const diff = readCache();
        if (diff.complete || returnPartialData) {
          return {
            fromLink: true,
            observable: concat(resultsFromCache(diff, NetworkStatus.loading), resultsFromLink())
          };
        }
        return { fromLink: true, observable: resultsFromLink() };
      }
      case "cache-only":
        return {
          fromLink: false,
          observable: concat(resultsFromCache(readCache(), NetworkStatus.ready))
        };
      case "network-only":
        return { fromLink: true, observable: resultsFromLink() };
      case "no-cache":
        return { fromLink: true, observable: resultsFromLink() };
      case "standby":
        return { fromLink: false, observable: EMPTY };
    }
  }
};
function validateDidEmitValue() {
  let didEmitValue = false;
  return tap({
    next() {
      didEmitValue = true;
    },
    complete() {
      invariant3(didEmitValue, 98);
    }
  });
}
function isFullyUnmaskedOperation(document) {
  let isUnmasked = true;
  visit(document, {
    FragmentSpread: (node) => {
      isUnmasked = !!node.directives && node.directives.some((directive) => directive.name.value === "unmask");
      if (!isUnmasked) {
        return BREAK;
      }
    }
  });
  return isUnmasked;
}
function addNonReactiveToNamedFragments(document) {
  return visit(document, {
    FragmentSpread: (node) => {
      if (node.directives?.some((directive) => directive.name.value === "unmask")) {
        return;
      }
      return __spreadProps(__spreadValues({}, node), {
        directives: [
          ...node.directives || [],
          {
            kind: Kind.DIRECTIVE,
            name: { kind: Kind.NAME, value: "nonreactive" }
          }
        ]
      });
    }
  });
}
function removeStreamDetailsFromExtensions(original) {
  var _c;
  if (original.extensions?.[streamInfoSymbol] == null) {
    return original;
  }
  const _a = original, { extensions: _b } = _a, _d = _b, { [_c = streamInfoSymbol]: _ } = _d, extensions = __objRest(_d, [__restKey(_c)]), result = __objRest(_a, ["extensions"]);
  if (Object.keys(extensions).length > 0) {
    result.extensions = extensions;
  }
  return result;
}

// node_modules/@apollo/client/core/ApolloClient.js
var hasSuggestedDevtools = false;
var ApolloClient = class {
  link;
  cache;
  /**
   * @deprecated `disableNetworkFetches` has been renamed to `prioritizeCacheValues`.
   */
  disableNetworkFetches;
  set prioritizeCacheValues(value) {
    this.queryManager.prioritizeCacheValues = value;
  }
  /**
   * Whether to prioritize cache values over network results when `query` or `watchQuery` is called.
   * This will essentially turn a `"network-only"` or `"cache-and-network"` fetchPolicy into a `"cache-first"` fetchPolicy,
   * but without influencing the `fetchPolicy` of the created `ObservableQuery` long-term.
   *
   * This can e.g. be used to prioritize the cache during the first render after SSR.
   */
  get prioritizeCacheValues() {
    return this.queryManager.prioritizeCacheValues;
  }
  version;
  queryDeduplication;
  defaultOptions;
  devtoolsConfig;
  queryManager;
  devToolsHookCb;
  resetStoreCallbacks = [];
  clearStoreCallbacks = [];
  /**
   * Constructs an instance of `ApolloClient`.
   *
   * @example
   *
   * ```js
   * import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
   *
   * const cache = new InMemoryCache();
   * const link = new HttpLink({ uri: "http://localhost:4000/" });
   *
   * const client = new ApolloClient({
   *   // Provide required constructor fields
   *   cache: cache,
   *   link: link,
   *
   *   // Provide some optional constructor fields
   *   clientAwareness: {
   *     name: "react-web-client",
   *     version: "1.3",
   *   },
   *   queryDeduplication: false,
   * });
   * ```
   */
  constructor(options) {
    if (__DEV__) {
      invariant3(options.cache, 68);
      invariant3(options.link, 69);
    }
    const { cache, documentTransform, ssrMode = false, ssrForceFetchDelay = 0, queryDeduplication = true, defaultOptions, defaultContext, assumeImmutableResults = cache.assumeImmutableResults, localState, devtools, dataMasking, link, incrementalHandler = new NotImplementedHandler(), experiments = [] } = options;
    this.link = link;
    this.cache = cache;
    this.queryDeduplication = queryDeduplication;
    this.defaultOptions = defaultOptions || {};
    this.devtoolsConfig = __spreadProps(__spreadValues({}, devtools), {
      enabled: devtools?.enabled ?? __DEV__
    });
    this.watchQuery = this.watchQuery.bind(this);
    this.query = this.query.bind(this);
    this.mutate = this.mutate.bind(this);
    this.watchFragment = this.watchFragment.bind(this);
    this.resetStore = this.resetStore.bind(this);
    this.reFetchObservableQueries = this.refetchObservableQueries = this.refetchObservableQueries.bind(this);
    this.version = version;
    this.queryManager = new QueryManager({
      client: this,
      defaultOptions: this.defaultOptions,
      defaultContext,
      documentTransform,
      queryDeduplication,
      ssrMode,
      dataMasking: !!dataMasking,
      clientOptions: options,
      incrementalHandler,
      assumeImmutableResults,
      onBroadcast: this.devtoolsConfig.enabled ? () => {
        if (this.devToolsHookCb) {
          this.devToolsHookCb();
        }
      } : void 0,
      localState
    });
    this.prioritizeCacheValues = ssrMode || ssrForceFetchDelay > 0;
    if (ssrForceFetchDelay) {
      setTimeout(() => {
        this.prioritizeCacheValues = false;
      }, ssrForceFetchDelay);
    }
    if (this.devtoolsConfig.enabled)
      this.connectToDevTools();
    experiments.forEach((experiment) => experiment.call(this, options));
  }
  connectToDevTools() {
    if (typeof window === "undefined") {
      return;
    }
    const windowWithDevTools = window;
    const devtoolsSymbol = /* @__PURE__ */ Symbol.for("apollo.devtools");
    (windowWithDevTools[devtoolsSymbol] = windowWithDevTools[devtoolsSymbol] || []).push(this);
    windowWithDevTools.__APOLLO_CLIENT__ = this;
    if (!hasSuggestedDevtools && __DEV__) {
      hasSuggestedDevtools = true;
      if (window.document && window.top === window.self && /^(https?|file):$/.test(window.location.protocol)) {
        setTimeout(() => {
          if (!window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
            const nav = window.navigator;
            const ua = nav && nav.userAgent;
            let url;
            if (typeof ua === "string") {
              if (ua.indexOf("Chrome/") > -1) {
                url = "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm";
              } else if (ua.indexOf("Firefox/") > -1) {
                url = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/";
              }
            }
            if (url) {
              __DEV__ && invariant3.log("Download the Apollo DevTools for a better development experience: %s", url);
            }
          }
        }, 1e4);
      }
    }
  }
  /**
   * The `DocumentTransform` used to modify GraphQL documents before a request
   * is made. If a custom `DocumentTransform` is not provided, this will be the
   * default document transform.
   */
  get documentTransform() {
    return this.queryManager.documentTransform;
  }
  /**
   * The configured `LocalState` instance used to enable the use of `@client`
   * fields.
   */
  get localState() {
    return this.queryManager.localState;
  }
  set localState(localState) {
    this.queryManager.localState = localState;
  }
  /**
   * Call this method to terminate any active client processes, making it safe
   * to dispose of this `ApolloClient` instance.
   *
   * This method performs aggressive cleanup to prevent memory leaks:
   *
   * - Unsubscribes all active `ObservableQuery` instances by emitting a `completed` event
   * - Rejects all currently running queries with "QueryManager stopped while query was in flight"
   * - Removes all queryRefs from the suspense cache
   */
  stop() {
    this.queryManager.stop();
  }
  /**
   * This watches the cache store of the query according to the options specified and
   * returns an `ObservableQuery`. We can subscribe to this `ObservableQuery` and
   * receive updated results through an observer when the cache store changes.
   *
   * Note that this method is not an implementation of GraphQL subscriptions. Rather,
   * it uses Apollo's store in order to reactively deliver updates to your query results.
   *
   * For example, suppose you call watchQuery on a GraphQL query that fetches a person's
   * first and last name and this person has a particular object identifier, provided by
   * `cache.identify`. Later, a different query fetches that same person's
   * first and last name and the first name has now changed. Then, any observers associated
   * with the results of the first query will be updated with a new result object.
   *
   * Note that if the cache does not change, the subscriber will _not_ be notified.
   *
   * See [here](https://medium.com/apollo-stack/the-concepts-of-graphql-bc68bd819be3#.3mb0cbcmc) for
   * a description of store reactivity.
   */
  watchQuery(options) {
    if (this.defaultOptions.watchQuery) {
      options = mergeOptions(this.defaultOptions.watchQuery, options);
    }
    return this.queryManager.watchQuery(options);
  }
  /**
   * This resolves a single query according to the options specified and
   * returns a `Promise` which is either resolved with the resulting data
   * or rejected with an error.
   *
   * @param options - An object of type `QueryOptions` that allows us to
   * describe how this query should be treated e.g. whether it should hit the
   * server at all or just resolve from the cache, etc.
   */
  query(options) {
    if (this.defaultOptions.query) {
      options = mergeOptions(this.defaultOptions.query, options);
    }
    if (__DEV__) {
      invariant3(options.fetchPolicy !== "cache-and-network", 70);
      invariant3(options.fetchPolicy !== "standby", 71);
      invariant3(options.query, 72);
      invariant3(options.query.kind === "Document", 73);
      invariant3(!options.returnPartialData, 74);
      invariant3(!options.pollInterval, 75);
      invariant3(!options.notifyOnNetworkStatusChange, 76);
    }
    return this.queryManager.query(options);
  }
  /**
   * This resolves a single mutation according to the options specified and returns a
   * Promise which is either resolved with the resulting data or rejected with an
   * error. In some cases both `data` and `errors` might be undefined, for example
   * when `errorPolicy` is set to `'ignore'`.
   *
   * It takes options as an object with the following keys and values:
   */
  mutate(options) {
    const optionsWithDefaults = mergeOptions(compact({
      fetchPolicy: "network-only",
      errorPolicy: "none"
    }, this.defaultOptions.mutate), options);
    if (__DEV__) {
      invariant3(optionsWithDefaults.mutation, 77);
      invariant3(optionsWithDefaults.fetchPolicy === "network-only" || optionsWithDefaults.fetchPolicy === "no-cache", 78);
    }
    checkDocument(optionsWithDefaults.mutation, OperationTypeNode.MUTATION);
    return this.queryManager.mutate(optionsWithDefaults);
  }
  /**
   * This subscribes to a graphql subscription according to the options specified and returns an
   * `Observable` which either emits received data or an error.
   */
  subscribe(options) {
    const cause = {};
    const observable = this.queryManager.startGraphQLSubscription(options);
    const mapped = observable.pipe(map((result) => __spreadProps(__spreadValues({}, result), {
      data: this.queryManager.maskOperation({
        document: options.query,
        data: result.data,
        fetchPolicy: options.fetchPolicy,
        cause
      })
    })));
    return Object.assign(mapped, { restart: observable.restart });
  }
  readQuery(options, optimistic = false) {
    return this.cache.readQuery(__spreadProps(__spreadValues({}, options), { query: this.transform(options.query) }), optimistic);
  }
  watchFragment(options) {
    const dataMasking = this.queryManager.dataMasking;
    const observable = this.cache.watchFragment(__spreadProps(__spreadValues({}, options), {
      fragment: this.transform(options.fragment, dataMasking)
    }));
    if (__DEV__) {
      return mapObservableFragmentMemoized(observable, /* @__PURE__ */ Symbol.for("apollo.transform.dev.mask"), (result) => __spreadProps(__spreadValues({}, result), {
        // The transform will remove fragment spreads from the fragment
        // document when dataMasking is enabled. The `mask` function
        // remains to apply warnings to fragments marked as
        // `@unmask(mode: "migrate")`. Since these warnings are only applied
        // in dev, we can skip the masking algorithm entirely for production.
        data: this.queryManager.maskFragment(__spreadProps(__spreadValues({}, options), {
          data: result.data
        }))
      }));
    }
    return observable;
  }
  readFragment(options, optimistic = false) {
    return this.cache.readFragment(__spreadProps(__spreadValues({}, options), { fragment: this.transform(options.fragment) }), optimistic);
  }
  /**
   * Writes some data in the shape of the provided GraphQL query directly to
   * the store. This method will start at the root query. To start at a
   * specific id returned by `cache.identify` then use `writeFragment`.
   */
  writeQuery(options) {
    const ref = this.cache.writeQuery(options);
    if (options.broadcast !== false) {
      this.queryManager.broadcastQueries();
    }
    return ref;
  }
  /**
   * Writes some data in the shape of the provided GraphQL fragment directly to
   * the store. This method will write to a GraphQL fragment from any arbitrary
   * id that is currently cached, unlike `writeQuery` which will only write
   * from the root query.
   *
   * You must pass in a GraphQL document with a single fragment or a document
   * with multiple fragments that represent what you are writing. If you pass
   * in a document with multiple fragments then you must also specify a
   * `fragmentName`.
   */
  writeFragment(options) {
    const ref = this.cache.writeFragment(options);
    if (options.broadcast !== false) {
      this.queryManager.broadcastQueries();
    }
    return ref;
  }
  __actionHookForDevTools(cb) {
    this.devToolsHookCb = cb;
  }
  __requestRaw(request) {
    return execute(this.link, request, { client: this });
  }
  /**
   * Resets your entire store by clearing out your cache and then re-executing
   * all of your active queries. This makes it so that you may guarantee that
   * there is no data left in your store from a time before you called this
   * method.
   *
   * `resetStore()` is useful when your user just logged out. You’ve removed the
   * user session, and you now want to make sure that any references to data you
   * might have fetched while the user session was active is gone.
   *
   * It is important to remember that `resetStore()` _will_ refetch any active
   * queries. This means that any components that might be mounted will execute
   * their queries again using your network interface. If you do not want to
   * re-execute any queries then you should make sure to stop watching any
   * active queries.
   */
  resetStore() {
    return Promise.resolve().then(() => this.queryManager.clearStore({
      discardWatches: false
    })).then(() => Promise.all(this.resetStoreCallbacks.map((fn) => fn()))).then(() => this.refetchObservableQueries());
  }
  /**
   * Remove all data from the store. Unlike `resetStore`, `clearStore` will
   * not refetch any active queries.
   */
  clearStore() {
    return Promise.resolve().then(() => this.queryManager.clearStore({
      discardWatches: true
    })).then(() => Promise.all(this.clearStoreCallbacks.map((fn) => fn())));
  }
  /**
   * Allows callbacks to be registered that are executed when the store is
   * reset. `onResetStore` returns an unsubscribe function that can be used
   * to remove registered callbacks.
   */
  onResetStore(cb) {
    this.resetStoreCallbacks.push(cb);
    return () => {
      this.resetStoreCallbacks = this.resetStoreCallbacks.filter((c) => c !== cb);
    };
  }
  /**
   * Allows callbacks to be registered that are executed when the store is
   * cleared. `onClearStore` returns an unsubscribe function that can be used
   * to remove registered callbacks.
   */
  onClearStore(cb) {
    this.clearStoreCallbacks.push(cb);
    return () => {
      this.clearStoreCallbacks = this.clearStoreCallbacks.filter((c) => c !== cb);
    };
  }
  /**
   * Refetches all of your active queries.
   *
   * `reFetchObservableQueries()` is useful if you want to bring the client back to proper state in case of a network outage
   *
   * It is important to remember that `reFetchObservableQueries()` _will_ refetch any active
   * queries. This means that any components that might be mounted will execute
   * their queries again using your network interface. If you do not want to
   * re-execute any queries then you should make sure to stop watching any
   * active queries.
   * Takes optional parameter `includeStandby` which will include queries in standby-mode when refetching.
   *
   * Note: `cache-only` queries are not refetched by this function.
   *
   * @deprecated Please use `refetchObservableQueries` instead.
   */
  reFetchObservableQueries;
  /**
   * Refetches all of your active queries.
   *
   * `refetchObservableQueries()` is useful if you want to bring the client back to proper state in case of a network outage
   *
   * It is important to remember that `refetchObservableQueries()` _will_ refetch any active
   * queries. This means that any components that might be mounted will execute
   * their queries again using your network interface. If you do not want to
   * re-execute any queries then you should make sure to stop watching any
   * active queries.
   * Takes optional parameter `includeStandby` which will include queries in standby-mode when refetching.
   *
   * Note: `cache-only` queries are not refetched by this function.
   */
  refetchObservableQueries(includeStandby) {
    return this.queryManager.refetchObservableQueries(includeStandby);
  }
  /**
   * Refetches specified active queries. Similar to "refetchObservableQueries()" but with a specific list of queries.
   *
   * `refetchQueries()` is useful for use cases to imperatively refresh a selection of queries.
   *
   * It is important to remember that `refetchQueries()` _will_ refetch specified active
   * queries. This means that any components that might be mounted will execute
   * their queries again using your network interface. If you do not want to
   * re-execute any queries then you should make sure to stop watching any
   * active queries.
   */
  refetchQueries(options) {
    const map2 = this.queryManager.refetchQueries(options);
    const queries = [];
    const results = [];
    map2.forEach((result2, obsQuery) => {
      queries.push(obsQuery);
      results.push(result2);
    });
    const result = Promise.all(results);
    result.queries = queries;
    result.results = results;
    result.catch((error) => {
      __DEV__ && invariant3.debug(79, error);
    });
    return result;
  }
  /**
   * Get all currently active `ObservableQuery` objects, in a `Set`.
   *
   * An "active" query is one that has observers and a `fetchPolicy` other than
   * "standby" or "cache-only".
   *
   * You can include all `ObservableQuery` objects (including the inactive ones)
   * by passing "all" instead of "active", or you can include just a subset of
   * active queries by passing an array of query names or DocumentNode objects.
   *
   * Note: This method only returns queries that have active subscribers. Queries
   * without subscribers are not tracked by the client.
   */
  getObservableQueries(include = "active") {
    return this.queryManager.getObservableQueries(include);
  }
  /**
   * Exposes the cache's complete state, in a serializable format for later restoration.
   *
   * @remarks
   *
   * This can be useful for debugging in order to inspect the full state of the
   * cache.
   *
   * @param optimistic - Determines whether the result contains data from the
   * optimistic layer
   */
  extract(optimistic) {
    return this.cache.extract(optimistic);
  }
  /**
   * Replaces existing state in the cache (if any) with the values expressed by
   * `serializedState`.
   *
   * Called when hydrating a cache (server side rendering, or offline storage),
   * and also (potentially) during hot reloads.
   */
  restore(serializedState) {
    return this.cache.restore(serializedState);
  }
  /**
   * Define a new ApolloLink (or link chain) that Apollo Client will use.
   */
  setLink(newLink) {
    this.link = newLink;
  }
  get defaultContext() {
    return this.queryManager.defaultContext;
  }
  maskedFragmentTransform = new DocumentTransform(removeMaskedFragmentSpreads);
  transform(document, dataMasking = false) {
    const transformed = this.queryManager.transform(document);
    return dataMasking ? this.maskedFragmentTransform.transformDocument(transformed) : transformed;
  }
};
if (__DEV__) {
  ApolloClient.prototype.getMemoryInternals = getApolloClientMemoryInternals;
}

// node_modules/graphql-tag/lib/index.js
var docCache = /* @__PURE__ */ new Map();
var fragmentSourceMap = /* @__PURE__ */ new Map();
var printFragmentWarnings = true;
var experimentalFragmentVariables = false;
function normalize2(string) {
  return string.replace(/[\s,]+/g, " ").trim();
}
function cacheKeyFromLoc(loc) {
  return normalize2(loc.source.body.substring(loc.start, loc.end));
}
function processFragments(ast) {
  var seenKeys = /* @__PURE__ */ new Set();
  var definitions = [];
  ast.definitions.forEach(function(fragmentDefinition) {
    if (fragmentDefinition.kind === "FragmentDefinition") {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);
      var sourceKeySet = fragmentSourceMap.get(fragmentName);
      if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }
      } else if (!sourceKeySet) {
        fragmentSourceMap.set(fragmentName, sourceKeySet = /* @__PURE__ */ new Set());
      }
      sourceKeySet.add(sourceKey);
      if (!seenKeys.has(sourceKey)) {
        seenKeys.add(sourceKey);
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  });
  return __assign(__assign({}, ast), { definitions });
}
function stripLoc(doc) {
  var workSet = new Set(doc.definitions);
  workSet.forEach(function(node) {
    if (node.loc)
      delete node.loc;
    Object.keys(node).forEach(function(key) {
      var value = node[key];
      if (value && typeof value === "object") {
        workSet.add(value);
      }
    });
  });
  var loc = doc.loc;
  if (loc) {
    delete loc.startToken;
    delete loc.endToken;
  }
  return doc;
}
function parseDocument(source) {
  var cacheKey = normalize2(source);
  if (!docCache.has(cacheKey)) {
    var parsed = parse(source, {
      experimentalFragmentVariables,
      allowLegacyFragmentVariables: experimentalFragmentVariables
    });
    if (!parsed || parsed.kind !== "Document") {
      throw new Error("Not a valid GraphQL document.");
    }
    docCache.set(cacheKey, stripLoc(processFragments(parsed)));
  }
  return docCache.get(cacheKey);
}
function gql(literals) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  if (typeof literals === "string") {
    literals = [literals];
  }
  var result = literals[0];
  args.forEach(function(arg, i) {
    if (arg && arg.kind === "Document") {
      result += arg.loc.source.body;
    } else {
      result += arg;
    }
    result += literals[i + 1];
  });
  return parseDocument(result);
}
function resetCaches() {
  docCache.clear();
  fragmentSourceMap.clear();
}
function disableFragmentWarnings() {
  printFragmentWarnings = false;
}
function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}
function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}
var extras = {
  gql,
  resetCaches,
  disableFragmentWarnings,
  enableExperimentalFragmentVariables,
  disableExperimentalFragmentVariables
};
(function(gql_1) {
  gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;
})(gql || (gql = {}));
gql["default"] = gql;

// node_modules/apollo-angular/fesm2022/apollo-angular.mjs
function fromLazyPromise(promiseFn) {
  return new Observable((subscriber) => {
    promiseFn().then((result) => {
      if (!subscriber.closed) {
        subscriber.next(result);
        subscriber.complete();
      }
    }, (error) => {
      if (!subscriber.closed) {
        subscriber.error(error);
      }
    });
    return () => subscriber.unsubscribe();
  });
}
function useMutationLoading(source, enabled) {
  if (!enabled) {
    return source.pipe(map((result) => __spreadProps(__spreadValues({}, result), {
      loading: false
    })));
  }
  return source.pipe(map((result) => __spreadProps(__spreadValues({}, result), {
    loading: false
  })), startWith({
    data: void 0,
    loading: true
  }));
}
var ZoneScheduler = class {
  zone;
  constructor(zone) {
    this.zone = zone;
  }
  now = Date.now;
  schedule(work, delay = 0, state) {
    return this.zone.run(() => queueScheduler.schedule(work, delay, state));
  }
};
function wrapWithZone(obs, ngZone) {
  return obs.pipe(observeOn(new ZoneScheduler(ngZone)));
}
var QueryRef = class {
  obsQuery;
  valueChanges;
  constructor(obsQuery, ngZone) {
    this.obsQuery = obsQuery;
    this.valueChanges = wrapWithZone(from(this.obsQuery), ngZone);
  }
  // ObservableQuery's methods
  get options() {
    return this.obsQuery.options;
  }
  get variables() {
    return this.obsQuery.variables;
  }
  getCurrentResult() {
    return this.obsQuery.getCurrentResult();
  }
  refetch(variables) {
    return this.obsQuery.refetch(variables);
  }
  fetchMore(fetchMoreOptions) {
    return this.obsQuery.fetchMore(fetchMoreOptions);
  }
  subscribeToMore(options) {
    return this.obsQuery.subscribeToMore(options);
  }
  updateQuery(mapFn) {
    return this.obsQuery.updateQuery(mapFn);
  }
  stopPolling() {
    return this.obsQuery.stopPolling();
  }
  startPolling(pollInterval) {
    return this.obsQuery.startPolling(pollInterval);
  }
  setVariables(variables) {
    return this.obsQuery.setVariables(variables);
  }
  reobserve(options) {
    return this.obsQuery.reobserve(options);
  }
};
var APOLLO_FLAGS = new InjectionToken("APOLLO_FLAGS");
var APOLLO_OPTIONS = new InjectionToken("APOLLO_OPTIONS");
var APOLLO_NAMED_OPTIONS = new InjectionToken("APOLLO_NAMED_OPTIONS");
var ApolloBase = class {
  ngZone;
  flags;
  _client;
  useMutationLoading;
  constructor(ngZone, flags, _client) {
    this.ngZone = ngZone;
    this.flags = flags;
    this._client = _client;
    this.useMutationLoading = flags?.useMutationLoading ?? false;
  }
  watchQuery(options) {
    return new QueryRef(this.ensureClient().watchQuery(__spreadValues({}, options)), this.ngZone);
  }
  query(options) {
    return fromLazyPromise(() => this.ensureClient().query(__spreadValues({}, options)));
  }
  mutate(options) {
    return useMutationLoading(fromLazyPromise(() => this.ensureClient().mutate(__spreadValues({}, options))), options.useMutationLoading ?? this.useMutationLoading);
  }
  watchFragment(options) {
    const _a = options, {
      useZone
    } = _a, opts = __objRest(_a, [
      "useZone"
    ]);
    const obs = this.ensureClient().watchFragment(__spreadValues({}, opts));
    return useZone !== true ? obs : wrapWithZone(obs, this.ngZone);
  }
  subscribe(options) {
    const _a = options, {
      useZone
    } = _a, opts = __objRest(_a, [
      "useZone"
    ]);
    const obs = this.ensureClient().subscribe(__spreadValues({}, opts));
    return useZone !== true ? obs : wrapWithZone(obs, this.ngZone);
  }
  /**
   * Get an instance of ApolloClient
   */
  get client() {
    return this.ensureClient();
  }
  /**
   * Set a new instance of ApolloClient
   * Remember to clean up the store before setting a new client.
   *
   * @param client ApolloClient instance
   */
  set client(client) {
    if (this._client) {
      throw new Error("Client has been already defined");
    }
    this._client = client;
  }
  ensureClient() {
    this.checkInstance();
    return this._client;
  }
  checkInstance() {
    if (this._client) {
      return true;
    } else {
      throw new Error("Client has not been defined yet");
    }
  }
};
var Apollo = class _Apollo extends ApolloBase {
  map = /* @__PURE__ */ new Map();
  constructor(ngZone, apolloOptions, apolloNamedOptions, flags) {
    super(ngZone, flags);
    if (apolloOptions) {
      this.createDefault(apolloOptions);
    }
    if (apolloNamedOptions && typeof apolloNamedOptions === "object") {
      for (let name in apolloNamedOptions) {
        if (apolloNamedOptions.hasOwnProperty(name)) {
          const options = apolloNamedOptions[name];
          this.create(options, name);
        }
      }
    }
  }
  /**
   * Create an instance of ApolloClient
   * @param options Options required to create ApolloClient
   * @param name client's name
   */
  create(options, name) {
    if (isNamed(name)) {
      this.createNamed(name, options);
    } else {
      this.createDefault(options);
    }
  }
  /**
   * Use a default ApolloClient
   */
  default() {
    return this;
  }
  /**
   * Use a named ApolloClient
   * @param name client's name
   */
  use(name) {
    if (isNamed(name)) {
      return this.map.get(name);
    } else {
      return this.default();
    }
  }
  /**
   * Create a default ApolloClient, same as `apollo.create(options)`
   * @param options ApolloClient's options
   */
  createDefault(options) {
    if (this._client) {
      throw new Error("Apollo has been already created.");
    }
    this.client = this.ngZone.runOutsideAngular(() => new ApolloClient(options));
  }
  /**
   * Create a named ApolloClient, same as `apollo.create(options, name)`
   * @param name client's name
   * @param options ApolloClient's options
   */
  createNamed(name, options) {
    if (this.map.has(name)) {
      throw new Error(`Client ${name} has been already created`);
    }
    this.map.set(name, new ApolloBase(this.ngZone, this.flags, this.ngZone.runOutsideAngular(() => new ApolloClient(options))));
  }
  /**
   * Remember to clean up the store before removing a client
   * @param name client's name
   */
  removeClient(name) {
    if (isNamed(name)) {
      this.map.delete(name);
    } else {
      this._client = void 0;
    }
  }
  static \u0275fac = function Apollo_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Apollo)(\u0275\u0275inject(NgZone), \u0275\u0275inject(APOLLO_OPTIONS, 8), \u0275\u0275inject(APOLLO_NAMED_OPTIONS, 8), \u0275\u0275inject(APOLLO_FLAGS, 8));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Apollo,
    factory: _Apollo.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Apollo, [{
    type: Injectable
  }], () => [{
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [APOLLO_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [APOLLO_NAMED_OPTIONS]
    }, {
      type: Optional
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [APOLLO_FLAGS]
    }, {
      type: Optional
    }]
  }], null);
})();
function isNamed(name) {
  return !!name && name !== "default";
}
function provideApollo(optionsFactory, flags = {}) {
  return [Apollo, {
    provide: APOLLO_OPTIONS,
    useFactory: optionsFactory
  }, {
    provide: APOLLO_FLAGS,
    useValue: flags
  }];
}
var Query = class _Query {
  apollo;
  client = "default";
  constructor(apollo) {
    this.apollo = apollo;
  }
  watch(...[options]) {
    return this.apollo.use(this.client).watchQuery(__spreadProps(__spreadValues({}, options), {
      query: this.document
    }));
  }
  fetch(...[options]) {
    return this.apollo.use(this.client).query(__spreadProps(__spreadValues({}, options), {
      query: this.document
    }));
  }
  static \u0275fac = function Query_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Query)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Query,
    factory: _Query.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Query, [{
    type: Injectable
  }], () => [{
    type: Apollo
  }], null);
})();
var Mutation = class _Mutation {
  apollo;
  client = "default";
  constructor(apollo) {
    this.apollo = apollo;
  }
  mutate(...[options]) {
    return this.apollo.use(this.client).mutate(__spreadProps(__spreadValues({}, options), {
      mutation: this.document
    }));
  }
  static \u0275fac = function Mutation_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Mutation)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Mutation,
    factory: _Mutation.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Mutation, [{
    type: Injectable
  }], () => [{
    type: Apollo
  }], null);
})();
var Subscription = class _Subscription {
  apollo;
  client = "default";
  constructor(apollo) {
    this.apollo = apollo;
  }
  subscribe(...[options]) {
    return this.apollo.use(this.client).subscribe(__spreadProps(__spreadValues({}, options), {
      query: this.document
    }));
  }
  static \u0275fac = function Subscription_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Subscription)(\u0275\u0275inject(Apollo));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _Subscription,
    factory: _Subscription.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Subscription, [{
    type: Injectable
  }], () => [{
    type: Apollo
  }], null);
})();
var typedGQLTag = gql;
var gql2 = typedGQLTag;

export {
  print,
  ApolloLink,
  InMemoryCache,
  APOLLO_NAMED_OPTIONS,
  Apollo,
  provideApollo,
  gql2 as gql
};
//# sourceMappingURL=chunk-7OA5XFJQ.js.map
