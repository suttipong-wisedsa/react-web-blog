import CreateForm from "../component/CreateForm";
import { useNavigate } from "react-router-dom";
import Nav from "../component/Nav";
function App() {
  const navigate = useNavigate();
  return (
    <div className="App" style={{ fontFamily: "Prompt" }}>
      {/* <Nav /> */}
      {/* <CreateForm /> */}
    </div>
  );
}

export default App;
