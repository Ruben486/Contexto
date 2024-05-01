import axios from "axios"; 

// funciones que se encargan de manefar la conexion con el servidor
export const getPostsRequest= async () => {
  return await axios.get("http://localhost:3005/posts")
};
export const createPostRequest = async (newPost) => {
  const form = new FormData()
  for (let key in newPost) {
    form.append(key,newPost[key])
  }
  return await axios.post("http://localhost:3005/post",form,{
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
};

export const deletePostRequest = async (id) => {
   return await axios.delete("http://localhost:3005/post/" + id)
};
export  const getPostRequest = async (id) => {
  return await axios.get("http://localhost:3005/post/" + id)
};
export const updatePostRequest= async (id,newFields) => {
  const res= await axios.put(`http://localhost:3005/post/${id}`,newFields)
  return res
  
}