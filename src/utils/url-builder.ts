import { compile } from 'path-to-regexp'

export const buildURL = <T extends object | undefined>(
  path: string,
  parameters: T,
  query = {}
): string => {
  const url = compile(path, { encode: encodeURIComponent })(parameters)
  const queryString = new URLSearchParams(query).toString()
  return queryString ? `${url}?${queryString}` : url
}
