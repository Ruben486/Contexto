import { useState, createContext, useContext, useEffect} from "react";
import { getPostsRequest,
         createPostRequest,
         deletePostRequest,
         getPostRequest,
         updatePostRequest}
       from "../api/post"


// contexto creado fuera de la funcion. Este es el contexto
const PostContext = createContext();

// hook propio //
export const usePost = () => {
    const context = useContext(PostContext)
    return context
}

export const PostProvider = ({children}) => {
  const [posts, setPosts] = useState([])

  // conexion con el backend. Atencion donde esta //  
  // listo ya estan en estado global
  // el estado se refresca cuando se refresca una pagina
  const getPosts = async () => {  
      const res = await getPostsRequest()
      setPosts(res.data)
  }
  // enviar datos al backend del nuevo post
  const createPost = async (newPost) => {
      const res = await createPostRequest(newPost)
      setPosts([...posts,res.data])
  } 
  const deletePost = async (id) => {
    const res = await deletePostRequest(id)
    if (res.status === 204) {
      setPosts(posts.filter(post => post._id !== id))
    }
  }
  const getPost = async (id) => {
    const res = await getPostRequest(id)

    return res.data
  };
  
  const updatePost = async (id,post) => {
    const res = await updatePostRequest(id,post)
    setPosts(posts.map((post) => (post._id === id ? res.data : post))) 
  }

  useEffect(() =>  {
    getPosts()
},[])

  // se pasa esta funcion al contexto.
  return <PostContext.Provider value={{
    posts,
    getPosts,
    createPost,
    deletePost,
    getPost,
    updatePost
  }}>
    {children}
  </PostContext.Provider>
} 