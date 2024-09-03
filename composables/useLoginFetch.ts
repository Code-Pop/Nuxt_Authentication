export const useLoginFetch = <T extends string>(url: T) => {
  return useFetch(url, {
    onResponseError({ response }) {
      if (response.status === 401) {
        window.location.href = '/login'
      }
    }
  })
}