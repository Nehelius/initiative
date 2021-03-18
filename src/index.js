import React, {useState} from 'react'
import ReactDOM from 'react-dom'

import css from './components/index.css'
import AddInput from './components/AddInput'

function App() {
  const [names, setNames] = useState([])
  const [error, setError] = useState("")
  const [start, setStart] = useState(false)
  const [currentInit, setCurrentInit] = useState("")

  const handleSubmit = () => {
    let nameInput = document.getElementById('nameInput').value
    let initInput = document.getElementById('initInput').value
    let dexInput = document.getElementById('dexInput').value

    let repeated
    
    setError("")
    
    names.forEach(entry => {
      if (entry.name === nameInput) {
        repeated = true
      } else {
        repeated = false
      }
    })

    if (nameInput === "") {
      setError("Please write a name.")
    } else if (initInput === "") {
      setError("Please write the initiative value.")
    } else if (dexInput === "") {
      setError("Please write the dexterity value")
    } else if (repeated) {
      setError("Please don't repeat names")
    } else {
      setNames([...names, {name: nameInput, initiative: initInput, dexterity: dexInput}])
      document.getElementById("inputForm").reset()
    }
  }

  const compare = (a, b) => {
    if (a.initiative !== b.initiative) {
      return b.initiative - a.initiative
    } else {
      return b.dexterity - a.dexterity
    }
  }

  const handleStart = () => {
    const chosen = document.getElementById(names[0].name)
    
    chosen.classList.add('init')
    
    setStart(true)
    
    setCurrentInit(names[0].name)
  }
  
  const handleNext = () => {
    const current = document.getElementById(currentInit)
    let next
    
    current.classList.remove('init')
    
    if (current.nextElementSibling) {
      next = current.nextElementSibling
    } else {
      next = document.getElementById(names[0].name)
    }
    
    next.classList.add('init')
    
    setCurrentInit(next.id)
  }

  const handleRemove = (e) => {
    let index = e.target.value
    let array = [...names]

    if (e.target.parentNode.classList.contains("init")) {
      handleNext()
    }

    setNames([])

    array.splice(index, 1)

    setNames(array)

    if (names.length === 2) {
      e.target.parentNode.nextElementSibling.classList.remove('init')
      
      setStart(false)
      setCurrentInit("")
    }
  }

  const displayNames = names.sort(compare).map(entry => {
    return (
      <div className="entry" id={entry.name} key={entry.name}>
        <div>Name: <strong>{entry.name}</strong></div>
        <div>Initiative: <strong>{entry.initiative}</strong></div>
        <div>Dexterity: {entry.dexterity}</div>
        <button value={names.indexOf(entry)} id="removeEntryButton" onClick={handleRemove}>x</button>
      </div>
    )
  })

  
  

  const handleReset = () => {
    setNames([])
    setStart(false)
    setCurrentInit("")
  }
  
  let handleDisplayStartButton

  if (names.length > 1) {
    handleDisplayStartButton = (
    <div id="controlButtons">
      <button id="start" onClick={handleStart}>Start</button>
    </div>
    )
  } else {
    handleDisplayStartButton = (
      <div id="controlButtons">
        <button disabled id="start" onClick={handleStart}>Start</button>
      </div>
    )
  }

  if (start) {
    handleDisplayStartButton = (
      <div id="controlButtons">
        <button id="reset" onClick={handleReset}>Reset</button>
        <button id="next" onClick={handleNext}>Next</button>
      </div>
    )
  }

  return (
    <div className="App">
      <AddInput handleSubmit={handleSubmit}/>
      <h3>{error}</h3>
      <div>
        {names ? displayNames : null}
      </div>
      {handleDisplayStartButton}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))