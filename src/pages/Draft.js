import Draft from "../component/Draft";
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../redux/slice";
import EditForm from "../component/EditForm";
function App() {
  const open = useSelector((state) => state.slice.open);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOk = () => {
    dispatch(decrement());
  };
  const handleCancel = () => {
    dispatch(decrement());
  };
  return (
   <div className="App"  style={{fontFamily:'Prompt'}}>
     <Nav />
    <Draft />
    <Modal
        title="Basic Modal"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"80%"}
      >
        <EditForm />
      </Modal>
   </div>
  );
}

export default App;
