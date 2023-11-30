import React from "react";
import { Card, Row, Col, Button, Skeleton, DatePicker, Grid, Tag } from "antd";
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
  setData,
} from "../redux/slice";
const { Search } = Input;
function Blog() {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [watch, setWatch] = useState(false);
  const [loadingSearch, setloadingSearch] = useState(false);
  const [dateTimeStart, setDateTimeStart] = useState("");
  const [dateTimeEnd, setDateTimeEnd] = useState("");
  const postList = useSelector((state) => state.slice.postList);
  const open_edit = useSelector((state) => state.slice.modalEdit);
  const open = useSelector((state) => state.slice.open);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  useEffect(() => {
    if (open_edit == true) return;
    setLoading(true);
    axios
      .get(
        `https://post-api.opensource-technology.com/api/posts?page=${current}&limit=${pageSize}&start_date=${dateTimeStart}&end_date=${dateTimeEnd}`
      )
      .then((res) => {
        // dispatch(setListPost(res.data.posts));
        setState(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        return false;
      });
  }, [current, pageSize, open_edit, watch, open, dateTimeStart]);
  const onSearch = async (value, _e, info) => {
    setloadingSearch(true);
    setSearch(value.target.value);
    if (value.target.value == "") {
      setWatch(!watch);
      setloadingSearch(false);
      clearTimeout(timer);
      return;
    }
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      axios
        .get(
          `https://post-api.opensource-technology.com/api/posts?page=${current}&limit=${pageSize}&term=${search}`
        )
        .then((res) => {
          setState(res.data.posts);
          setloadingSearch(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setloadingSearch(false);
          return false;
        });
    }, 1000);

    setTimer(newTimer);
  };
  const onChange = (page) => {
    setCurrent(page);
  };
  function editModal(val) {
    dispatch(setIdEdit(val));
    dispatch(modalOpen());
  }
  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };
  const listItems = state
    // .filter((val) => val.title.toLowerCase().includes(search.toLowerCase()))
    .map((val) => (
      <Row justify="center">
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
              <Col sm={24} md={3}>
                <div style={{ alignSelf: "center", display: "flex" }}>
                  <Button
                    type="primary"
                    style={{ width: "100%" }}
                    onClick={() => editModal(val)}
                  >
                    Edit
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    ));
  const onChangeTime = (value, dateString) => {
    setDateTimeEnd(dateString[1]);
    setDateTimeStart(dateString[0]);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };
  const width = window.innerWidth;
  return (
    <>
      <Row justify={true ? "center" : "start"} style={{ paddingTop: "30px" }}>
        <Col sm={24} md={12}>
          <Row justify={width > 1000 ? "space-between" : "center"}>
            <Col sm={24} md={10}>
              <RangePicker
                format="YYYY-MM-DD"
                onChange={onChangeTime}
                onOk={onOk}
              />
            </Col>
            <Col xs={18} sm={24} md={12} style={{marginTop: width > 500 ? '': '15px'}}>
              <Search
                loading={loadingSearch}
                onChange={onSearch}
                placeholder="input search post"
                style={{
                  width: "100%",
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {loading == false ? (
        <div>
          <div>{listItems}</div>
          {listItems.length ? (
            <Row
              justify={width > 1000 ? "center" : "center"}
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
              <Col sm={24} md={9}>
                <Pagination
                  showSizeChanger
                  onChange={onChange}
                  onShowSizeChange={onShowSizeChange}
                  defaultCurrent={current}
                  defaultPageSize={pageSize}
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
          <Row justify="center">
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

export default Blog;
