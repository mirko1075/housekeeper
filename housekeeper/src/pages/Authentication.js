import React, { Component } from 'react'

class Authentication extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        showSignup: false
    }

    toggleSignup = () => {
        this.setState({showSignup: !this.state.showSignup})
    }

    render() {

        return (

            this.state.showSignup 
            ? <div>
                <h2>Login form</h2>
                Don't have an account? <br/>
                <button onClick={this.toggleSignup}>Sign Up</button>
            </div>
            : <div>
                <h2>Signup form</h2>
                Already have an account? <br/>
                <button onClick={this.toggleSignup}>Log In</button>
            </div>
            
        )
    }
}

export default Authentication;

