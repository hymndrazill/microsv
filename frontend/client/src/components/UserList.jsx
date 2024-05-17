import React from 'react';

const UserList = ({ users }) => {
  return (
    <ul>
        <>
        {users?.map((user,_id) => 
          (
          <li key={_id}>
          <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </>
    </ul>
  );
};

export default UserList;
