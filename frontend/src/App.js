import React, { Component } from 'react';
import { Route, Routes} from 'react-router-dom';

import Shop from './components/Shop';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import Auth from './components/Auth';
import RecordList from './components/userList';

class App extends Component {
  render() {
    return(
      <div>
        <Navbar />

        {/* Handle routing to shop section */}

        <Routes>
          <Route exact path="/" element={<Blog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="auth" element={<Auth />} />
          <Route path="show-users" element={<RecordList />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    );
  }
}

export default App;
