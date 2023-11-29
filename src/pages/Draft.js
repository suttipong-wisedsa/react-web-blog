import Draft from "../component/Draft";
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment ,modalOpen,closeModal} from "../redux/slice";
import EditForm from "../component/EditForm";
import CreateForm from "../component/CreateForm";
function App() {
  const open = useSelector((state) => state.slice.open);
  const modalEdit = useSelector((state) => state.slice.modalEdit);
  const navigate = useNavigate();
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
   <div className="App"  style={{fontFamily:'Prompt'}}>
     <Nav />
    <Draft />
    <Modal
        title="Edit Form"
        open={modalEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        width={"50%"}
        footer={null}
      >
        <EditForm />
      </Modal>
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
   </div>
  );
}

export default App;
