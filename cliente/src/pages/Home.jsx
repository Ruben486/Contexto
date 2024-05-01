import { usePost } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { PostCard } from "../components/postCard";

export default function HomePage() {
  const { posts } = usePost();
  /* if (posts.length === 0) {
    return (
      <div className= "flex flex-col justify-center text-center">
        <VscEmptyWindow className="w-32 h-32 text-white" />
        <h1 className="text-2xl">No hay publicaciones aun</h1>
      </div>
    );
  } */

  return (
    <div>
      <header className="flex justify-between py-4">
      <h1 className="text-2xl text-gray-300 font-extrabold ">POSTS ({posts.length})</h1>
      <Link to="/new">Crear una nueva publicacion</Link>
      </header>
      <div className="grid grid-cols-3 gap-2">
        
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
