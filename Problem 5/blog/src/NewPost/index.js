import React,{useState} from "react";
import "./NewPost.css"
const NewPost = (props) =>{
    const [title, setTitle] = useState(props.title);
    const [data, setData] = useState(props.data);

      return (
          <div>
        <form onSubmit={(e)=> {e.preventDefault(); return props.createorUpdatePost(title,data)}}>
            <div className="create__container">
                <div className="input__box">
                    <input type="text" name="title" id="title" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder="Post Title"/>
                </div>
                <div className="input__box" onChange={(e)=>setData(e.target.value)} value={data}>
                    <input type="text" name="data" id="data" onChange={(e)=>setData(e.target.value)} value={data} placeholder="Post Data"/>
                </div>
                <button className="button">Create</button>
            </div>
        </form>
            <button className="button" onClick={props.onBack}>Back</button>
            </div>
        );
}

export default NewPost;