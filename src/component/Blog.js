import React from "react";
import { Card, Row, Col, Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Input } from "antd";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
const { Search } = Input;
function Blog() {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  useEffect(() => {
    axios
      .get(
        `https://post-api.opensource-technology.com/api/posts?page=${current}&limit=${pageSize}`
      )
      .then((res) => {
        setState(res.data.posts);
      })
      .catch((err) => {
        return false;
      });
  }, [current,pageSize]);
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
  const listItems = state
    .filter((val) => val.title.toLowerCase().includes(search.toLowerCase()))
    .map((val) => (
      <Row justify="center">
        <Col sm={24} md={12}>
          <Card title={val.title} style={{ width: "100%", marginTop: "15px",fontSize:'16'}}>
            <p>{val.content}</p>
            <Row justify='space-between'>
              <Col sm={24} md={12}>
                <div>
                  <Moment date={val.created_at} format="YYYY/MM/DD HH:mm" />
                </div>
              </Col>
              <Col sm={24} md={3}>
                <div style={{ alignSelf: "center",display:'flex' }}>
                <Button type="primary" style={{width:'100%'}}>Edit</Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    ));

  return (
    <div>
      <Row justify={true ? "center" : "start"} style={{paddingTop:'20px'}}>
        <Col sm={24} md={10}>
          <Search
            onChange={onSearch}
            placeholder="input search post"
            style={{
              width: '100%',
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
        <div style={{textAlign: 'center'}}>
          No data
        </div>
      )} 
    </div>
  );
}

export default Blog;
