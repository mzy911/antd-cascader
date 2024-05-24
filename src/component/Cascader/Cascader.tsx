import React, { useState } from "react";
import { TreeSelect } from "antd";
import { Tooltip, Tag } from "antd";
// import SelectTree from "./SelectTree";
import { addKey, delFromFatherToSon } from "../utils";

// import "./Cascader.less";

export interface ICascaderItem {
  label: string;
  value: string;
  key: string;
  checked?: Boolean;
  active?: Boolean;
  children?: ICascaderItem[];
}

interface IProps {
  data: ICascaderItem[];
  checked: string[];
  okCallback: (string: []) => void;
}

const Cascader = ({ data, checked: initValue, okCallback }: IProps) => {
  // 勾选集合
  const [selected, setSeleced] = useState<string[]>(initValue);
  // 下拉框
  // const [showSelect, setShowSelect] = useState(false);

  const [renderData] = useState(addKey(JSON.parse(JSON.stringify(data))));

  console.log("renderData", renderData);

  // 原始数据
  // const

  // const dealData = JSON.parse(JSON.stringify(addKey(data.data, "abcd")));

  // const myRef = useRef(null);

  // const handleChange = (value: string[]) => {
  //   setSeleced(value);
  // };

  const deleteTag = (val: string) => () => {
    const aa = delFromFatherToSon(renderData, selected, val);
    console.log("aa", val, aa);

    setSeleced(aa);
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
      <TreeSelect
        {...{
          treeData: renderData,
          // value: selected,
          defaultValue: selected,
          treeNodeLabelProp: "label",
          treeCheckable: true,
          style: {
            width: "200px",
          },
          maxTagCount: 1,
          // treeCheckStrictly: true, // 子选项不受父亲影响
          // open: false,
          // onChange: (values) => {
          //   console.log("当前", values);
          // },
          maxTagPlaceholder: (checkedData) => {
            console.log("checkedData", checkedData);

            const len = checkedData.length;
            const tabs = (
              <>
                {checkedData.map((item) => {
                  return (
                    <Tag
                      {...{
                        key: item.key,
                        closable: true,
                        onClick: (aa) => {
                          console.log(111111, aa);
                          // deleteTag(item.key as string);
                        },
                        // onClose: (aa) => {
                        //   console.log(111111, aa);
                        //   // deleteTag(item.key as string);
                        // },
                      }}
                    >
                      {item.label}{" "}
                    </Tag>
                  );
                })}
              </>
            );

            return (
              <Tooltip
                overlayClassName="abcdefc"
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
      {/* <Select
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
        // open={false}
        options={data as { label: string; value: string }[]}
        
      /> */}
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
