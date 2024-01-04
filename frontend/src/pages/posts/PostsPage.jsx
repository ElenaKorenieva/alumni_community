import './PostsPage.css';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from '../../redux/post/postOperations';
import SideBarMenu from '../../components/side-bar-menu/SideBarMenu';

const PostsPage = () => {
    const dispatch = useDispatch();

    const handleSendMessage = async (e) => {
        const body = {
            message: e.target.elements.message.value,
            user: 'test_user',
            topic: 'test'
        };

        const response = await dispatch(createPost(body));
        if (response.error) {
            console.log(response.payload);
        } else {
            console.log("Success");
        }
    };

    return (
        <div className="page-body">
            <div className="row">
                <div className="col-md-3">
                    <SideBarMenu />
                </div>
                <div className="col-md-9">
                    <h1>About this topic:</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidi</p>
                    <h3>Write a new post:</h3>
                    <form onSubmit={(e) => handleSendMessage(e)}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="postContent" name='message' />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                    <div className="other-posts">
                        <h3>Other posts about this topic:</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostsPage;