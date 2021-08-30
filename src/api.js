export const API_URL = "https://lodicon-api.herokuapp.com/api/v1"

export const throwAxiosError = resp => {
  if (resp.isAxiosError) {
    throw resp;
  }
  return resp;
}
