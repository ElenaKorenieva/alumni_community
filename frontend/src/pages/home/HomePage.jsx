import "./HomePage.css";
import SideBarMenu from "../../components/side-bar-menu/SideBarMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import { findFeed } from "../../redux/post/postOperations";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [feed, setFeed] = useState(null);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    const response = await dispatch(findFeed());

    const sortedPosts = response.payload ? response.payload : [];
    sortedPosts.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));

    setFeed(sortedPosts);
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
    fetchFeed();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <SideBarMenu />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="pb-5">
              <div className="home-container mt-5">
                <h3 className="home-title">Hello and welcome!</h3>

                <div className="row journey-section">
                  <div className="col-md-8">
                    <h4 className="homeArticle-title text-center">A Journey Beyond Bootcamp</h4>
                    <h5 className="text-center">Choose the topic in the left side menu and post now!</h5>
                  </div>
                  <div className="col-md-4 text-center">
                    <img
                      src="/images/logo_community.png"
                      width="80%"
                      alt="Programming"
                      className="image-home rounded"
                    />
                  </div>
                </div>

                <div className="menu-container pt-2">
                  <h2 className="menu-title topic-title border-bottom">How to use this community:</h2>
                  <div className="aboutImg-wrapper">
                    <img
                      src="/images/home_img_howto.png"
                      width="80%"
                      alt="Programming"
                      className="rounded mx-auto"
                    />
                  </div>
                </div>

                <div className="menu-container pt-2">
                  <h2 className="menu-title topic-title border-bottom">Check out the latest community posts:</h2>

                  {feed &&
                    feed.map((post) => (
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
      </div>
    </div>
  );
};

export default HomePage;
