import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal } from "antd";
import LinkButton from "../link-button";

import { formateDate } from "../../utils/dateUtils";
import { reqWeather } from "../../api/index";
import "../css/header.css";

import menuList from "../../navConfig/menuConfig";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from '../../utils/storageUtils'

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: "",
    weather: "",
  };
  /* 定时器 */
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({ currentTime: currentTime });
    }, 1000);
  };
  /* 获取天气信息 */
  getWeather = async () => {
    // 调用接口请求异步获取数据
    const { dayPictureUrl, weather } = await reqWeather("北京");
    // 更新状态
    this.setState({ dayPictureUrl, weather });
  };
  // 获取当前的导航项
  getTitle = () => {
    let title;
    const path = this.props.location.pathname;
    menuList.forEach((menuItem) => {
      if (path === menuItem.key) {
        title = menuItem.title;
      } else if (menuItem.children) {
        const cItem = menuItem.children.find((cItem) => path === cItem.key);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };
  /* 退出函数 */
  logout = () => {
    Modal.confirm({
      // title: "Are you sure delete this task?",
      content: "确认退出吗？",
      /*   okText: "Yes",
      okType: "danger",
      okButtonProps: {
      disabled: true, // 不可选中ok键
      },
      cancelText: "No", */
      onOk: () => {
        console.log("OK", this);
        storageUtils.removeUser();
        memoryUtils.user = {};

        this.props.history.replace("/login");
      },
      onCancel: () => {
        console.log("Cancel");
      },
    });
  };
  /* 生命周期 */
  componentDidMount() {
    this.getTime();
    // this.getWeather();
  }
  // 组件卸载之前调用
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId);
  }
  render() {
    let time = this.state.currentTime;
    const username = storageUtils.getUser().username;
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎! {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{this.getTitle()}</div>
          <div className="header-bottom-right">
            <span>{"时间：" + time}</span>
            {/* <img src="/images/sun.jpg" alt="weather" /> */}
            <span>晴天</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
