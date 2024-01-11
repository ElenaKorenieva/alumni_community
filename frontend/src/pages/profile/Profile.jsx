import React, { useEffect, useState } from "react";
import EditProfileUser from "../../components/EditProfileUser/EditProfileUser";
import SideBarMenu from "../../components/side-bar-menu/SideBarMenu";
import { findPostsByUser } from "../../redux/post/postOperations";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../redux/auth/authSelectors";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(setName);
  const [userPosts, setUserPosts] = useState(null);

  const fetchUserPosts = async () => {
    const response = await dispatch(findPostsByUser({ user: user }));

    const sortedPosts = response.payload ? response.payload : [];
    sortedPosts.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));

    setUserPosts(sortedPosts);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }


  useEffect(() => {
    fetchUserPosts();
  }, []);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-3">
            <SideBarMenu />
          </div>
          <div className="col-md-9 pt-5">
            <h4 className="title-profile-page topic-title border-bottom">My Profile</h4>
            <div className="row pb-5">
              <div className="pb-5">
                <EditProfileUser />
              </div>
              <div>
                <h4 className="title-profile-page topic-title border-bottom">My latest community posts:</h4>
              </div>
              <div className="pb-5">
                {userPosts &&
                  userPosts.map((post) => (
                    <Card style={{ width: '50rem', backgroundColor: '#F5F5F5' }} key={post._id} className="mx-auto my-4">
                      <Card.Img
                        variant="top"
                        src={post.image ? `data:${post.image.contentType};base64,${arrayBufferToBase64(post.image.data.data)}` : ''}
                        style={{
                          maxHeight: '300px',
                          width: '100%',
                          objectFit: 'cover',
                          margin: 'auto',
                        }}
                      />

                      <Card.Body>
                        <small className="text-end">Author: {post.user}</small><br />
                        <small className="text-end">Create at: {formatDate(post.create_at)}</small>

                        <Card.Title className="">
                          {post.title}</Card.Title>

                        <Card.Text>
                          {post.message}
                        </Card.Text>

                      </Card.Body>
                      <Card.Body className="text-end">

                        <Button variant="primary" size="sm" className="mx-1 mb-2" disabled>
                          <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
                          <span className="mx-1">
                            {post.likes ? post.likes.length : 0}
                          </span>
                        </Button>

                        {post.comments && post.comments.length > 0 ? (
                          post.comments.map((comment) => (
                            <div className="text-start border-comment" key={comment._id}>
                              <b>You</b><small> at {formatDate(comment.createdAt)} commented:</small>
                              <br />
                              <p className="ms-3 mb-0">{comment.text}</p>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
