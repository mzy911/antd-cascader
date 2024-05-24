import React,{useState} from "react";
import Cascader, { ICascaderItem } from "./component/Cascader/Cascader";
import { data } from "./data";
import "./App.css";

function App() {

  const [checked, setChecked] = useState( ["jinrong", "shenghuo","shenghuo1","shenghuo11", "shenghuoa", "shenghuob"])
  return (
    <div className="App">
      <Cascader
        {...{
          data: data as ICascaderItem[],
          checked,
          okCallback: (val: string[]) => {
            setChecked(val)
            console.log("选中的值", val);
          },
        }}
      />
    </div>
  );
}

export default App;
