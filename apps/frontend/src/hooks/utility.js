import _ from "lodash";
import { useEffect, useRef, useState, useMemo } from "react";

export function useOnClickOutside(handler, reference = null) {
  const temp = useRef();
  const ref = reference || temp;

  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);

  return [ref];
}

export function useOnKeyDown(handler, reference = null) {
  const temp = useRef();
  const ref = reference || temp;

  useEffect(() => {
    const listener = event => {
      if (ref && ref.current && ref.current.contains(event.target)) handler(event);
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [ref, handler]);

  return [ref];
}
/** https://codesandbox.io/s/04vvrxj79p */
export function useIntersection({ root = null, rootMargin, threshold = 0 }) {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(
    new window.IntersectionObserver(([e]) => updateEntry(e), {
      root,
      rootMargin,
      threshold,
    }),
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node]);

  return [setNode, entry, node];
}

export function useProfileIntersection(callback = null, { rootMargin = null, threshold = null, root = null } = {}) {
  const [ref, entry] = useIntersection({
    threshold: threshold || [0.2, 0.8],
    rootMargin: rootMargin || "80px 0px 0px 0px",
    root: root || null,
  });

  const isObserved = useMemo(() => {
    if (_.isFunction(callback) && entry.intersectionRatio >= 0.2) callback(entry.intersectionRatio);
    return entry.intersectionRatio >= 0.2;
  }, [entry.intersectionRatio, callback]);

  return {
    ref,
    entry,
    isObserved,
  };
}
