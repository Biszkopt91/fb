import * as React from 'react';
import './App.scss';

import FakeRouter from './features/fake-router/FakeRouter';

class App extends React.Component {
  render() {
    return (
     <FakeRouter/>
    );
  }
}

export default App;
