import React from 'react';
import authService from './../lib/auth-service';

const { Consumer, Provider } = React.createContext();


class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null
  }

  componentDidMount () {
    this.updateMe();
  }

  updateMe = () => {
    authService.me()
    .then((user) => this.setState({ isLoggedIn: true, user: user, isLoading: false }))
    .catch((err) => this.setState({ isLoggedIn: false, user: null, isLoading: false }));
  }

  signup = (username, email, password) => {
    authService.signup( username, email, password )
      .then((user) => this.setState({ isLoggedIn: true, user }) )
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null });
      })
  }

  login = (email, password) => {
    authService.login( email, password )
      .then((user) => {
        this.setState({ isLoggedIn: true, user })
      })
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null });
      })
  }

  logout = () => {
    authService.logout()
      .then(() => this.setState({ isLoggedIn: false, user: null }))
      .catch((err) => console.log(err));
  }


  render() {
    const { isLoggedIn, isLoading, user } = this.state;
    const { signup, login, logout, updateMe } = this;

    if (isLoading) return <p>Loading</p>;

    return(
      <Provider value={{ isLoggedIn, isLoading, user, updateMe, signup, login, logout }}  >
        {this.props.children}
      </Provider>
    )
  }

}

const withAuth = (WrappedComponent) => {
  
  return class extends React.Component {
    render() {
      return(
        <Consumer>
          { (value) => {
            const { isLoggedIn, isLoading, user, signup, login, logout, updateMe } = value;

            return (<WrappedComponent 
                      {...this.props}
                      isLoggedIn={isLoggedIn} 
                      isLoading={isLoading} 
                      user={user} 
                      signup={signup} 
                      login={login} 
                      logout={logout}
                      updateMe={updateMe}
                    />)

          } }
        </Consumer>
        )
    }
}
}


export { AuthProvider, withAuth }