import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Row, Col } from "antd";
import {
  Route,
  Link,
  Routes,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, setListPost, closeModal } from "../redux/slice";
const { TextArea } = Input;
function EditForm() {
  const open = useSelector((state) => state.slice.open);
  const open_edit = useSelector((state) => state.slice.modalEdit);
  const editId = useSelector((state) => state.slice.editId);
  const location = useLocation();
  const { hash, pathname, search } = location;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  let { id } = useParams();
  const titleValue = form.getFieldValue('Title');
  const contentValue = form.getFieldValue('Content');
  useEffect(() => {
    if (open_edit == false) return;
    axios
      .get(`https://post-api.opensource-technology.com/api/posts/${editId}`)
      .then((res) => {
        form.setFieldsValue({
          Title: res.data.title,
          Content: res.data.content,
        });
      })
      .catch((err) => {
        return false;
      });
  }, [open_edit]);
  const navigate = useNavigate();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  async function publish() {
    let payload = {
      content: contentValue,
      published: true,
      title: titleValue,
    };
    await axios
      .patch(
        `https://post-api.opensource-technology.com/api/posts/${editId}`,
        payload
      )
      .then((res) => {
        dispatch(closeModal());
      })
      .catch((err) => {
        alert("Error");
        return false;
      });
  }
  async function delete_form(id) {
    let text = "confirm to delete";
    if (window.confirm(text) == true) {
      await axios
        .delete(`https://post-api.opensource-technology.com/api/posts/${id}`)
        .then((res) => {
          dispatch(closeModal());
          return true;
        })
        .catch((err) => {
          return false;
        });
    }
  }
  const onFinish = async (values) => {
    let payload = {
      content: values.Content,
      title: values.Title,
    };
    await axios
      .patch(
        `https://post-api.opensource-technology.com/api/posts/${editId}`,
        payload
      )
      .then((res) => {
        dispatch(closeModal());
      })
      .catch((err) => {
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
  return (
    <div>
      <Row justify="center">
        <Col xs={20} sm={20} md={24} lg={24} xl={24}>
          <div style={{ width: "100%", marginTop: "20px" }}>
            <p>Title</p>
            <Form
              form={form}
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
                        htmlType="submit"
                        type="primary"
                        style={{ width: "100%", marginRight: "10px" }}
                      >
                        Save
                      </Button>
                      {pathname == "/draft" ? (
                        <Button
                          type="primary"
                          style={{ width: "100%", backgroundColor: "green" }}
                          onClick={() => publish()}
                        >
                          Publish Now
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          style={{ width: "100%" }}
                          onClick={() => delete_form(editId)}
                          danger
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </Col>
                  <Col span={5}>
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      htmlType="reset"
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

export default EditForm;
