import React from "react";
import ProfileSection from "./../components/ProfileSection";
import HouseholdSection from "./../components/HouseholdSection";
import { withAuth } from "./../context/auth-context";


const Dashboard = (props) => {

  return (
    <div>
      <ProfileSection user={props.user} />
      <HouseholdSection user={props.user} />
    </div>
  );
};

export default withAuth(Dashboard);
