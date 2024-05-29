import React, { useEffect, useState } from "react";
import { Checkbox, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { showNextLevel, setChecked, setActivce } from "../utils";
import "./SelectTree.less";

import { ICascaderItem } from "./Cascader";

interface IProps {
  data: ICascaderItem[];
  value: string[];
  onChange: (key: string, vals?: string[]) => () => void;
}

export interface IRenderDataItem extends ICascaderItem {
  checked?: boolean;
  active?: boolean;
  disabled?: boolean;
  children?: IRenderDataItem[];
}

const SelectTree = ({ data, value, onChange }: IProps) => {
  const [activeId, setActivceId] = useState<string | undefined>();
  const [renderData, setRenderData] = useState(setChecked(data, value));
  const [acticePaths, setActicePaths] = useState<IRenderDataItem[][]>([]);

  const renderTree = (itemData: IRenderDataItem[], index: number) => {
    const checkBoxClick = (key: string) => (e: any) => {
      if (e.target.nodeName === "INPUT") {
        // 点击勾选按钮：勾选、取消
        if (value.includes(key)) {
          onChange(key)();
        } else {
          onChange("", [...value, key])();
        }
      } else {
        // 点击 lable、空白处 展开下级
        setActivceId(key);
      }
    };

    return (
      <div className={"select-container"} key={"select-container" + index}>
        {itemData.map((item, i) => {
          return (
            <div
              className={item.active ? "select-item active" : "select-item"}
              key={"select-item" + item.key + item.checked + i}
              onClick={checkBoxClick(item.key)}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Checkbox defaultChecked={item.checked} disabled={item.disabled}>
                <div className={"oopooow"}> {item.title}</div>
              </Checkbox>
              {item.children && item.children.length > 0 ? (
                <RightOutlined />
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const activeData = setActivce(renderData, activeId);

    console.log("activeData", activeData);

    const paths = showNextLevel(activeData, activeId);

    setActicePaths(paths);
  }, [activeId, renderData]);

  useEffect(() => {
    setRenderData(setChecked(data, value));
  }, [value, data]);

  return (
    <div className="select-tree">
      {acticePaths.map((item, index) => {
        return renderTree(item, index);
      })}
    </div>
  );
};

export default SelectTree;
