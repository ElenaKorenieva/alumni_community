import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditCommentModal = ({ show, handleClose, handleEditComment, postToChange, commentToChange, handleEditCommentMessage }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Comment</Modal.Title>
            </Modal.Header>
            {postToChange && (
                <div>
                    <Modal.Body>
                        <Form onSubmit={(e) => handleEditComment(e, postToChange, commentToChange)}>
                            <Form.Group className="mb-3" controlId="message">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Insert a message for your post"
                                    minLength="1"
                                    maxLength="4000"
                                    value={commentToChange ? commentToChange.text : ""}
                                    onChange={(e) => handleEditCommentMessage(e.target.value)}
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

export default EditCommentModal;
