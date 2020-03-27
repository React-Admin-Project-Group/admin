import React from 'react';
import PageRouter from './router/PageRouter'
import Style from './app.module.less'
function App() {
  return (
    <div className={Style.app}>
      <PageRouter></PageRouter>
    </div>
  );
}

export default App;
