import { useLocation,useParams } from "react-router-dom"
export default function Posts(){
    const urlstring = new URLSearchParams(useLocation().search);
    const {id}=useParams(); 
    const fname=urlstring.get("fname");
    const lname=urlstring.get("lname");
    return (<h1>Posts Hello {fname} {lname} {id}</h1>)
}