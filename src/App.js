import React, { useEffect, useState } from 'react'
import "./index.css"
import { AiFillEdit } from "react-icons/ai"
import { FiTrash } from "react-icons/fi"
import Alert from './Alert'



const getLocal = () => {
  const list = localStorage.getItem("list")
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  } else {
    return []
  }
}

const App = () => {

  const [name, setName] = useState("")
  const [list, setList] = useState(getLocal())
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" })
  const [editState, setEditState] = useState(false)
  const [editId, setEditid] = useState("")




  const storage = () => {
    localStorage.setItem("list", JSON.stringify(list))
  }


  useEffect(() => {

    storage()

  }, [list])



  const submitHanlder = (evt) => {
    evt.preventDefault()

    if (name) {
      setList((oldList) => {
        return ([...oldList, { id: Math.random(0, 10), name }])
      })
      setName("")
      setAlert({ show: true, msg: "Added to List", type: "succes" })
    } else if (!name) {
      setAlert({ show: true, msg: "please type a value", type: "danger" })
    }
    if (name && editState) {
      setList(list.map(e => {
        if (e.id === editId) {
          return { ...e, name: name }
        }
        return e

      }))
      setAlert({ show: true, msg: "item modified correctly", type: "succes" })
    }
    setEditState(false)
    setEditid("")
  }



  const individualDlt = (id) => {
    const newList = list.filter(e => e.id !== id)
    setList(newList)
  }

  const edit = (id) => {
    const newList = list.find(e => e.id === id)
    setEditState(true)
    setEditid(newList.id)
    setName(newList.name)
  }



  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlert({ show: false, msg: "", type: "" })
    }, 2000);
    return () => clearTimeout(timeOut)

  }, [alert])


  return (
    <main className="mainContainer">
      {alert.show ? <Alert {...alert}></Alert> : null}
      <div className="tite">
        <h1>Grocery Bud</h1>
      </div>
      <form className="form" onSubmit={submitHanlder}>
        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }}></input>
        <button>{editState ? "edit" : "Add to List"}</button>
      </form>
      <div className="itemContainer">
        {list.map((e) => {
          return (<div className="item" key={e.id}>
            <h2>{e.name}</h2> <AiFillEdit className="editSvg" onClick={() => { edit(e.id) }}></AiFillEdit> <FiTrash className="deletSvg" onClick={() => { individualDlt(e.id) }}></FiTrash>
          </div>)
        })}
      </div>
      <button className="clearBtn" onClick={() => { setList([]) }}>Clear List</button>
    </main>
  )
}

export default App
