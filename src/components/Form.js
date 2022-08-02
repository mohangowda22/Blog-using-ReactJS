import React, { Component } from 'react';
 
class Form extends Component {
    //create refs
    titleRef = React.createRef();
    dataRef = React.createRef();
    
 
    createPost = (e) => {
        e.preventDefault();
 
        const post = {
            title: this.titleRef.current.value,
            data: this.dataRef.current.value,
        }
 
        this.props.createPost(post);
 
    }
 
 
    render() { 
        return ( 
            <form onSubmit={this.createPost} className="col-md-10">
                <legend className="text-center">Create New Post</legend>
 
                <div className="form-group">
                    <label>Title for the Post:</label>
                    <input type="text" ref={this.titleRef} className="form-control" placeholder="Title.." />
                </div>

                <div className="form-group">
                    <label>Content:</label>
                    <textarea className="form-control" rows="7"cols="25" ref={this.dataRef} placeholder="Here write your content.."></textarea>
                </div>
 
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
         );
    }
}
 
export default Form;