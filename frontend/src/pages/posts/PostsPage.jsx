import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPost, findPostsByTopic } from '../../redux/post/postOperations';
import SideBarMenu from '../../components/side-bar-menu/SideBarMenu';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const { topic } = useParams();


    const handleSendMessage = async (e) => {
        const topicSelected = topic || 'home';

        const body = {
            message: e.target.elements.message.value,
            topic: topicSelected
        };

        const response = await dispatch(createPost(body));
        if (response.error) {
            console.error(response.error.message);
        } else {
            console.log("Success");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const topicSelected = topic || 'home';
                const response = await dispatch(findPostsByTopic({ topic: topicSelected }));
                if (!response.error) {
                    const sortedPosts = response.payload ? response.payload : [];
                    sortedPosts.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
                    setPosts(sortedPosts);
                    console.log("Success");
                } else {
                    console.error(response.error.message);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [dispatch]);

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
                        {posts.map((post) => (
                            <div className="posts-box">
                                <div key={post._id}>
                                    <p>{post.message}</p>
                                    <a href="#" className="view-more-link">See more</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostsPage;