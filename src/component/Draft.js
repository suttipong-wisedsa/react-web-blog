import React from "react";
import { Card, Row, Col, Button, Progress, Skeleton } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Input } from "antd";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  setListPost,
  modalOpen,
  setIdEdit,
} from "../redux/slice";
const { Search } = Input;
function Draft() {
  const open = useSelector((state) => state.slice.open);
  const modalEdit = useSelector((state) => state.slice.modalEdit);
  const setdata = useSelector((state) => state.slice.setdatavalue);
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  const [timer, setTimer] = useState(null);
  const [load, setLoading] = useState(false);
  const [watch, setWatch] = useState(false);
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
  }, [current, pageSize, modalEdit,setdata]);
  const onSearch = async (value, _e, info) => {
    setSearch(value.target.value);
    if (value.target.value == "") {
      setWatch(!watch);
      return;
    }
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      axios
        .get(
          `https://post-api.opensource-technology.com/api/posts/draft?page=${current}&limit=${pageSize}&term=${search}`
        )
        .then((res) => {
          setState(res.data.posts);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          return false;
        });
    }, 500);

    setTimer(newTimer);
  };
  const onChange = (page) => {
    setCurrent(page);
  };
  const onShowSizeChange = (current, pageSize) => {
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
    dispatch(setIdEdit(item));
    dispatch(modalOpen());
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
    // .filter((val) => val.title.toLowerCase().includes(search.toLowerCase()))
    .map((val) => (
      <Row justify="center" key={val.id}>
        <Col sm={24} md={12}>
          <Card
            title={val.title}
            style={{ width: "100%", marginTop: "15px", fontSize: "16" }}
          >
            <p>{val.content}</p>
            <Row justify="space-between">
              <Col sm={24} md={12}>
                <div>
                  <Moment date={val.created_at} format="YYYY/MM/DD HH:mm" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={13} xl={10}>
                <div style={{ alignSelf: "center", display: "flex" }}>
                  <Button
                    type="primary"
                    style={{ marginRight: "5px" }}
                    onClick={() => edit_form(val)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => publish(val)}
                    style={{ marginRight: "5px" }}
                  >
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
      <Row justify={true ? "center" : "start"} style={{ paddingTop: "30px" }}>
        <Col sm={24} md={12}>
          <Search
            onChange={onSearch}
            placeholder="input search post"
            style={{
              width: "100%",
            }}
          />
        </Col>
      </Row>
      {load == false ? (
        <div>
          <div>{listItems}</div>
          {listItems.length ? (
            <Row
              justify={true ? "end" : "start"}
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
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
        <div>
          <Row justify='center'>
            <Col sm={24} md={10}>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Draft;
