import React, { useEffect, useState } from "react";
import EditProfileUser from "../../components/EditProfileUser/EditProfileUser";
import SideBarMenu from "../../components/side-bar-menu/SideBarMenu";
import { findPostsByUser } from "../../redux/post/postOperations";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../redux/auth/authSelectors";
import { Card } from "react-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(setName);
  const [userPosts, setUserPosts] = useState(null);

  const fetchUserPosts = async () => {
    const response = await dispatch(findPostsByUser({ user: user }));
    console.log(response);
    setUserPosts(response.payload);
  };

  useEffect(() => {
    fetchUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-3">
            <SideBarMenu />
          </div>
          <div className="col-md-9">
            <div className="row pb-5">
              <div className="col-13 pb-5">
                <EditProfileUser />
              </div>
              <div className="col-13 pb-5">
                {userPosts &&
                  userPosts.map((post) => (
                    // <div key={post._id}>
                    //   <h4>{post.title}</h4>
                    //   <p>{post.message}</p>
                    //   <p>{post.create_at}</p>
                    // </div>
                    <Card
                      style={{ width: "50rem", backgroundColor: "#F5F5F5" }}
                      key={post._id}
                      className="mx-auto my-4"
                    >
                      <Card.Body>
                        <Card.Title className="">{post.title}</Card.Title>
                        <Card.Body>
                          <Card.Text>{post.message}</Card.Text>
                        </Card.Body>
                        <Card.Body className="text-start">
                          <small className="text-start">
                            Created: {post.create_at}
                          </small>
                        </Card.Body>
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
