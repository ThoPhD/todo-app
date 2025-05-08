import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');

  const API_URL = process.env.REACT_APP_API_URL;

  // Gọi API lấy danh sách user
  const fetchUsers = () => {
    fetch(`${API_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Lỗi gọi API:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Gửi user mới
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newName.trim()) return;

    fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName })
    })
      .then(res => res.json())
      .then(data => {
        setUsers(prev => [...prev, data]);
        setNewName('');
      })
      .catch(err => console.error("Lỗi gửi user:", err));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Danh sách người dùng</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} (ID: {user.id})</li>
        ))}
      </ul>

      <h2>Thêm người dùng mới</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newName}
          placeholder="Nhập tên"
          onChange={(e) => setNewName(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default App;
