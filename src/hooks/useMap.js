import { useState } from "react";

export default () => {
  const [internalMap] = useState(new Map());
  const [, forceRerender] = useState();

  const notifyObservers = () => {
    forceRerender(Math.random());
  };

  return {
    get size() {
      return internalMap.size;
    },
    clear: (...args) => {
      const result = internalMap.clear(...args);
      notifyObservers();
      return result;
    },
    delete: (...args) => {
      const result = internalMap.delete(...args);
      notifyObservers();
      return result;
    },
    entries: (...args) => internalMap.entries(...args),
    forEach: (...args) => internalMap.forEach(...args),
    get: (...args) => internalMap.get(...args),
    has: (...args) => internalMap.has(...args),
    keys: (...args) => internalMap.keys(...args),
    set: (...args) => {
      const result = internalMap.set(...args);
      notifyObservers();
      return result;
    },
    values: (...args) => internalMap.values(...args),
  };
};
