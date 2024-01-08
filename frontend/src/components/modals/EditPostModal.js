import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditPostModal = ({ show, handleClose, handleEditPost, postToChange, handleEditTitle, handleEditMessage }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            {postToChange && (
                <div>
                    <Modal.Body>
                        <Form onSubmit={() => handleEditPost(postToChange)}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Insert a title"
                                    minLength="1"
                                    maxLength="60"
                                    value={postToChange.title || ""}
                                    onChange={(e) => handleEditTitle(e.target.value)}
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
                                    value={postToChange.message}
                                    onChange={(e) => handleEditMessage(e.target.value)}
                                />
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
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
    );
};

export default EditPostModal;
