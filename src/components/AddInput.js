import React from 'react'

const AddInput = (props) => {
  return (
    <form id="inputForm">
      <input id="nameInput" type="text" placeholder="NAME"/>
      <input id="initInput" type="number" placeholder="INIT"/>
      <input id="dexInput" type="number" placeholder="DEX" />
      <button id="addButton" type="button" onClick={props.handleSubmit}>Add</button>
    </form>
  )
}

export default AddInput