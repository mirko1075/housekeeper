import React, {useState, useEffect} from 'react';
import householdService from "./../lib/household-service";
import CreateHousehold from "./../components/CreateHousehold";



function HouseholdSection(props) {

    const [household, setHousehold] = useState(props.user.household);
    const [showAddHouse, setAddHouse] = useState(false)

    const toggleAddHouse = () => {
        setAddHouse(!showAddHouse);
        setHousehold(props.user.household)
    }
    
    return (

        props.user.household 
        ? <div>
            <h2>{household.title}</h2>
            <h3>Roommates:</h3>
            <ul>
                {household.members.map(member => {
                    return <li key={member}>{member.username}</li>
                })}
            </ul>
            {props.user.admin 
                ? <div>
                <button>Add roommate</button>
                <button>Edit house</button>
                </div>
                : null }
            
            
            </div>
        : showAddHouse 
                ? <CreateHousehold toggleForm={toggleAddHouse}/>
                : <button onClick={toggleAddHouse}>Create household</button>
        
    )
}

export default HouseholdSection;
