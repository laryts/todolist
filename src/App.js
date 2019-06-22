import React from "react";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ListTodo from "./components/Tasks/list";

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      {/* <h1>Teste</h1> */}
      {/* <Loading /> */}
      <Header />
      <ListTodo />
      <Footer />
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
