import axios from "axios";
import { useSelector } from "react-redux";
import { gitHubURL } from "../../redux/auth/authSelectors";
import { useEffect, useState } from "react";

export const useFetchGitHub = () => {
  const [data, setData] = useState("");
  const gitHubUser = useSelector(gitHubURL);

  useEffect(() => {
    const fetchData = async () => {
      if (gitHubUser !== "none" || gitHubUser !== "") {
        const gitHubName = gitHubUser.split("/");

        const BASE_URL = "http://api.github.com/users";
        const userName = gitHubName[3];
        console.log(userName);
        const client_id = process.env.REACT_APP_CLIENT_ID;
        const client_secret = process.env.REACT_APP_CLIENT_SECRET;

        console.log(client_id);
        console.log(client_secret);
        try {
          const response = await axios.get(
            `${BASE_URL}/${userName}?client_id=${client_id}&client_secret=${client_secret}&sort=created`,
            null,
            null
          );
          const data = response.data;
          console.log(data.avatar_url);
          setData(data.avatar_url);
        } catch (err) {
          console.log(err.message);
          setData("");
        }
      } else {
        setData("");
      }
    };

    fetchData();
  }, [gitHubUser]);

  return { data };
};
