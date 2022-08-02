import React, { Component } from 'react';
import {useParams } from 'react-router-dom';

import moment from 'moment';
 
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import renderHTML from 'react-render-html';
 
class SinglePost extends Component {
 
    showPost = (props) => {
        if (!props.post) return null;
        let idPost=window.location.pathname.replace('/post/', '');
        const posts=props.post;
        let filter = posts.filter(post => (
            post._id === (idPost)
        )); 
        const {title,data,date} = filter[0];
 
        return (
            <React.Fragment>
 
                <Paper className="single_post"> 
                    <h4>Title: {title}</h4>
                    <Divider light />
                    <h5>Create At: {moment(date).format('DD MM YYYY')}</h5>
                    <div style={{ width: '60%' }}>{renderHTML(data)}</div>
                </Paper>
            </React.Fragment>
        )
 
    }
    render() {
        return (
            <div className=" col-md-10">
                {this.showPost(this.props)} 
            </div>
        );
    }
}
 
 
export default SinglePost;