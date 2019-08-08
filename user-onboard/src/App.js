import React, {useState} from 'react';
import './App.css';
import Form from './components/Form'
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([])
  console.log(users)
  return (
    <div className="App">
      <Form setUsers={setUsers} />
      <div className='user-wrapper'>
        {users.map(user => <UserList key={user.id} user={user}></UserList>)}
      </div>
    </div>
  );
}

export default App;
