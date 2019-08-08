import React from 'react';

function UserList({user}) {
    return (
        <div className='user-card'>
            <h3>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h3>
            <p>{user.email}</p>
            <p>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
        </div>
    )
}

export default UserList;