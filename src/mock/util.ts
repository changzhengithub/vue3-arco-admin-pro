// const responseBody: ApiResponseData<any> = {
//   message: '',
//   timestamp: 0,
//   data: null,
//   code: 0
// }

export const builder = (responseBody: ApiResponseData<any>): ApiResponseData<any> => {
  return responseBody
}

export const getQueryParameters = (options: { url: any }) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options: { body: string }) => {
  return options.body && JSON.parse(options.body)
}
