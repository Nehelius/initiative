import React from 'react'

const AddInput = (props) => {
  return (
    <form id="inputForm">
      <input id="nameInput" type="text" placeholder="Character/Monster Name"/>
      <input id="initInput" type="number" placeholder="Initiative"/>
      <input id="dexInput" type="number" placeholder="Dexterity" />
      <br></br>
      <button id="addButton" type="button" onClick={props.handleSubmit}>Add</button>
    </form>
  )
}

export default AddInput