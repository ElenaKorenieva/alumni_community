import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, findPostsByTopic, deletePost, editPost } from '../../redux/post/postOperations';
import SideBarMenu from '../../components/side-bar-menu/SideBarMenu';
import { useParams } from "react-router-dom";
import './PostsPage.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jsonData from './pageContent.json'

const PostsPage = () => {
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

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = (post) => {
        setPostToChange(post);
        setShowDeleteModal(true)
    };

    const [posts, setPosts] = useState([]);
    const [pageInfos, setPageInfos] = useState([]);
    const dispatch = useDispatch();
    const { topic } = useParams();
    const [postToChange, setPostToChange] = useState(null);
    const loggedInUser = useSelector((state) => state.auth.user);

    // const [loggedInUser, setLoggedInUser] = useState(null);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const topicSelected = topic || 'home';

        const body = {
            title: e.target.elements.title.value,
            message: e.target.elements.message.value,
            topic: topicSelected
        };

        const response = await dispatch(createPost(body));
        if (response.error) {
            console.error(response.error.message);
        } else {
            window.location.reload();
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

    const findPageInfo = () => {
        const topicSelected = topic || 'home';
        setPageInfos(jsonData.find(item => item.topic === topicSelected));
    };

    useEffect(() => {
        // console.log(useSelector((state) => state.user));
        // setLoggedInUser();
        console.log(loggedInUser);


        fetchData();
        findPageInfo()
    }, [dispatch, topic, loggedInUser]);

    return (
        <div className="page-body">
            <div className="row">
                <div className="col-md-3">
                    <SideBarMenu />
                </div>
                <div className="col-md-9 px-5 py-4">
                    <h1>About this topic:</h1>
                    {pageInfos && (
                        <h3>{pageInfos.title}</h3>
                    )}
                    <div className="row">
                        <div className="col-8">
                            {pageInfos && (
                                <p>{pageInfos.info}</p>
                            )}
                        </div>
                        <div className="col img-fluid">
                            {pageInfos && (
                                <img src={"/images/" + pageInfos.imageUrl} alt="" />
                            )}

                        </div>
                    </div>
                    <h3>Write a new post:</h3>
                    <Form onSubmit={(e) => handleSendMessage(e)}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Insert a title" minLength="1" maxLength="60" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3" name="file">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="message">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Insert a message for your post" minLength="1" maxLength="4000" />
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
                    </Form>

                    <Modal show={showEditModal} onHide={handleCloseEditModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Post</Modal.Title>
                        </Modal.Header>
                        {postToChange && (
                            <div>
                                <Modal.Body>

                                    <Form onSubmit={() => handleEditPost(postToChange)}>
                                        <Form.Group className="mb-3" controlId="title">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text"
                                                placeholder="Insert a title"
                                                minLength="1" maxLength="60"
                                                value={postToChange.title || ""}
                                                onChange={(e) => handleEditTitle(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formFile" className="mb-3" name="file">
                                            <Form.Label>Image</Form.Label>
                                            <Form.Control type="file" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="message">
                                            <Form.Label>Message</Form.Label>
                                            <Form.Control as="textarea" rows={3}
                                                placeholder="Insert a message for your post"
                                                minLength="1" maxLength="4000"
                                                value={postToChange.message}
                                                onChange={(e) => handleEditMessage(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseEditModal}>
                                                Close
                                            </Button>
                                            <Button variant="primary" type="submit">
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal.Body>
                            </div>
                        )}
                    </Modal>


                    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete post</Modal.Title>
                        </Modal.Header>
                        {postToChange && (
                            <div>
                                <Modal.Body>Are you sure you want to delete the <b>{postToChange.title}</b> post?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => handleDeletePost(postToChange)}>
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </div>
                        )}

                    </Modal>
                    <div className="other-posts">
                        {posts && posts.length > 0 && (
                            <>
                                <h3>Other posts about this topic:</h3>
                                {posts && posts.map((post) => (
                                    <Card style={{ width: '50rem' }} key={post._id} className="mx-auto my-4">
                                        {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                                        <Card.Body>
                                            <Card.Title className="text-end">{post.title}</Card.Title>
                                            <Card.Body className="text-end">
                                                <small className="text-end">Author: {post.user}</small>
                                            </Card.Body>
                                        </Card.Body>
                                        <Card.Body>
                                            <Card.Text>
                                                {post.message}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>Create at: {formatDate(post.create_at)}</ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body className="text-end">
                                            {post.user === loggedInUser.name && (
                                                <>
                                                    <Card.Link onClick={() => handleShowEditModal(post)} className="clickable">Edit</Card.Link>
                                                    <Card.Link onClick={() => handleShowDeleteModal(post)} className="clickable">Delete</Card.Link>
                                                </>
                                            )}
                                            <Card.Link href="#" className="clickable">See comments</Card.Link>
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