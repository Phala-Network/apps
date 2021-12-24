// Fix type issue when using `filter(Boolean)`
type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T // from lodash

export const isTruthy = <T>(value: T): value is Truthy<T> => Boolean(value)
