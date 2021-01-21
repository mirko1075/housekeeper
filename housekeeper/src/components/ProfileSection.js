import React, { useState, useEffect } from "react";
import axios from "axios";
import userService from "./../lib/user-service";
const {REACT_APP_CLOUDINARY_URL, REACT_APP_UPLOAD_PRESET} = process.env;

const ProfileSection = (props) => {

  console.log( "REACT_APP_UPLOAD_PRESET", REACT_APP_UPLOAD_PRESET )

  const [username, setUsername] = useState(props.user.username);
  const [image, setImage] = useState(props.user.image);
  const [showEdit, setshowEdit] = useState(false);

  const toggleShowEdit = () => {
    setshowEdit(!showEdit);
  };

  const cancelEdit = () => {
    setUsername(props.user.username);
    setImage(props.user.image);
    toggleShowEdit();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", REACT_APP_UPLOAD_PRESET);
    axios
      .post(
        REACT_APP_CLOUDINARY_URL,
        uploadData
      )
      .then((response) => {
        setImage(response.data.secure_url);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  const handleInput = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    userService.editProfile(username, image).then((response) => {
      setUsername(response.data.username);
      setImage(response.data.image);
      toggleShowEdit();
    });
  };

  useEffect(() => {
    setUsername(props.user.username);
    setImage(props.user.image);
  }, []);

  return (
    <div>
      {showEdit ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <img src={image} />
          <br />
          <label htmlFor="image">Change photo</label>
          <br />
          <input type="file" onChange={handleFileUpload} />
          <br />
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => handleInput(e)}
          />
          <br />
          <button type="submit">Submit</button>
          <button onClick={cancelEdit}>Cancel</button>
        </form>
      ) : (
        <div>
          <h2>{username}</h2>
          <br />
          <img src={image} />
          <br />
          <button onClick={toggleShowEdit}>Edit info</button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
