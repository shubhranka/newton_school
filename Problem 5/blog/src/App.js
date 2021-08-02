import './App.css';
import React from 'react';
import axios from './api/index';
import LogInJSX from './login/index'
// import {Route,Switch} from 'react-router-dom';
import Posts from './Posts';
import NewPost from './NewPost';
class App extends React.Component {
  state={
    token:null,
    user:null,
    posts :[],
    error:null,
    newPost:{
      render:false,
      title:"",
      data:"",
      id:null
    },
  }

  back = ()=>{
    this.setState({newPost:{
      render:false,
      title:"",
      data:"",
      id:null
    }})
  }

  createorUpdatePost=(title,data)=>{
    const {id} = this.state.newPost
    if(!id){
        axios.post("/post",{
        title,
        data,
        },{
            headers:{
                "x-access-token":`Bearer ${this.state.token}`
            },
        }).then(res=>{
       this.back();
        }).catch(e=>{
        });
    }
    else{
        axios.put(`/post/${id}`,{
            title,
            data
        },{
            headers:{
                "x-access-token":`Bearer ${this.state.token}`
            },
        }).then(res=>{
            this.back();
        }).catch(e=>{
        });
    }
  }
  logIn = async(usern,pass)=>{
    axios.post("/auth",{
      username:usern,
      password:pass
    }).then(res=>{
      // console.log(res);
      this.setState({token:res.data,user:usern})
    }).catch(e=>{
      console.log(e);
    });
  }
  logOut =()=>{
    this.setState({token:null,user:null,posts:[]})
  }

  onNewPost = (title,data,id) =>{
    const newPost = {
      render:true,
      title,
      data,
      id
    }
    this.setState({newPost})
  }

  render(){
    if(!this.state.token)
      return <LogInJSX onClick={this.logIn}/>;
    if(this.state.newPost.render)
      return <NewPost user={this.state.user} token={this.state.token} title={this.state.newPost.title} data={this.state.newPost.data} onBack={this.back} createorUpdatePost={this.createorUpdatePost}/>
    return <Posts token={this.state.token} user={this.state.user} onLogOut={this.logOut} onNewPost={this.onNewPost} />;
  //   const onlyLogin = <Switch><Route path="/" component={()=><LogInJSX onClick={this.logIn}/>}/></Switch>;
  //   const full = (<Switch>
  //   <Route path="/" exact component={()=><Posts token={this.state.token} user={this.state.user} onLogOut={this.logOut}/>}/>
  //   <Route path="/create" component={()=><NewPost user={this.state.user} token={this.state.token}/>}/>
  //   <Route path="/update" component={()=><NewPost user={this.state.user} token={this.state.token}/>}/>
  // </Switch>);
  //   console.log(this.state.token)
  //   return(
  //     <main>
  //       {this.state.token === null ? onlyLogin : full}
  //     </main>
    // )
  }
}
export default App;
