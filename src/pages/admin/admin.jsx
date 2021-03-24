/*
 * @Author: hsq
 * @Date: 2021-02-04 17:03:16
 * @LastEditTime: 2021-02-04 17:03:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Goods-Manage-s\sgg-goods-manage\src\pages\admin\admin.jsx
 */
import React, { Component } from "react";
import { Redirect,Switch,Route } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import LeftNav from "../../components/Left-nav";
import Header from '../../components/Header'
// 引入路由组件
import Home from '../home/home';
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/Bar";
import Line from "../charts/Line";
import Pie from "../charts/Pie"; // 试错
// import NotFound from "../not-found/not-found";
// import Order from "../order/order";


import './admin.css'
// 引入antd的布局
import { Layout } from "antd";
const { Footer, Sider, Content } = Layout;


export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    console.log('登陆后主界面的user',!user)
     // 如果内存中没有user====>表示当前没有登陆
     if (!user || !user._id) {
       // 自动跳转到登录界面
      //  return <Redirect to="/login" />;
     }
    return (
      <Layout style={{
        minHeight: '100%',
        minWidth:'100%'
      }}>
        <Sider style={{backgroundColor:'rgba(256,256,0)'}}>
          <LeftNav/>
        </Sider>
        <Layout style={{
          width: '700px !importent'
        }}>
          <Header>Header</Header>
          <Content style={{
            margin: 20, backgroundColor: '#fff'
          }}>
            <Switch style={{width:'200px'}}>
              <Redirect from='/' exact to='/home'/>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path="/charts/Bar" component={Bar}/>
              <Route path="/charts/Pie" component={Pie}/>
              <Route path="/charts/Line" component={Line}/>
              {/* <Route path="/order" component={Order}/>
              <Route component={NotFound}/> */}
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
