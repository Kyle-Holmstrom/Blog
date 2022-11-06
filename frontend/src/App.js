import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import Shop from './components/Shop';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import Auth from './components/Auth';
import RecordList from './components/UserList';
import Create from './components/AddUser';
import EditUser from './components/EditUser';

import './App.css';

class App extends Component {
  render() {
    return(
      <div>
        <Navbar />
        <Routes>
          <Route exact path="blog" element={<Blog />} />
          <Route path="shop" element={<Shop />} />
          <Route path="login" element={<Auth />} />
          <Route path="users" element={<RecordList />} />
          <Route path="add-user" element={<Create />} />
          <Route path="edit/:id" element={<EditUser />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    );
  }
}

export default App;
