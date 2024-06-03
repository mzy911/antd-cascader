import React, { useState } from "react";
import Cascader, { ICascaderItem } from "./component/Cascader/Cascader";
import { data } from "./data";
import { Modal } from "antd";
import "./App.css";

function onOk() {
}
function onCancel() {
}

function App() {

  return (
    <Modal
      title="Modal"
      open={true}
      onOk={onOk}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      llllll
      {/* <iframe
          src="https://www.baidu.com"  // 替换为另一个系统的页面 URL
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="External Page"
        ></iframe> */}
    </Modal>
  );
}

export default App;
