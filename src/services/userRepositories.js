import API from "./api"

export const fetchData = async (data) => {
   const response = await API.get(`/search/repositories?q=${data}`);
   return response.data.items;
}