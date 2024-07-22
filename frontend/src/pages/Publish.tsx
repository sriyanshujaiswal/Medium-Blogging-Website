import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () =>{

    const navigate = useNavigate()
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return <div>
        <Appbar/>
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                {/* <label className="block mb-2 text-sm font-medium text-gray-900">Your Email</label> */}
                <input onChange={(e)=> setTitle(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"/>
                   
                <TextEditor onChange={(e)=> setContent(e.target.value)}/>
                <button onClick={async () => {
                    const response =  await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content
                    },{
                        headers:{
                            Authorization: localStorage.getItem("token")
                        }  
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-green-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
    
}

function TextEditor({onChange} : {onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <form>
       <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-5">
           <div className="px-4 py-2 rounded-b-lg w-full bg-gray-50">
               <label className="sr-only">Publish post</label>
               <textarea onChange={onChange} id="editor" rows={8} className="block w-full text-sm text-gray-800 bg-gray-50 border-0 pl-2 pt-2" placeholder="Write an article..." required ></textarea>
           </div>
       </div>
    </form>
    
}