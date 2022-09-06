import { useState,useEffect } from "react";

import './ToDoApp.css'

import Header from '../Header/Header'
import List from '../List/List'
import Options from '../Options/Options'

function ToDoApp(){

  //State değerini güncelle
  const [status,setStatus]=useState('All');
  const [todos,setTodos]=useState([]);
  const [countActive, setCountActive]=useState(0)
  const [countCompleted,setCountCompleted]=useState(0)

  //useEffect() fonksiyonunu kullandığınızda React, DOM ile ilgili herhangi bir işlem tamamlandığında çağıracaktır. React, varsayılan olarak ilk render da dahil olmak üzere her render işleminden sonra effect fonksiyonunu çalıştırır.
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem('todos'));
    if(todos){
      setTodos(todos);
      setCountActive(todos.filter(todo => !todo.completed).length);
      setCountCompleted(todos.filter(todo => todo.completed).length);

    }
  },[])
//Todo ekle
  const addToDo=(newToDo) =>{
    const toDo = {
      content:newToDo,
      completed:false
    }
//Yeni eklenen to do
    const newTodos = [...todos,toDo];
    setTodos(newTodos);
    setCountActive(countActive +1);
    localStorage.setItem('todos',JSON.stringify(newTodos));

  }
  //seçilen tüm todolar
   const completeAllItem= () => {
    const newTodos= todos.map(item=>{
    return {...item,complated: !item.complated}
    })
    setTodos(newTodos);
    setCountActive(countActive === 0 ? todos.length : 0);
    setCountCompleted(countCompleted === 0 ? todos.length : 0);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }
//Todo Sil
  const removeItem = (item) => {
    const newTodos = todos.filter(todo => todo !== item)
    setTodos(newTodos)
    if (!item.completed) {
      setCountActive(countActive - 1)
    } else {
      setCountCompleted(countCompleted - 1)
    }
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

//Tamamlanan Todo
  const completeItem = (item) => {
    const newTodos = todos.map(todo => {
      if(todo === item){
        return {...todo, completed: !todo.completed}
      }
      return todo
    })
    setTodos(newTodos)
    setCountActive(countActive + (item.completed ? 1 : -1))
    setCountCompleted(countCompleted + (item.completed ? -1 : 1))
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  //Tüm listeyi temizle
  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
    setCountCompleted(0)
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }
//Seçim işlemi(filtreleme)
  const changeStatus = (nowStatus) => {
    if(nowStatus === 'All'){
      setStatus('All')
    } else if(nowStatus === 'Active'){
      setStatus('Active')
    } else {
      setStatus('Completed')
    }
  }
    if (countActive === 0 && countCompleted === 0) {

      return (
        <section className='todoapp'>
          <Header
          addToDo = {addToDo}
           />
        
          <List 
          todos = {todos}
          completeAllItem = {completeAllItem}
          removeItem = {removeItem}
          completeItem = {completeItem}
          />
        </section>
      )
  
    } else {
      return (
        <section className='todoapp'>
          <Header
          addToDo = {addToDo}
           />
          <List 
          todos = {todos}
          status = {status}
          completeAllItem = {completeAllItem}
          removeItem = {removeItem}
          completeItem = {completeItem}
          />
          <Options
          status = {status}
          countActive = {countActive}
          countCompleted = {countCompleted}
          clearCompleted = {clearCompleted}
          changeStatus = {changeStatus}
           />
        </section>
      )
    }
  

    
  }
  
  export default ToDoApp;