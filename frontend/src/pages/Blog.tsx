import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";



export const Blog = ()=>{

    const { id } = useParams();

    const {loading, blog} = useBlog({
        id : id || ""
    });

    if(loading){
        return <div className="h-screen flex justify-center">
            <div className="flex justify-center">
                Loading...
            </div>
        </div>
    }

    return <div>
        <FullBlog Blog={blog}/>
    </div>
}