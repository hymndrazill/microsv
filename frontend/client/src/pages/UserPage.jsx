import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4001/users')
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>List of Users</h1>
      { users.length ? (
        <UserList users={users} />
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
  
};

export default UsersPage;
