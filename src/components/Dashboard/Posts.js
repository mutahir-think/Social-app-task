import React,{Component} from 'react';
import firebase from '../../Firebase';
import {Route,Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStory} from '../Store/Actions/StoryActions';
import Profile from './Profile';
import './css/Posts.css';

class Posts extends Component{
    state={
        Title:'',
        Story:'',
        isLoggedOut:false,
        userName:''
    }

    componentDidMount(){
        firebase.database().ref().child('UserRecord')
        .once('value',data=>{
                data.forEach(key => {
                    if(this.props.match.params.email===key.val().Email)
                    {
                        this.setState({userName:key.val().Name})
                    }
                });
        })
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    LogOut = () =>{
        this.setState({isLoggedOut:true})
    }


    handleSubmit = (e) =>{
        e.preventDefault();
        const data ={
            authorName:this.state.userName,
            authorEmail:this.props.match.params.email,
            storyTitle:this.state.Title,
            storyDiscription:this.state.Story
        }
        this.props.CreateStory(data);

        this.setState({Title:'',Story:''})
    }

    render(){
        var data = this.props.match;

        if(this.state.isLoggedOut===true)
        {
            return <Redirect to="/signin" />
        }
        {
            return(
                <div className="postsContainer">
                    <div className="header">
                        <h1>Socialogy</h1>
                        <ul>
                            <li><Link style={{textDecoration:'none',color:'white'}} to={`/userprofile/${data.params.email}`}>Posts</Link></li>
                            <li><Link style={{textDecoration:'none',color:'white'}} to={`/userprofile/${data.params.email}/profile`}>Profile</Link></li>
                            <li><Link style={{textDecoration:'none',color:'white'}} to='#' onClick={this.LogOut}>Log Out</Link></li>
                        </ul>
                    </div>
                   
                    <div className="postsBody">
                        <div className="createStory">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" name="Title" value={this.state.Title} onChange={this.handleInput} />
                                <textarea name="Story" cols="10" rows="8" value={this.state.Story} onChange={this.handleInput} ></textarea>
                                <button>Post Story</button>
                            </form>
                        </div>
                        <div className="stories">
                            <h1 style={{textAlign:'center'}}>Latest Stories</h1>
                            {
                                this.props.Stories.map((story,i)=>{
                                    return (
                                        <div key={i} className="story">
                                            <h4 style={{margin:'3px'}}>Author Name: {  story.authorName }</h4>
                                            <h4 style={{margin:'3px'}}>Author Email: {  story.authorEmail }</h4>
                                            <h2 style={{margin:'3px',marginTop:'10px'}}>{  story.storyTitle }</h2> 
                                            <p style={{margin:'3px'}}>{  story.storyDiscription }</p>   
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <Route path={`/userprofile/:email/profile`} component={Profile} />
                </div> 
            );
        }
    }
}
const mapStateToProps = (State) =>{
    return{
        Stories:State.storyData
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        CreateStory:(data)=>dispatch(createStory(data))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Posts);