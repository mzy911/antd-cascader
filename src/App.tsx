import React from "react";
import { SelectProps } from "antd/es/select";
import Cascader,{ICascaderItem} from "./component/Cascader/Cascader";
import {data} from "./data";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Cascader
        {...{
          data: data as ICascaderItem[],
          checked: ["jinrong"],
          okCallback: (val:string[]) => {
            console.log("选中的值", val);
          },
        }}
      />
    </div>
  );
}

export default App;
