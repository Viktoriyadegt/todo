export type FieldError = {
  error: string
  field: string
}

export type ResponseType<T = {}> = {
  data: T
  messages: []
  fieldsErrors: FieldError
  resultCode: 0
}
