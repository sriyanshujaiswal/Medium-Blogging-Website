import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { signupType } from "@sriyanshujaiswal/medium-common"
import axios from "axios";
import { BACKEND_URL } from "../../config.ts"

export const Auth = ({type}: {type: "signup" | "signin"}) => {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState("");
    // const [name, setName] = useState("")

    const navigate = useNavigate(); 

    const [postInputs, setPostInputs] = useState<signupType>({
        name: "",
        email : "",
        password: ""
    })

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }catch(e){
            //alert
        }
    }
    
    return <div className="h-screen flex justify-center items-center">
        <div className="flex-col">
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    {type === "signup" ?  "Create your Account" : "Login your Account"}
                </div>
                <div className="text-slate-400 text-light">
                   {type=== "signin" ?  "Don't have an account" :"Already have an account?"}
                    <Link className="pl-2 underline text-blue-400" to={type === "signin" ? "/signup" : "/signin"}>
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
            </div>
            {type === "signup" ? <LabelledInput label="Name" placeholder="Enter your name" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                })
            }}/> : null}
            
            <LabelledInput label="Username" placeholder="Enter your username " onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    email: e.target.value,
                })
            }}/>
            <LabelledInput label="Password" type={"password"} placeholder="Enter your password" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                })
            }}/>
            <button onClick={sendRequest} type="button" className="w-full mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"> 
                {type === "signup" ? "Sign Up" : "Sign in"}
            </button>

        </div>
    </div>
}

interface LabelledInputType{
    label: string;
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void 
    type?: string
}

function LabelledInput({label, placeholder, onChange, type} : LabelledInputType){
    return <div>
        <div className="mt-3">
            <label className="block mb-2 text-sm text-black font-bold ">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}