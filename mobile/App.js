import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';

function App() {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#5C29B5' />
      <Routes />
    </>
  );
}

export default App;