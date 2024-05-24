import { ICascaderItem } from "./Cascader/Cascader";
import { IRenderDataItem } from "./Cascader/SelectTree";

// 显示下一级
export function showNextLevel(
  data: IRenderDataItem[],
  activeId: string | undefined
): IRenderDataItem[][] {
  let newData: IRenderDataItem[] = JSON.parse(JSON.stringify(data));

  let arr: IRenderDataItem[][] = [];

  function find(nodes: IRenderDataItem[], deep: number) {
    for (let i = 0; i < nodes.length; i++) {
      const node: IRenderDataItem = nodes[i];
      if (node.key === activeId) {
        if (node.children && node?.children?.length > 0) {
          arr = [...arr, node.children];
        }
        return true;
      } else if (node.children && node.children.length > 0) {
        const res = find(node.children, deep + 1);
        if (res) {
          arr = [node.children, ...arr];
          return true;
        }
      }
    }
  }

  find(newData, 0);
  arr = [newData, ...arr];

  return arr;
}

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

// 元素设置active
export function setActivce(data: IRenderDataItem[], key?: string) {
  if (!key) {
    return data;
  }

  let newData: IRenderDataItem[] = JSON.parse(JSON.stringify(data));

  function find(nodes: IRenderDataItem[]): boolean {
    let findItem = false;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.key === key) {
        node.active = true;
        findItem = true;
        return true;
      } else {
        node.active = false;
      }

      if (node.children && node.children.length > 0) {
        const res = find(node.children);
        node.active = res;
        findItem = !!res;
      }
    }

    return findItem;
  }
  find(newData);

  return newData;
}

// 设置 checked 状态
export function setChecked(
  data: ICascaderItem[],
  keys: string[]
): IRenderDataItem[] {
  const newData: IRenderDataItem[] = JSON.parse(JSON.stringify(data));
  function find(
    nodes: IRenderDataItem[],
    parent?: IRenderDataItem,
    parentChecked?: boolean
  ) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (keys.includes(node.key)) {
        node.checked = parent && !parentChecked ? false : true;
      } else {
        node.checked = false;
      }
      node.disabled = parent && !parent.checked ? true : false;
      if (node.children && node.children.length > 0) {
        find(node.children, node, node.checked);
      }
    }
  }
  find(newData);

  return newData;
}

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
