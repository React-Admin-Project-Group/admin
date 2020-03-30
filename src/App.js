import React from 'react';
import CheckLogin from './components/CheckLogin'
import PageRouter from './router/PageRouter'
import Style from './app.module.less'
function App() {
  return (
    <div className={Style.app}>
      <CheckLogin>
        <PageRouter></PageRouter>
      </CheckLogin>
    </div>
  );
}

export default App;
