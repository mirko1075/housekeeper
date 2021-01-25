import React, { useState, useEffect } from "react";
import householdService from "./../lib/household-service";

function CreateHousehold(props) {
  const [title, setTitle] = useState("");
  const [household, setHousehold] = useState(null);
  const handleInput = (event) => {
    setTitle(event.target.value);
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log("title :>> ", title);
    if (props.isNew) {
      householdService
        .createHouse(title)
        .then((newHouse) => {
          props.toggleForm(newHouse.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      householdService
        .editHouse(household)
        .then((modifiedHouse) => {
          props.toggleForm(modifiedHouse.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  ///COMMENT
  useEffect(() => {
    const defaultTitle = props.title ? props.title : "";
    setTitle(defaultTitle);
  }, []);

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
      <button type="submit">Submit</button>
      <button onClick={props.toggleForm}>Cancel</button>
    </form>
  );
}

export default CreateHousehold;
