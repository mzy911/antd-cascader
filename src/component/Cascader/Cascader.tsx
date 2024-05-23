import React, { useState, useRef, useEffect } from "react";
import { Select } from "antd";
import { SelectProps } from "antd/es/select";
import { Tooltip, Tag } from "antd";
// import SelectTree from "./SelectTree";
import { addId } from "../utils";
import "./Cascader.less";

export interface ICascaderItem{
  label: string;
  value: string;
  id: string;
  checked?: Boolean;
  active?: Boolean;
  children?: ICascaderItem[];
}

interface IProps {
  data: ICascaderItem[] ;
  checked: string[];
  okCallback: (string: []) => void;
}

const Cascader = ({ data, checked: initValue, okCallback }: IProps) => {


  // 勾选集合
  const [selected, setSeleced] = useState<string[]>(initValue);
  // 下拉框
  const [showSelect, setShowSelect] = useState(false);

  const [renderData, setRenderData] = useState(addId(JSON.parse(JSON.stringify(data)), 'abcd'))

  // 原始数据
  // const 

  // const dealData = JSON.parse(JSON.stringify(addId(data.data, "abcd")));

  // const myRef = useRef(null);

  const handleChange = (value: string[]) => {
    setSeleced(value);
  };

  const deleteTag = (val: string) => () => {
    console.log("delete", val, selected);
    setSeleced(selected.filter((select) => select !== val));
  };

  // const handleClickOutside = (event) => {
  //   const antTooltip = document.querySelector(".abcdefc");
  //   if (
  //     !myRef.current?.contains?.(event.target) &&
  //     !antTooltip?.contains?.(event.target)
  //   ) {
  //     // 点击弹窗外部
  //     setShowSelect(false);
  //   }
  // };

  // useEffect(() => {
  //   // 在组件挂载时添加事件监听器
  //   document.addEventListener("click", handleClickOutside, true);

  //   return () => {
  //     // 在组件卸载时移除事件监听器
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // }, []);

  return (
    <div
      className="select-tree-container"
      style={{ marginTop: "50px", marginLeft: "50px" }}
    >
      <Select
        mode="multiple"
        autoClearSearchValue={true}
        style={{ width: "200px" }}
        placeholder="Please select"
        defaultValue={initValue}
        value={selected}
        onChange={handleChange}
        onClick={() => {
          setShowSelect(true);
        }}
        maxTagCount={1}
        showSearch={true}
        open={false}
        options={data as {label:string; value:string}[]}
        // maxTagPlaceholder={(a) => {
        //   const label = a?.[0]?.label;
        //   const tabs =
        //     selected.length > 2 ? (
        //       <div>
        //         {selected
        //           .filter((_item, index) => index > 1)
        //           .map((item) => {
        //             return (
        //               <Tag key={item} closable onClose={deleteTag(item)}>
        //                 {item}{" "}
        //               </Tag>
        //             );
        //           })}
        //       </div>
        //     ) : null;

        //   return (
        //     <Tooltip overlayClassName="abcdefc" placement="topLeft" title={tabs}>
        //       <span className="ant-select-selection-item-content">
        //         +{label}...
        //       </span>
        //     </Tooltip>
        //   );
        // }}
      />

      <br />

      {/* {showSelect ? (
        <div className="select-tree-warp" ref={myRef}>
          <SelectTree
            data={dealData}
            value={selected}
            onChange={setSeleced}
          />

          <div style={{ border: "1px solid #ddd" }}>
            <button type="">确定</button>
            <button type=""> 取消</button>
          </div>
        </div>
      ) : null} */}
    </div>
  );
};
export default Cascader;
