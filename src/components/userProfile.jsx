import React, { Component } from "react";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";

const uplaodEndpoint = apiUrl + "/user/profile/";
class UserProfile extends React.Component {
  state = {
    selectedFile: null,
    selectedFileImage: null,
    user: this.props.user,
  };

  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileImage: URL.createObjectURL(event.target.files[0]),
    });
  };
  onFileUpload = async () => {
    const formData = new FormData();
    formData.append("photo", this.state.selectedFile);
    console.log(this.state.selectedFile);
    try {
      await http.patch(`${uplaodEndpoint}${this.state.user.email}/`, formData);
      toast("Profile photo updated");
    } catch (ex) {
      if (ex.response) toast.error("There was a problem uploading photo");
    }
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <p>File Details:</p>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <br />
          <p>Please choose photo to upload </p>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={this.state.selectedFileImage} />
        <div className="card-body">
          <h5 className="card-title">{this.state.user.username}</h5>
          <p className="card-text">{this.state.user.email}</p>

          <div>
            <input type="file" onChange={this.onFileChange} />
            <br />
            <br />
            <button
              className="btn btn-primary btn-sm"
              onClick={this.onFileUpload}
            >
              Preview and Upload
            </button>
          </div>

          {this.fileData()}
        </div>
      </div>
    );
  }
}

export default UserProfile;
