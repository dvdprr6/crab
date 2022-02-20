export type TPayloadDto<T> = {
  value: T
  isError: boolean
  error: string
}

export type TAction<T, P> = {
  readonly type: T
  readonly payload: P
}

export function createAction<T, P>(type: T, payload: P): TAction<T, P>{
  return { type, payload }
}

export type TState<T> = {
  payload: TPayloadDto<T>
}
