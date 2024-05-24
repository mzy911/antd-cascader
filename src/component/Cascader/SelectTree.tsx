import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import {
  showNextLevel,
  // setActivce,
  setChecked,
  // setDisabled,
} from "../utils";
import "./SelectTree.less";
import "./SelectTree.css";

import { ICascaderItem } from "./Cascader";

interface IProps {
  data: ICascaderItem[];
  value: string[];
  onChange: (key:string) => ()=>void;
}

export interface IRenderDataItem extends ICascaderItem {
  checked?:boolean;
  active?:boolean;
  disabled?:boolean;
  children?:IRenderDataItem[]
}


const SelectTree = ({data, value, onChange}: IProps) => {
  const [activeId] = useState();
  // const [dealData, setDealData] = useState([]);

  const [renderData, setRenderData] = useState(setChecked(data, value));
  const [acticePaths, setActicePaths] = useState<IRenderDataItem[][]>([]);

  // // console.log("setChecked(data, value)", setChecked(data, value));

  // // console.log('renderData',renderData);
  const renderTree = (itemData:IRenderDataItem[], index:number) => {
    // let deep = index;
    // let indexId = 0;
    // let id = acticePaths[0] + Date.now() + index;
    // let disabledData = setDisabled(renderData);
    // let data = JSON.parse(JSON.stringify(disabledData));

    // // while (deep > 0) {
    // //   const preId = acticePaths[indexId];
    // //   const preData = data.find((item) => item.id === preId);
    // //   indexId++;
    // //   const nextId = acticePaths[indexId];
    // //   data = preData.children;
    // //   id = nextId;
    // //   deep--;
    // // }

    // const checkBoxClick = (id) => (e) => {
    //   if (e.target.nodeName === "INPUT") {
    //     // 点击勾选按钮：勾选、取消
    //     if (value.includes(id)) {
    //       onChange(value.filter((val) => val !== id));
    //     } else {
    //       onChange([...value, id]);
    //     }
    //   } else {
    //     // 点击 lable、空白处 展开下级
    //     setActivceId(id);
    //   }
    // };

    return (
      <div className={"select-container"} key={"select-container" + index}>
        {itemData.map((item) => {
          return (
            <div
              className={item.active ? "select-item active" : "select-item"}
              key={"select-item" + item.key}
              // onClick={checkBoxClick(item.id)}
            >
              <Checkbox defaultChecked={item.checked} disabled={item.disabled}>
                <div className={"oopooow"}>{item.title}</div>
              </Checkbox>
              {/* <Icon type="right" /> */}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const paths = showNextLevel(renderData,activeId);
    setActicePaths(paths);
  }, [activeId, renderData]);

  // useEffect(() => {
  //   setRenderData(setChecked(data, value))
  // }, [value]);

  return (
    <div className="select-tree">
      {
        acticePaths.map((item, index) => {
          return renderTree(item, index);
        })
      }
    </div>
  );
};

export default SelectTree;
