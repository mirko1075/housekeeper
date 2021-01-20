import React, { Component } from "react";
import axios from "axios";
import userService from "./../lib/user-service";

require("dotenv").config();

class ProfileSection extends Component {
  state = {
    username: "",
    image: "",
    showEdit: false,
  };

  toggleShowEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  cancelEdit = () => {
    this.setState({
      username: this.props.user.username,
      image: this.props.user.image,
    });
    this.toggleShowEdit();
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "bsvrccwa");
    axios
      .post(
        `https://api.cloudinary.com/v1_1/dzzmsb8wl/image/upload`,
        uploadData
      )
      .then((response) => {
        this.setState({ image: response.data.secure_url });
        console.log("this.state.image :>> ", this.state.image);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, image } = this.state;
    userService.editProfile(username, image).then((response) => {
      this.setState({
        username: response.data.username,
        image: response.data.image,
      });
      this.toggleShowEdit();
    });
  };

  componentDidMount() {
    this.setState({
      username: this.props.user.username,
      image: this.props.user.image,
    });
  }

  render() {
    return (
      <div>
        {this.state.showEdit ? (
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <img src={this.state.image} />
            <label htmlFor="image">Change photo</label>
            <input type="file" onChange={this.handleFileUpload} />
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInput}
            />
            <button type="submit">Submit</button>
            <button onClick={this.cancelEdit}>Cancel</button>
          </form>
        ) : (
          <div>
            <h2>{this.state.username}</h2>
            <img src={this.state.image} />
            <button onClick={this.toggleShowEdit}>Edit info</button>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileSection;
