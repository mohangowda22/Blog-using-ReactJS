import React, { Component } from 'react';

class EditPost extends Component {
    titleRef = React.createRef();
    dataRef = React.createRef();
    idRef = React.createRef();
    editPost = (e) => {
        e.preventDefault();
        const post = {
            title: this.titleRef.current.value,
            data: this.dataRef.current.value,
            _id: this.idRef.current.value
        }
        this.props.editPost(post);
    }

    loadForm = () => {
        if (!this.props.post) return null;
        if (!this.props.post) return null;
        let idPost = window.location.pathname.replace('/edit/', '');
        const posts = this.props.post;
        let filter = posts.filter(post => (
            post._id === (idPost)
        ));
        const { _id,title, data } = filter[0];

        return (
            <form onSubmit={this.editPost} className="col-md-10">
                <legend className="text-center">Edit Post</legend>
                <input type="text" ref={this.idRef} className="form-control" hidden defaultValue={_id} />
                <div className="form-group">
                    <label>Title for the Post:</label>
                    <input type="text" ref={this.titleRef} className="form-control" defaultValue={title} />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea className="form-control" rows="7"cols="25" ref={this.dataRef} placeholder="Here write your content.." defaultValue={data}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" >Save changes</button>
            </form>
        );
    }


    render() {
        return (
            <React.Fragment>
                {this.loadForm()}
            </React.Fragment>
        );
    }
}

export default EditPost;