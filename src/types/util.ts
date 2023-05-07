export type Prettify<T> = {
  [P in keyof T]: T[P] extends string | number | boolean
    ? T[P]
    : T[P] extends Array<infer U>
    ? Array<Prettify<U>>
    : Prettify<T[P]>;
};
