import "./App.css";
import axios from "axios";

function App() {
  const handleClick = async () => {
    // console.log("handleClick 클릭");
    try {
      await axios.post(
        "http://localhost:5000/session",
        { username: "namhoechoi", userAge: 44 },
        { withCredentials: true }
      );
      alert("섹션 설정 완료");
    } catch (e) {
      alert("요청 실패");
    }
  };
  const handleGetCookie = async () => {
    try {
      const res = await axios.get("http://localhost:5000/session", {
        withCredentials: true,
      });
      console.log(res.status, res.data);
    } catch (e) {
      alert(`조회 실패${e}`);
    }
  };
  const handleRemoveCookie = async () => {
    try {
      const res = await axios.delete("http://localhost:5000/session", {
        withCredentials: true,
      });
      console.log(res.status, res.data);
    } catch (e) {
      alert(`삭제 실패${e}`);
    }
  };
  return (
    <div className="App">
      <button onClick={handleClick}>발급버튼</button>
      <button onClick={handleGetCookie}>내용조회버튼</button>
      <button onClick={handleRemoveCookie}>삭제버튼</button>
    </div>
  );
}

export default App;
