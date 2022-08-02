import React, { Component } from 'react';
 
import {BrowserRouter, Redirect } from 'react-router-dom';
import { Route, Routes } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2';
import {Header, Navigation} from './Layout';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Form from './Form';
import EditPost from './EditPost';
 
class Router extends Component {
    state = {  
        posts: []
    }
    
    componentDidMount() {
        this.getPost();
    }
 
    getPost = () => {
        axios.get(`http://localhost:4000/post`)
             .then( res => {
                 this.setState({
                     posts: res.data
                 }) 
             })
    }
 
    deletePost = (id) => {
        
        axios.delete(`http://localhost:4000/post/${id}`)
        .then(res => {
            if (res.status === 200) {
                const posts = [...this.state.posts];
                let result = posts.filter(post => (
                    post._id !== id
                ));
                this.setState({
                    posts: result
                })
            } 
        })
    }
 
    createPost = (post) => {
        axios.post(`http://localhost:4000/post`, {post})
             .then(res => {
                 if (res.status === 200) {
                    Swal.fire(
                        'Post Create',
                        'It is created correctly.',
                        'success'
                    )
                     axios.get(`http://localhost:4000/post`)
                         .then(res => {
                             this.setState({
                                 posts: res.data
                             })
                         })
                    // let postId = {id: res.data.id};
                    // const newPost = Object.assign({}, res.data.post, postId)
 
                    // this.setState(prevState => ({
                    //     posts: [...prevState.posts, newPost]
                    // }))
                 }
             })
    }
 
    editPost = (postUpdate) => {
        const {_id} = postUpdate;
 
        axios.put(`http://localhost:4000/post/${_id}`, {postUpdate})
             .then(res => {
                 if (res.status === 200) {
                    Swal.fire(
                        'Post Updated',
                        'The changes were saved correctly.',
                        'success'
                    )
 
                    let {_id} = postUpdate;
 
					const posts = [...this.state.posts];
 
                    const postEdit = posts.findIndex(post => _id === post._id)
 
                    posts[postEdit] = postUpdate;
                    this.setState({
                        posts 
                    })
                 }
             })
    }

    render() { 
        return (  
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <div className="row justify-content-center">
 
                        <Navigation />
 
                        <Routes>
                            <Route element={<Posts posts={this.state.posts} deletePost={this.deletePost} />} exact path="/" />

                            <Route exact path="/post/:postId" element={<SinglePost post={this.state.posts} />} />

                            <Route exact path="/create" element={<Form createPost={this.createPost} />} />

                            <Route exact path="/edit/:postId" element={<EditPost post={this.state.posts} editPost={this.editPost} />} />
                                                        {/* 
                                                        render={ (props) => {
                                let idPost = props.location.pathname.replace('/edit/', '')
                                const posts=this.state.posts;
                                let filter;
                                filter = posts.filter(post => (
                                    post.id === Number(idPost)
                                ))                                
                                return(
                                    <EditPost
                                        post={filter[0]} 
                                        editPost={this.editPost}
                                    />
                                )
                            }} */}
                        </Routes>
                    </div>
                </div>            
            </BrowserRouter>
        );
    }
} 
export default Router;