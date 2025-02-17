import React, { Component } from "react";
import { Card, Table, Button, Icon, message, Modal } from "antd";

/* 商品分类 */
export default class Category extends Component {
  render() {
    const title = "一级目录";
    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        添加
      </Button>
    );
    // 数据
    const dataSource = [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ];

    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address",
      },
    ];

    return (
      <div>
        <Card title={title} extra={extra} style={{ width: "100%" }}>
          <Table dataSource={dataSource} columns={columns} />
        </Card>
        ;
      </div>
    );
  }
}
