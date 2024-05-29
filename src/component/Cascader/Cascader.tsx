import React, { useState, useRef, useEffect, RefObject } from "react";
import { TreeSelect } from "antd";
import { Tooltip, Tag } from "antd";
import SelectTree from "./SelectTree";
import { addKey, delFromFatherToSon } from "../utils";
import "./Cascader.less";

export interface ICascaderItem {
  title: string;
  value: string;
  key: string;
  checked?: Boolean;
  active?: Boolean;
  children?: ICascaderItem[];
}

interface IProps {
  data: ICascaderItem[];
  checked: string[];
  okCallback: (values: string[]) => void;
}
const Cascader = ({ data, checked: initValue, okCallback }: IProps) => {
  // 勾选集合
  const [selected, setSeleced] = useState<string[]>(initValue);
  // 下拉框
  const isShow = React.useRef(false);
  const [, setShowTree] = useState(false);
  const [renderData] = useState(addKey(JSON.parse(JSON.stringify(data))));
  const myRef: RefObject<HTMLDivElement> = useRef(null);

  const deleteTag = (val: string, vals?: string[]) => () => {
    if (vals) {
      setSeleced(vals);
    } else {
      const resTags = delFromFatherToSon(renderData, selected, val);
      setSeleced(resTags);
    }
  };

  const handleClickOutside = (event: any) => {
    // 点击 Tooltip
    const antTooltip = document.querySelector(".myselef-tool-tip");
    // 点击 TreeSelect
    const myselefTree = document.querySelector(".myselef-tree-select");

    if (
      isShow.current &&
      !myRef.current?.contains?.(event.target) &&
      !antTooltip?.contains?.(event.target) &&
      !myselefTree?.contains?.(event.target)
    ) {
      // 点击弹窗外部
      // setSeleced(initValue);
      isShow.current = false;
      setShowTree(false);
    }
  };

  useEffect(() => {
    // 在组件挂载时添加事件监听器
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      // 在组件卸载时移除事件监听器
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);


  return (
    <div
      className="select-tree-container"
      style={{ marginTop: "50px", marginLeft: "50px" }}
    >
      <TreeSelect
        {...{
          className: "myselef-tree-select",
          treeData: renderData,
          value: selected,
          treeCheckable: true,
          style: {
            width: "360px",
          },
          maxTagCount: 3,
          treeCheckStrictly: true,
          open: false,
          onChange: () => {
            const value = selected[0];
            value && deleteTag(value)();
          },
          onFocus: () => {
            isShow.current = true;
            setShowTree(true);
          },
          maxTagPlaceholder: (checkedData) => {
            const len = checkedData.length;
            const tabs = (
              <div>
                {checkedData.map((item) => {
                  return (
                    <Tag
                      key={item.key}
                      onClose={deleteTag(item.key as string)}
                      closable={true}
                    >
                      {item.label}
                    </Tag>
                  );
                })}
              </div>
            );

            return (
              <Tooltip
                overlayClassName="myselef-tool-tip"
                placement="topLeft"
                title={tabs}
              >
                <span className="ant-select-selection-item-content">
                  + {len} ...
                </span>
              </Tooltip>
            );
          },
        }}
      />
      {isShow.current ? (
        <div className="select-tree-warp" ref={myRef}>
          <SelectTree data={renderData} value={selected} onChange={deleteTag}/>
        </div>
      ) : null}
    </div>
  );
};
export default Cascader;
