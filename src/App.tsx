import React from "react";
import Cascader, { ICascaderItem } from "./component/Cascader/Cascader";
import { data } from "./data";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Cascader
        {...{
          data: data as ICascaderItem[],
          checked: ["jinrong", "shenghuo", "shenghuoa", "shenghuob"],
          okCallback: (val: string[]) => {
            console.log("选中的值", val);
          },
        }}
      />
    </div>
  );
}

export default App;
