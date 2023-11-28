import React from 'react'
import {  Layout, Menu ,Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux'
// import { 
//   BrowserRouter, Routes, Route, useNavigate 
// } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { decrement, increment } from "../redux/slice";
import {
  addItem,
  setComplete,
  getTodos,
} from '../lips/todoSlice'

const { Header } = Layout;

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = useSelector((state) => state.slice.open)
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
    dispatch(increment())
    // navigate('/create-draft');
  }
  return (
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