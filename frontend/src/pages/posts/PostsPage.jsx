import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, findPostsByTopic, deletePost, editPost, sendComment, deleteComment, editComment } from '../../redux/post/postOperations';
import SideBarMenu from '../../components/side-bar-menu/SideBarMenu';
import { useParams } from "react-router-dom";
import './PostsPage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import jsonData from './pageContent.json'
import DeleteCommentModal from "../../components/modals/DeleteCommentModal";
import DeletePostModal from "../../components/modals/DeletePostModal";
import EditCommentModal from "../../components/modals/EditCommentModal";
import EditPostModal from "../../components/modals/EditPostModal";

const PostsPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        file: null,
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = (post) => {
        setPostToChange(post);
        setShowEditModal(true)
    };
    const handleEditTitle = (newTitle) => {
        setPostToChange({ ...postToChange, title: newTitle });
    };

    const handleEditMessage = (newMessage) => {
        setPostToChange({ ...postToChange, message: newMessage });
    };

    const [showEditCommentModal, setShowEditCommentModal] = useState(false);
    const handleCloseEditCommentModal = () => setShowEditCommentModal(false);
    const handleShowEditCommentModal = (post, comment) => {
        setPostToChange(post);
        setCommentToChange(comment)
        setShowEditCommentModal(true)
    };

    const handleEditCommentMessage = (newMessage) => {
        setCommentToChange({ ...commentToChange, text: newMessage });
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (post) => {
        setPostToChange(post);
        setShowDeleteModal(true)
    };

    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
    const handleCloseDeleteCommentModal = () => setShowDeleteCommentModal(false);
    const handleShowDeleteCommentModal = (post, comment) => {
        setPostToChange(post);
        setCommentToChange(comment)
        setShowDeleteCommentModal(true)
    };

    const [posts, setPosts] = useState([]);
    const [pageInfos, setPageInfos] = useState([]);
    const dispatch = useDispatch();
    const { topic } = useParams();
    const [postToChange, setPostToChange] = useState(null);
    const [commentToChange, setCommentToChange] = useState(null);
    const loggedInUser = useSelector((state) => state.auth.user);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const topicSelected = topic || 'road-presentation';

        const body = {
            title: e.target.elements.title.value,
            message: e.target.elements.message.value,
            topic: topicSelected
        };

        const response = await dispatch(createPost(body));
        if (response.error) {
            console.error(response.error.message);
        } else {
            fetchData();
            setFormData({ title: "", message: "", file: null });
        }
    };

    const handleDeletePost = async (post) => {
        const response = await dispatch(deletePost(post._id));
        if (response.error) {
            console.error(response.error.message);
        } else {
            setPosts((prevPosts) => prevPosts.filter(p => p._id !== post._id));
            handleCloseDeleteModal()
        }
    };

    const handleEditPost = async (post) => {
        const response = await dispatch(editPost(post));
        if (response.error) {
            console.error(response.error.message);
        } else {
            setPosts((prevPosts) => prevPosts.map(p => (p._id === post._id ? post : p)));
            handleCloseEditModal()
        }
    };

    const handleSubmitComment = async (e, post) => {
        e.preventDefault();
        const commentText = e.target.elements.comment.value;
        const response = await dispatch(sendComment({ post, commentText }));
        if (response.error) {
            console.error(response.error.message);
        } else {
            fetchData();
            e.target.elements.comment.value = ''
        }
    };

    const handleDeleteComment = async (postToChange, commentToChange) => {
        const postAndComment = {
            postId: postToChange._id,
            commentId: commentToChange._id
        }
        const response = await dispatch(deleteComment(postAndComment));
        if (response.error) {
            console.error(response.error.message);
        } else {
            fetchData();
            setShowDeleteCommentModal(false)
        }
    };

    const handleEditComment = async (e, postToChange, commentToChange) => {
        e.preventDefault();
        const postAndComment = {
            postId: postToChange._id,
            commentId: commentToChange._id,
            message: commentToChange.text
        }
        const response = await dispatch(editComment(postAndComment));
        if (response.error) {
            console.error(response.error.message);
        } else {
            fetchData();
            setShowEditCommentModal(false)
        }
    };

    const fetchData = async () => {
        try {
            const topicSelected = topic || 'road-presentation';
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

    const findPageInfo = () => {
        const topicSelected = topic || 'home';
        setPageInfos(jsonData.find(item => item.topic === topicSelected));
    };

    useEffect(() => {
        fetchData();
        findPageInfo()
    }, [dispatch, topic, loggedInUser]);

    return (
        <div className="page-body">
            <div className="row">
                <div className="col-md-3">
                    <SideBarMenu />
                </div>
                <div className="col-md-9 py-4">

                    <div className="row">
                        <div className="col-8">
                            <h2 className="topic-title border-bottom">About this topic:</h2>
                            {pageInfos && (
                                <div className="title-container">
                                    <h3>{pageInfos.title}</h3>
                                </div>
                            )}
                            {pageInfos && (
                                <div className="sub-title-container">
                                    <p className="text-justify">{pageInfos.info}</p>
                                </div>
                            )}
                        </div>
                        <div className="col img-fluid img-post">
                            {pageInfos && (
                                <img className="post-image" src={"/images/" + pageInfos.imageUrl} alt="" />
                            )}
                        </div>
                    </div>
                    <div className="post-title-container">
                        <h5>Write a new post:</h5>
                    </div>
                    <div className="custom-border border p-4">
                        <Form onSubmit={(e) => handleSendMessage(e)}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Insert a title"
                                    minLength="1"
                                    maxLength="60"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3" name="file">
                                <Form.Label>Image - optional</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="message">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Insert a message for your post"
                                    minLength="1"
                                    maxLength="4000"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary">
                                Submit
                            </Button>
                        </Form>
                    </div>

                    <EditPostModal
                        show={showEditModal}
                        handleClose={handleCloseEditModal}
                        handleEditPost={handleEditPost}
                        postToChange={postToChange}
                        handleEditTitle={handleEditTitle}
                        handleEditMessage={handleEditMessage}
                    />

                    <EditCommentModal
                        show={showEditCommentModal}
                        handleClose={handleCloseEditCommentModal}
                        handleEditComment={handleEditComment}
                        postToChange={postToChange}
                        commentToChange={commentToChange}
                        handleEditCommentMessage={handleEditCommentMessage}
                    />

                    <DeletePostModal
                        show={showDeleteModal}
                        handleClose={handleCloseDeleteModal}
                        handleDeletePost={handleDeletePost}
                        postToChange={postToChange}
                    />

                    <DeleteCommentModal
                        show={showDeleteCommentModal}
                        handleClose={handleCloseDeleteCommentModal}
                        handleDeleteComment={handleDeleteComment}
                        postToChange={postToChange}
                        commentToChange={commentToChange}
                    />


                    <div className="other-posts">
                        {posts && posts.length > 0 && (
                            <>
                                <h5 className="border-bottom font-weight-bold">Other posts about this topic:</h5>
                                {posts && posts.map((post) => (
                                    <Card style={{ width: '50rem', backgroundColor: '#F5F5F5' }} key={post._id} className="mx-auto my-4">
                                        {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                                        <Card.Body>
                                            <Card.Title className="">{post.title}</Card.Title>
                                            <Card.Body className="text-start">
                                                <small className="text-start">Author: {post.user}</small>
                                                <p>Create at: {formatDate(post.create_at)}</p>
                                            </Card.Body>
                                        </Card.Body>

                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>Create at: {formatDate(post.create_at)}</ListGroup.Item>
                                        </ListGroup>

                                        <Card.Body>
                                            <Card.Text>
                                                {post.message}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Body className="text-end">
                                            {post.user === loggedInUser.name && (
                                                <>
                                                    <div className="button-container">
                                                        <Button variant="secondary" size="sm" onClick={() => handleShowEditModal(post)} className="clickable mb-2 mx-1">
                                                            Edit
                                                        </Button>

                                                        <Button variant="danger" size="sm" onClick={() => handleShowDeleteModal(post)} className="clickable mb-2 mx-1">
                                                            Delete
                                                        </Button>
                                                    </div>

                                                </>
                                            )}

                                            <Form onSubmit={(e) => handleSubmitComment(e, post)}>
                                                <hr />
                                                <Form.Group controlId="comment">
                                                    <Form.Control type="text" placeholder="Type your comment" minLength="1" maxLength="4000" style={{ marginTop: '2em' }} />
                                                </Form.Group>
                                                <Button variant="primary" type="submit" size="sm"> Add comments </Button>
                                            </Form>

                                            {post.comments && post.comments.length > 0 ? (
                                                post.comments.map((comment) => (
                                                    <div className="text-start border-comment" key={comment._id}>
                                                        <b>{comment.user === loggedInUser.name ? 'You' : comment.user}</b><small> at {formatDate(comment.createdAt)} commented:</small>
                                                        <br />
                                                        <p className="ms-3 mb-0">{comment.text}</p>
                                                        {comment.user === loggedInUser.name && (
                                                            <>
                                                                <div className="button-container text-end">

                                                                    <Button variant="secondary" size="sm" className="me-2" onClick={() => handleShowEditCommentModal(post, comment)}>Edit</Button>
                                                                    <Button variant="danger" size="sm" onClick={() => handleShowDeleteCommentModal(post, comment)}>Delete</Button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-start ms-3 mb-3">
                                                    No comments available.
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                ))}
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div >
    );
};

export default PostsPage;