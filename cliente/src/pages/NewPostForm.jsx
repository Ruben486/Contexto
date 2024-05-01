import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePost } from "../context/postContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as yup from "yup";
import { useEffect, useState } from "react";
import  {AiOutlineLoading3Quarters } from 'react-icons/ai';
import toast from 'react-hot-toast';

export default function PostForm() {
  const { createPost, getPost, updatePost } = usePost();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        
        const posteo = await getPost(params.id);
        setPost({
          title: posteo.title,
          description: posteo.description
        });
      }
    })();
  }, [params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black" >
        <header className= "flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300  ">Go back</Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={yup.object({
            title: yup.string().required("El titulo es requerido"),
            description: yup.string().required("La descripcion es requerida"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id,values)
            } else {
              await createPost(values);
              console.log(values)
            }
            actions.setSubmitting(false);
            toast.success('Se añadio un nuevo post')
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit,setFieldValue,isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block font-bold text-gray-400"
              >
                Title
              </label>
              <Field
                name="title"
                placeholder="titulo"
                className="px-3 py-2 focus:outline:none rounded bg-gray-600
              text-white w-full mb-4"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />
              <label
                htmlFor="description"
                className="text-sm block font-bold text-gray-400"
              >
                Description
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="descripcion"
                className="px-3 py-2 focus:outline:none rounded bg-gray-600
              text-white w-full mb-4"
                rows={3}
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />
              <label
                htmlFor="image"
                className="text-sm block font-bold text-gray-400"
              >
                Imagen
              </label>
              <input type="file" name="image" className="px-2 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" onChange={(e) => setFieldValue('image',e.target.files[0])}>

              </input>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className=" animate-spin h-5 w-5" /> 
                )
                : 'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
