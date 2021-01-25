import React, {useState} from 'react';
import householdService from "./../lib/household-service";

function CreateHousehold(props) {

    const [title, setTitle] = useState("");

    const handleInput = (event) => {
        setTitle(event.target.value);
    };

    const submitForm = (event) => {
        event.preventDefault();
        householdService.createHouse(title)
            .then(() => {
                props.toggleForm();
            })
    }


    return (
        <form onSubmit={(e) => submitForm(e)}>
            <label>House name: </label> <br/>
            <input type="text" name="title" onChange={(e)=>handleInput(e)}/> <br/>
            <button type="submit">Create house</button>
            <button onClick={props.toggleForm}>Cancel</button>
        </form>
    )
}

export default CreateHousehold
