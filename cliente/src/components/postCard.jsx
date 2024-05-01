import toast from 'react-hot-toast'
import {usePost} from '../context/postContext'
import {useNavigate} from 'react-router-dom'

export const PostCard = ({ post }) => {
  const {deletePost} = usePost()
  const navigate = useNavigate()
  const handleDelete = (_id) => {
    toast((t) => (
      <div>
        <p className="text-white">Do you want to delete the post?<strong>{_id}</strong></p>
        <div>
        <button className="g-red-500 hover:bg-red-400 px-3 py-2 text-sm  text-white rounded-sm mx-2" 
        onClick={async () => {
          await deletePost(_id);
          toast.dismiss(t.id);
        }}>  
        Delete</button>
        <button className="bg-slate-400 hover:bg-slate-500 px-3 py-2 mx-2 text-white rounded-sm" onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </div>  
      </div>
    ),{
      style: {
        background: "#202020"
      }
    })
  }
  return (
    <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
    onClick={() => navigate(`/post/${post._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3>{post.title}</h3>
          <button onClick={(e) => {
            e.stopPropagation()
            handleDelete(post._id)}} className="bg-red-600 text-sm px-2 py-1 rounded-sm hover:bg-red-400 mx-2" >
            Delete
          </button>
        </div>
        <p>{post.description}</p>
        {post.image && <img src={post.image.url} className= "mt-10 w-full h-full object-cover "/>}
      </div>
    </div>
  );
};
