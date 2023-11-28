import React from "react";
import { Card, Row, Col, Button, Progress } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Input } from "antd";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment,setListPost } from "../redux/slice";
const { Search } = Input;
function Draft() {
  const open = useSelector((state) => state.slice.open);
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  const [load, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://post-api.opensource-technology.com/api/posts/draft?page=${current}&limit=${pageSize}`
      )
      .then((res) => {
        setState(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        return false;
      });
    setLoading(false);
  }, [current, pageSize]);
  const onSearch = (value, _e, info) => {
    setSearch(value.target.value);
  };
  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPageSize(pageSize);
  };
  async function delete_form(id) {
    let text = "confirm to delete";
    if (window.confirm(text) == true) {
      let array = [...state];
      await axios
        .delete(`https://post-api.opensource-technology.com/api/posts/${id}`)
        .then((res) => {
          for (let i = 0; i < array.length; i++) {
            let index = array.findIndex((element) => element.id == id);
            if (index !== -1) {
              array.splice(index, 1);
              setState(array);
            }
          }
        })
        .catch((err) => {
          return false;
        });
    }
  }
  function edit_form(item) {
    dispatch(decrement());
  }
  async function publish(val) {
    let text = "confirm to publish";
    if (window.confirm(text) == true) {
      let array = [...state];
      let payload = {
        content: val.content,
        published: true,
        title: val.title,
      };
      await axios
        .patch(
          `https://post-api.opensource-technology.com/api/posts/${val.id}`,
          payload
        )
        .then((res) => {
          for (let i = 0; i < array.length; i++) {
            let index = array.findIndex((element) => element.id == val.id);
            if (index !== -1) {
              array.splice(index, 1);
              setState(array);
            }
          }
        })
        .catch((err) => {
          return false;
        });
    }
  }
  const listItems = state
    .filter((val) => val.title.toLowerCase().includes(search.toLowerCase()))
    .map((val) => (
      <Row justify="center" key={val.id}>
        <Col sm={24} md={12}>
          <Card title={val.title} style={{ width: "100%", marginTop: "15px",fontSize:'16' }}>
            <p>{val.content}</p>
            <Row justify='space-between'>
              <Col sm={24} md={12}>
                <div>
                  <Moment date={val.created_at} format="YYYY/MM/DD HH:mm" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={13} xl={10}>
                <div style={{ alignSelf: "center",display:'flex' }}>
                  <Button type="primary" style={{marginRight:'5px'}} onClick={() => edit_form(val)}>Edit</Button>
                  <Button type="primary" onClick={() => publish(val)} style={{marginRight:'5px'}}>
                    Published
                  </Button>
                  <Button type="primary" onClick={() => delete_form(val.id)}>
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
            {/* </div> */}
          </Card>
        </Col>
      </Row>
    ));

  return (
    <>
      {load == false ? (
        <div>
          <Row
            justify={true ? "center" : "start"}
            style={{ paddingTop: "20px" }}
          >
            <Col sm={24} md={10}>
              <Search
                onChange={onSearch}
                placeholder="input search post"
                style={{
                  width: "100%",
                }}
              />
            </Col>
          </Row>
          <div>{listItems}</div>
          {listItems.length ? (
            <Row justify={true ? "end" : "start"} style={{paddingTop:'20px',paddingBottom:'20px'}}>
              <Col sm={24} md={10}>
                <Pagination
                  showSizeChanger
                  onChange={onChange}
                  onShowSizeChange={onShowSizeChange}
                  defaultCurrent={1}
                  total={100}
                />
              </Col>
            </Row>
          ) : (
            <div style={{ textAlign: "center" }}>No data</div>
          )}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}

export default Draft;
