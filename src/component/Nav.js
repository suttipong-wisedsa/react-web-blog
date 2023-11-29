import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  useSelector,
  useDispatch,
  HomeOutlined,
  UserOutlined,
} from "react-redux";
// import {
//   BrowserRouter, Routes, Route, useNavigate
// } from "react-router-dom";
import { Link } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate ,useLocation} from "react-router-dom";
import { decrement, increment } from "../redux/slice";
import { addItem, setComplete, getTodos } from "../lips/todoSlice";

const { Header } = Layout;

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { hash, pathname, search } = location;
  const open = useSelector((state) => state.slice.open);

  function createForm() {
    dispatch(increment());
  }
  return (
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[pathname == '/' ? "1" : "2"]}>
        <Menu.Item key="1">
          <Link to={"/"}>POST</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/draft"}>DRAFT</Link>
        </Menu.Item>
      </Menu>
      <div>
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          onClick={createForm}
        >
          Create
        </Button>
      </div>
    </Header>
  );
}

export default Nav;
