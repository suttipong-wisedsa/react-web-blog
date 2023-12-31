import "./App.css";
import Blog from "./component/Blog";
import { useNavigate } from "react-router-dom";
import Nav from "./component/Nav";
import { useSelector, useDispatch } from "react-redux";
import InputAddress from "react-thailand-address-autocomplete";
import {
  decrement,
  increment,
  modalOpen,
  closeModal,
} from "../src/redux/slice";
import CreateForm from "../src/component/CreateForm";
import EditForm from "./component/EditForm";
import { Modal } from "antd";
function App() {
  const navigate = useNavigate();
  const open = useSelector((state) => state.slice.open);
  const open_edit = useSelector((state) => state.slice.modalEdit);
  const value = useSelector((state) => state.slice.value);
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(decrement());
  };
  const handleCancel = () => {
    dispatch(decrement());
  };
  const handleOkEdit = () => {
    dispatch(modalOpen());
  };
  const handleCancelEdit = () => {
    dispatch(closeModal());
  };
  return (
    <div className="App" style={{ fontFamily: "Prompt" }}>
      <Nav />
      <Blog />
      <Modal
        title="Create Form"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"50%"}
        footer={null}
      >
        <CreateForm />
      </Modal>
      <Modal
        title="Edit Form"
        open={open_edit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        width={"50%"}
        footer={null}
      >
        <EditForm />
      </Modal>
    </div>
  );
}

export default App;
