import React from 'react'
import {  Layout, Menu ,Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../lips/todoSlice'
import { 
  BrowserRouter, Routes, Route, useNavigate 
} from "react-router-dom";
import {
  addItem,
  setComplete,
  getTodos,
} from '../lips/todoSlice'

const { Header } = Layout;

function Nav() {
  let menu = [
    {
      title:'POST',
      path:'/'
    },
    {
      title:'DRAFT',
      path:'/draft'
    }
  ]
  function goPath(path){
    console.log(path)
  }
  function createForm(){
    // return redirect("/create-draft");
    // dispatch(setComplete());
    // history.push("/create-draft");
    // navigate('/create-draft');
  }
  return (
    // <div style={{backgroundColor: 'gray',height: '80px'}}>
        
    // </div>
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={menu.map((val, index) => ({
            key: String(index + 1),
            label: `${val.title}`,
          }))}
        />
        <div>
        <Button type="primary" onClick={createForm}>
          Create
      </Button>
        </div>
      </Header>
    </Layout>
  )
}

export default Nav