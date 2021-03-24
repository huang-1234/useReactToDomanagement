/*
 * @Author: your name
 * @Date: 2021-02-04 17:00:29
 * @LastEditTime: 2021-02-04 23:50:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Goods-Manage-s\sgg-goods-manage\src\pages\login\login.jsx
 */
import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
// import { Form, Input, Button, Checkbox,message } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import logo from "./images/logo1.png";
// import "./login.less";
import "../css/login.css";
import { reqLogin } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

class Login extends Component {
  // 自定义印证
  /*
   用户名/密码的的合法性要求
     1). 必须输入
     2). 必须大于等于4位
     3). 必须小于等于12位
     4). 必须是英文、数字或下划线组成
    */
  validatorPwd = (rule,value,callback) => {
    console.log("validatePwd()密码因子自定义:", rule, value);
    if (!value) {
      callback('密码必须输入');
    }
    else if (value.length < 4 || value.length > 12) {
      callback('密码的长度为4到12位');
    }
    else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成');
    }else {
      callback() // 验证通过,这个callback一定要写，否则永远无法通过
    }
  }
  // 对账户密码进行合法性请求
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('输出Login组件的props参数', this.props)
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("提交登陆的ajax请求", values);
        // console.log("Received values of form: ", values);
        //
        const { username, password } = values;
        const result = await reqLogin(username, password);
        if (result.status === 0) {
          message.success('登录成功');

          // 保存user
          const user = result.data;
          //  console.log('用户',user, "登录成功yes",result);
          memoryUtils.user = user; // 保存在内存中
          //  console.log('保存到内存中的user信息',memoryUtils.user)
          storageUtils.saveUser(user); // 保存到local中
          //  console.log('保存到本地的user信息',storageUtils.getUser());

          // 跳转到管理界面 (不需要再回退回到登陆)
          this.props.history.replace("/");
        }else { // 登陆失败
          // 提示错误信息
          message.error(result.msg)
        }
      }else {
        console.log('检验失败!')
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" },
              { min: 4, message: "用户名长度为4到12" },
              { max: 12, message: "用户名长度为4到12" },
              {pattern: /^[a-zA-Z0-9]+$/,message:"用户名必须是英文、数字或下划线组成"},
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              { validator: this.validatorPwd }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="https???">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="https????">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}
//
export default Login = Form.create({ name: "normal_login" })(Login);
