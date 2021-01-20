import React, { Component } from 'react';
import ProfileSection from './../components/ProfileSection';
import {withAuth} from './../context/auth-context';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <ProfileSection user={this.props.user}/>
                
            </div>
        )
    }
}

export default withAuth(Dashboard);