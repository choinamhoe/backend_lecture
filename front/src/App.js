import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function App() {
  const [cookieValue, setCookieValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // notes 목록 불러오기
  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/notes`, {
        withCredentials: true,
      });
      setNotes(res.data);
    } catch (e) {
      alert("노트 불러오기 실패");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // 쿠키 POST (/cookie)
  const setCookie = async () => {
    try {
      await axios.post(
        `${API_BASE}/cookie`,
        {},
        { withCredentials: true } // 쿠키 주고받기 필수
      );
      alert("쿠키 설정 완료");
    } catch {
      alert("쿠키 설정 실패");
    }
  };

  // 쿠키 GET (/cookie)
  const getCookie = async () => {
    try {
      const res = await axios.get(`${API_BASE}/cookie`, {
        withCredentials: true,
      });
      setCookieValue(res.data);
    } catch {
      alert("쿠키 가져오기 실패");
    }
  };

  // 쿠키 DELETE (/cookie)
  const clearCookie = async () => {
    try {
      await axios.delete(`${API_BASE}/cookie`, {
        withCredentials: true,
      });
      setCookieValue("");
      alert("쿠키 삭제 완료");
    } catch {
      alert("쿠키 삭제 실패");
    }
  };

  // 노트 추가
  const addNote = async () => {
    if (!newTitle || !newContent) {
      alert("제목과 내용을 입력하세요");
      return;
    }
    try {
      await axios.post(`${API_BASE}/notes`, {
        title: newTitle,
        content: newContent,
      });
      setNewTitle("");
      setNewContent("");
      fetchNotes();
    } catch {
      alert("노트 추가 실패");
    }
  };

  // 노트 삭제
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE}/notes/${id}`);
      fetchNotes();
    } catch {
      alert("노트 삭제 실패");
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h2>쿠키 테스트</h2>
      <button onClick={setCookie} style={{ marginRight: 10 }}>
        쿠키 설정 (POST /cookie)
      </button>
      <button onClick={getCookie} style={{ marginRight: 10 }}>
        쿠키 조회 (GET /cookie)
      </button>
      <button onClick={clearCookie}>쿠키 삭제 (DELETE /cookie)</button>
      <p>쿠키 값: {cookieValue}</p>

      <hr />

      <h2>노트 관리</h2>
      <input
        placeholder="제목"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 6 }}
      />
      <textarea
        placeholder="내용"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 6, minHeight: 60 }}
      />
      <button onClick={addNote} style={{ marginBottom: 20 }}>
        노트 추가
      </button>

      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              marginBottom: 12,
              borderBottom: "1px solid #ddd",
              paddingBottom: 6,
            }}
          >
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              style={{ color: "red" }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
