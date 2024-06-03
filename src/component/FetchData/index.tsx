import React, { useState } from "react";
import { Button, Upload, UploadProps } from "antd";
import fetch from "../../utils/fetch";

const FetchData = () => {
  const [info, setInfo] = useState({ url: "" });

  const setPersonInfo = async () => {
    const info = await fetch.post(
      "/set/persion/info?size=big",
      // 方式一：字符串形式
      // 'name=小明&age=1',
      // 方式二：json 对象形式
      {
        age: 12,
        name: "san",
      },
      {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("info", info);
  };

  const getPersonInfo = async () => {
    const info = await fetch.get("/get/persion/info");
    console.log("info", info);
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData(); // 创建FormData对象
    formData.append("age", "12");
    formData.append("name", "san");
    file && formData.append("file", file.file); // 将文件添加到FormData中

    const info: { data: { url: string } } = await fetch.post(
      "/upload/persion",
      // 方式一：字符串形式
      // 'name=小明&age=1',
      // 方式二：json 对象形式
      formData,
      {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
          // "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
        },
      }
    );

    setInfo({ url: info.data.url });
  };

  return (
    <div>
      <Button onClick={setPersonInfo}>post请求</Button>
      <hr />

      <Button onClick={getPersonInfo}>get请求</Button>

      <hr />
      <Upload
        name="file"
        onChange={(info) => {
          if (info.file.status === "done") {
            // 文件上传完毕后的操作
          }
        }}
        customRequest={uploadFile}
      >
        <Button>上传文件</Button>
      </Upload>

      <hr />

      {info.url ? <img src={info.url} /> : null}
    </div>
  );
};

export default FetchData;
