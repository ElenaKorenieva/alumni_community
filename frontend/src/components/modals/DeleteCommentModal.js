import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteCommentModal = ({ show, handleClose, handleDeleteComment, postToChange, commentToChange }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete comment</Modal.Title>
            </Modal.Header>
            {postToChange && (
                <div>
                    <Modal.Body>
                        Are you sure you want to delete the comment on the <b>{postToChange.title}</b> post?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleDeleteComment(postToChange, commentToChange)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </div>
            )}
        </Modal>
    );
};

export default DeleteCommentModal;
