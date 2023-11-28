import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Row, Col } from "antd";
import { Route, Link, Routes, useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const { TextArea } = Input;
function EditForm() {
    const [form] = Form.useForm();
    let { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://post-api.opensource-technology.com/api/posts/${id}`
      )
      .then((res) => {
        console.log(res)
        form.setFieldsValue({
            Title: res.data.title,
            Content: res.data.content
         });
      })
      .catch((err) => {
        return false;
      });
  }, []);
  const navigate = useNavigate();
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
      content: values.Title,
      title: values.Content,
    };
    await axios
      .post(`https://post-api.opensource-technology.com/api/posts`, payload)
      .then((res) => {
        navigate(-1);
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
        <Col xs={20} sm={20} md={15} lg={15} xl={15}>
          <Card
            title="Edit Post"
            bordered={false}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <p>Title</p>
            <Form form={form}
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
                      <Button type="primary" style={{ width: "100%" }}>
                        Publish Now
                      </Button>
                    </div>
                  </Col>
                  <Col span={5}>
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      htmlType="reset"
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EditForm;
