import React from "react";
import axios from "../api";
const Posts = (props) => {
    const [posts, setposts] = React.useState([]);
    const [selectedId, setselectedId] = React.useState(false);
    const deletePost = (id)=>{
        axios.delete(`/post/${id}`,{
            headers:{
                "x-access-token":`Bearer ${props.token}`
            }
        }).then(data=>{
            setselectedId(false);
        })
    }
    if(selectedId)
        deletePost(selectedId);
    React.useEffect(() => {
            axios.get("/posts",{
                headers:{
                "x-access-token":`Bearer ${props.token}`
                }
            }).then(res=>{
                setposts(res.data)
            }).catch(e=>{
                console.log(e)
            }) 
        }, [selectedId]);
        const resPosts = posts.map(e=>(
    <div className="post__container" key={e["_id"]}>
    <div data-testid="title" className="post__title">
      {e.postTitle}
    </div>
    <div className="post__data">
      {e.postData}
    </div>
    <div className="post__date-user">
      <div className="post__date">{e.postDate}</div>
      <div className="post__user">- {e.postUser}</div>
    </div>

    {e.postUser === props.user && <div className="post__delete" onClick={()=>{setselectedId(e['_id'])}}><span> Delete </span></div>}
    {e.postUser === props.user && <div className="post__update" onClick={()=>props.onNewPost(e.postTitle,e.postData,e["_id"])}><span> Update </span></div>}
  </div>
  ));
  return selectedId ? null : (<div className="container">
   <div className="new__post button" onClick={()=>props.onNewPost("","",null)}>  New Post</div>
  <div className="post__holder">
  {resPosts}
  </div>
  <div style={{display:'flex',flexDirection:'row'}}>
    <span>{props.user}</span>
  <div className="user__name button" onClick={props.onLogOut}>
    Logout
  </div>
  </div>

</div>);
}

export default Posts;