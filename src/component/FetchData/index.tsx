import React from "react";
import { Button } from "antd";
import fetch from "../../utils/fetch";

const FetchData = () => {
  const setPersonInfo = async () => {
    const info = await fetch.post("/set/persion/info", {
      name: "小明",
      age: 12,
    });
    console.log("info", info);
  };

  const getPersonInfo = async () => {
    const info = fetch.get("/get/persion/info");
    // const info = await fetch.get('/get/persion/info')
    console.log("info", info);
  };

  return (
    <div>
      <Button onClick={setPersonInfo}>设置详情</Button>
      <Button onClick={getPersonInfo}>获取详情</Button>
    </div>
  );
};

export default FetchData;
