import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Row, Col } from "antd";
import {
  Route,
  Link,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  setListPost,
  modalOpen,
  setData,
  setIdEdit,
} from "../redux/slice";
const { TextArea } = Input;
function CreateForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loadings, setLoadings] = useState(false);
  const { hash, pathname, search } = location;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onFinish = async (values) => {
    let payload = {
      content: values.Content,
      title: values.Title,
    };
    setLoadings(true)
    await axios
      .post(`https://post-api.opensource-technology.com/api/posts`, payload)
      .then((res) => {
        console.log(res.data)
        if (pathname == "/") {
          dispatch(setData(true))
          setLoadings(false)
          handleCancel();
        }else {
          setLoadings(false)
          handleCancel();
        }
      })
      .catch((err) => {
        setLoadings(false)
        alert("Error");
      });
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const handleCancel = () => {
    dispatch(decrement());
  };
  return (
    <div>
      <Row justify="center">
        <Col xs={20} sm={20} md={24} lg={24} xl={24}>
          <div title="New Post" style={{ width: "100%", marginTop: "20px" }}>
            <p>Title</p>
            <Form
              name="nest-messages"
              onFinish={onFinish}
              style={{
                width: "100%",
              }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["Title"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <p>Content</p>
              <Form.Item
                name={["Content"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Row
                  style={{ marginTop: "10px", width: "100%" }}
                  justify="space-between"
                >
                  <Col span={10}>
                    <div style={{ display: "flex" }}>
                      <Button
                        loading={loadings}
                        htmlType="submit"
                        type="primary"
                        style={{ width: "100%", marginRight: "10px" }}
                      >
                        Save
                      </Button>
                      <Button type="primary" style={{ width: "100%",backgroundColor: 'green' }}>
                        Publish Now
                      </Button>
                    </div>
                  </Col>
                  <Col span={5}>
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      htmlType="reset"
                      onClick={() => handleCancel()}
                      danger
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreateForm;
