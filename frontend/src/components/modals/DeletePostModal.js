import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeletePostModal = ({ show, handleClose, handleDeletePost, postToChange }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete post</Modal.Title>
            </Modal.Header>
            {postToChange && (
                <div>
                    <Modal.Body>
                        Are you sure you want to delete the <b>{postToChange.title}</b> post?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleDeletePost(postToChange)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </div>
            )}
        </Modal>
    );
};

export default DeletePostModal;
