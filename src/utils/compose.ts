type func<A> = (a: A) => A;

// functions are run from left to right
// do wot i want
export function compose<A>(funcs: func<A>[]) {
  return function(a: A) {
    return funcs.reduce((acc: A, func: func<A>) => func(acc), a);
  };
}
