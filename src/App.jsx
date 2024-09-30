import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import TaskOne from "./TaskOne";
import TaskTwo from "./TaskTwo";
import TaskThree from "./TaskThree";
import TaskFour from "./TaskFour";
import "../src/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TaskOne />} />
          <Route path="/user" element={<TaskOne />} />
          <Route path="/users" element={<TaskTwo />} />
          <Route path="/users/sort" element={<TaskThree />} />
          <Route path="/users/pagination" element={<TaskFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
