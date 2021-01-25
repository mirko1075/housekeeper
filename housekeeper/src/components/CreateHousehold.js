import React, { useState } from "react";
import householdService from "./../lib/household-service";

function CreateHousehold(props) {
  const [title, setTitle] = useState("");

  const handleInput = (event) => {
    setTitle(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log("title :>> ", title);
    householdService
      .createHouse(title)
      .then((newHouse) => {
        props.toggleForm(newHouse.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <label>House name: </label> <br />
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => handleInput(e)}
      />
      <br />
      <button type="submit">Create house</button>
      <button onClick={props.toggleForm}>Cancel</button>
    </form>
  );
}

export default CreateHousehold;
