import React, { Component } from 'react';
import userService from './../lib/user-service';

class ProfileSection extends Component {

    state = {
        username: "",
        image: "",
        showEdit: false
    }

    toggleShowEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    };

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    cancelEdit = () => {
        this.setState({username: this.props.user.username, image: this.props.user.image});
        this.toggleShowEdit();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {username, image} = this.state;
        userService.editProfile(username, image)
            .then(response => {
                this.setState({username: response.data.username, image: response.data.image});
                this.toggleShowEdit();
            })

    }

    componentDidMount () {
        this.setState({username: this.props.user.username, image: this.props.user.image})
    }

    render() {
        return (
            <div>
                {this.state.showEdit
                ? <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleInput}/>
                    <button type="submit">Submit</button>
                    <button onClick={this.cancelEdit}>Cancel</button>
                </form>
                : <div>
                    <h2>{this.state.username}</h2>
                    <img src={this.state.image}/>
                    <button onClick={this.toggleShowEdit}>Edit info</button>
                </div>
                }
            </div>
        )
    }
}

export default ProfileSection;