import { PostProvider } from "./context/postContext";
import HomePage from "./pages/Home";
import PostForm from "./pages/NewPostForm";
import NotFoundPage from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
      <div className="px-10 container m-auto">
        <PostProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new" element={<PostForm />} />
            <Route path="/post/:id" element={<PostForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </PostProvider>
      </div>
    </div>
  );
}
// 4.27.01
export default App;
