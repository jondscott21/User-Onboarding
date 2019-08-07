import React, {useState} from 'react';
import './App.css';
import Form from './components/Form'

function App() {
  const [users, setUsers] = useState([{name: '', email: ''}])
  console.log(users)
  return (
    <div className="App">
      <Form setUsers={setUsers} />
      {users.map(user => <div>{user.name}</div>)}
    </div>
  );
}

export default App;
