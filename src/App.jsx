/*
 * @Author: hsq
 * @Date: 2021-02-04 16:08:38
 * @LastEditTime: 2021-02-04 18:44:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Goods-Manage-s\sgg-goods-manage\src\App.jsx
 */
import React, { Component } from 'react';
// import { } from 'antd'
import {
  BrowserRouter, Switch, Route
  // , Redirect
} from 'react-router-dom'

import 'antd/dist/antd.css'
import Login from './pages/login/login.jsx';
import Admin from './pages/admin/admin.jsx';
export default class App extends Component {
  render() {
    return (


        // {/* 掉转路由页面 */}
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Admin}></Route>
            {/* <Redirect to="/login" />; */}
          </Switch>
        </BrowserRouter>
    )
  }
}

