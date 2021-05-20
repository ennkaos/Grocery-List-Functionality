import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const getLocalStorage=()=>{
  let list=localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"))
  }else{
    return []
  }
}
function App() {
  const [name,setName]=useState('')
  const [list,setList]=useState(getLocalStorage())
  const [isEditing,setisEditing]=useState(false)
  const [editId,seteditId]=useState(null)
  const [alert,setAlert]=useState({show:false,msg:'hello',type:'success'})
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!name){
      //display alert
      
      showAlert(true,"danger","Please Enter Value")

    }else if(name && isEditing){
      setList(list.map((item)=>{
        if(item.id===editId){
          return {...item,title:name}
        }
        
      }))
      showAlert(true,"success","Item Edited successfuly")
      setisEditing(false)
      seteditId(null)
      setName('')
      
    }else{
      showAlert(true,"success","Item Added Successfuly")
      const newItem={id:new Date().getTime().toString(),title:name};
      setList([...list,newItem])
      setName('')
    }
  }
  const handleClear=()=>{
    showAlert(true,"danger","Items cleared ")
    setList([])
  }
  const handleEdit=(id)=>{
    const secificItem=list.find((item)=>item.id===id)
    setisEditing(true)
    seteditId(id)
    setName(secificItem.title)
  }
  const showAlert=(show=false,type="",msg="")=>{
    setAlert({show,type,msg})
  }
  const removeItem=(id)=>{
    showAlert(true,"danger","Item Removed")
    setList(list.filter((item)=>item.id!==id))
  }
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  },[list])
  return <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Lista de cumparaturi</h3>
        <div className="form-control">
          <input type="text" className="grocery" placeholder="produs" value={name} onChange={(e)=>setName(e.target.value)}></input>
          <button type="submit" className="submit-btn">
            {isEditing ?"edit":"submit"}
          </button>
        </div>
      </form>
      {list.length>0 &&
        <div className="grocery-container">
          <List items={list} Editing={handleEdit}  removeItem={removeItem} />
          <button className="clear-btn" onClick={handleClear}>clear items</button>
        </div>
      }
      
  </section>
}

export default App
