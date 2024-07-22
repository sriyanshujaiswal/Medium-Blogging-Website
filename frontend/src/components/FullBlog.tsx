import { Blogs } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({Blog}: {Blog: Blogs | undefined}) => {
    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-20 w-full max-w-screen-xl pt-12 ">
                <div className="col-span-8 pl-10">
                    <div className="text-3xl font-extrabold ">
                        {Blog?.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 18 Jun 2024
                    </div>
                    <div className="pt-4">
                        {Blog?.content}
                    </div>
                </div>
                <div className="col-span-4 ">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={Blog?.author.name || "Anonymous"}/>
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {Blog?.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}  