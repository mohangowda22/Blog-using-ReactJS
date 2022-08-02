import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Post.css';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

class Post extends Component {
    confirmDeletion = () => {
        const { _id } = this.props.info;

        Swal.fire({
            title: 'Delete this one?',
            text: "This action can not be canceled!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'No, Cancel'
        }).then((result) => {
            if (result.value) {
                this.props.deletePost(_id)
                Swal.fire(
                    'Press OK to back',
                    'The post has been deleted',
                    'success'
                )
            }
        })
    }


    render() {
        const { _id, title, data, date } = this.props.info;
        return (
            <Paper className="col-sm-12">
                <p className="post_title" cols="12">
                    <b><span className='post-preview'>
                        {title.length > 25 ? `${title.substr(0, 25)}...` : title}
                    </span></b>
                </p>
                <p><span className='post_body justify-content-center'>
                    {data}
                </span></p>
                <p className="post_datestamp"><b>{moment(date).fromNow()}</b></p>
                <div className="post_button">
                    <ul className="buttons row text-center">
                        <div className='col-sm-4'><Link to={`/post/${_id}`} className="btn btn-primary"> Show </Link></div>
                        <div className='col-sm-4'><Link to={`/edit/${_id}`} className="btn btn-warning"> Edit </Link></div>
                        <div className='col-sm-4'><Link to="#" onClick={this.confirmDeletion} className="btn btn-danger">Delete</Link></div>
                    </ul>
                </div>
            </Paper>
        );
    }
}
export default Post;