import React, { useState, useEffect } from "react";
import householdService from "./../lib/household-service";
import authService from "./../lib/auth-service";
import CreateHousehold from "./../components/CreateHousehold";

function HouseholdSection(props) {
  const [household, setHousehold] = useState(null);
  const [showAddHouse, setAddHouse] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleAddHouse = (house) => {
    if (house) {
      authService
        .me()

        .then((response) => {
          setHousehold(response.household);
        });
    }
    setAddHouse(!showAddHouse);
  };

  const togoleEdit = (house) => {
    if (house) {
      authService
        .me()

        .then((response) => {
          setHousehold(response.household);
        });
    }
    setShowEdit(!showEdit);
  };

  const deleteHouse = () => {
    const houseId = household._id;
    householdService.deleteHouse(houseId);
    setHousehold(null);
  };

  useEffect(() => {
    setHousehold(props.user.household);
  }, []);

  return household ? (
    <div>
      <h2>{household.title}</h2>
      <h3>Roommates:</h3>
      <ul>
        {household.members.map((member) => {
          return <li key={member}>{member.username}</li>;
        })}
      </ul>
      {props.user.admin ? (
        showEdit ? (
          <CreateHousehold
            title={household.title}
            toggleForm={togoleEdit}
            isNew="false"
          />
        ) : (
          <div>
            <button>Add roommate</button>
            <button onClick={togoleEdit}>Edit house</button>
            <button onClick={() => deleteHouse()}>Delete house</button>
          </div>
        )
      ) : null}
    </div>
  ) : showAddHouse ? (
    <CreateHousehold toggleForm={toggleAddHouse} isNew="true" />
  ) : (
    <button onClick={() => toggleAddHouse(null)}>Create household</button>
  );
}

export default HouseholdSection;
