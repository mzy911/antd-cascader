import { ICascaderItem } from "./Cascader/Cascader";

// // 显示下一级
// export function showNextLevel(data, key = "id", activeId) {
//   let newData = JSON.parse(JSON.stringify(data));

//   let arr = [];
//   function find(nodes, deep) {
//     for (let i = 0; i < nodes.length; i++) {
//       const node = nodes[i];

//       if (node[key] === activeId) {
//         if (node?.children?.length > 0) {
//           arr = [...arr, node.children];
//         }
//         return true;
//       } else if (node?.children?.length > 0) {
//         const res = find(node.children, deep + 1);
//         if (res) {
//           arr = [node.children, ...arr];
//           return true;
//         }
//       }
//     }
//   }

//   find(newData, 0);
//   arr = [newData, ...arr];

//   return arr;
// }

// 元素添加 key, TreeSelect 的数据结构要求
export function addKey(data: ICascaderItem[]) {
  return data.map((item, index) => {
    const newItem = { ...item, key: item.value };
    if (item?.children && item?.children?.length > 0) {
      newItem.children = addKey(item.children);
    }
    return newItem;
  });
}

// // 元素设置active
// export function setActivce(data, arr = []) {
//   let newData = JSON.parse(JSON.stringify(data));
//   newData = newData.map((item, index) => {
//     const newItem = { ...item, active: !!arr.includes(item.id) };
//     if (item.children && item.children.length > 0) {
//       newItem.children = setActivce(item.children, arr);
//     }
//     return newItem;
//   });

//   return newData;
// }

// // 设置 checked 状态
// export function setChecked(data, ids) {
//   const newData = JSON.parse(JSON.stringify(data));
//   function find(nodes, parent, parentChecked) {
//     for (let i = 0; i < nodes.length; i++) {
//       const node = nodes[i];
//       if (ids.includes(node.id)) {
//         node.checked = (parent && !parentChecked) ? false: true;
//       } else {
//         node.checked = false;
//       }
//       node.disabled = (parent && !parent.checked) ? true : false;
//       if (node?.children?.length > 0) {
//         find(node.children, node, node.checked);
//       }
//     }
//   }
//   find(newData);

//   return newData;
// }

// // 设置 disabled 状态
// export function setDisabled(data, father) {
//   const newData = JSON.parse(JSON.stringify(data));
//   function find(nodes, father) {
//     for (let i = 0; i < nodes.length; i++) {
//       const node = nodes[i];
//       if (node?.children?.length > 0) {
//         if (father) {
//           node.disabled = !father.checked;
//         }
//         find(node.children, node);
//       } else {
//         if (father) {
//           node.disabled = !father.checked;
//         }
//       }
//     }
//   }
//   find(newData, null);

//   return newData;
// }

// 手动删除
export function delFromFatherToSon(
  data: ICascaderItem[],
  keys: string[],
  key: string
): string[] {
  let resKeys: string[] = JSON.parse(JSON.stringify(keys));
  function find(nodes: ICascaderItem[], del?: boolean) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const same = node.key === key;
      if (same && !del) {
        resKeys = resKeys.filter((keyItem) => keyItem !== key);
      }
      if (del) {
        resKeys = resKeys.filter((keyItem) => keyItem !== node.key);
      }
      if (node?.children && node?.children?.length > 0) {
        find(node.children, same || del);
      }
    }
  }
  find(data);

  return resKeys;
}

// // 手动删除
// export function setDelete(data, father) {
//   const newData = JSON.parse(JSON.stringify(data));
//   function find(nodes, father) {
//     for (let i = 0; i < nodes.length; i++) {
//       const node = nodes[i];
//       if (node?.children?.length > 0) {
//         if (father) {
//           node.disabled = !father.checked;
//         }
//         find(node.children, node);
//       } else {
//         if (father) {
//           node.disabled = !father.checked;
//         }
//       }
//     }
//   }
//   find(newData, null);

//   return newData;
// }
