import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon, Button } from "antd";

import "./index.css";
import logo1 from "../../assets/images/logo1.png";

import menuList from "../../navConfig/menuConfig";
const { SubMenu } = Menu;

class LeftNav extends Component {
  state = {
    collapsed: false,
  };
  // 变换
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  //根据menu的数据数组生成对应的标签数组作为导航项
  getMenuNodes_map = (menuList) => 
    menuList.map((menuItem) => {
      if (!menuItem.children) {  // 如果孩子不节点存在，则直接遍历
        return (
          <Menu.Item key={menuItem.key}>
            <Link to={menuItem.key}>
              <Icon type={menuItem.icon} />
              <span>{menuItem.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = menuItem.children.find(cItem => cItem.key === this.path);
        if (cItem) {
          this.openKey = menuItem.key
        }
        return(   
        <SubMenu
          key={menuItem.key}
          title={
            <span>
              <Icon type={menuItem.icon} />
              <span>{menuItem.title}</span>
            </span>
          }
        >
          {this.getMenuNodes_map(menuItem.children)}
        </SubMenu>
        )
      }
    })
  //
    /*
  根据menu的数据数组生成对应的标签数组
  使用reduce() + 递归调用
  */
  getMenuNodes_reduce = (menuList) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname

    return menuList.reduce((pre, item) => {

      // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
      if (this.hasAuth(item)) {
        // 向pre添加<Menu.Item>
        if(!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {

          // 查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          // 如果存在, 说明当前item的子列表需要打开
          if (cItem) {
            this.openKey = item.key
          }
          // 向pre添加<SubMenu>
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
              }
            >
              {this.getMenuNodes_reduce(item.children)}
            </SubMenu>
          ))
        }
      }
      return pre
    }, [])
  }

  /*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
   */
  componentWillMount() {
    // 在组件LeftNav将要挂载的时候生成menuNodes菜单节点
    this.menuNodes = this.getMenuNodes_map(menuList)
  }

  render() {
    console.log('输出遍历导航数组而生成的节点值',this.menuNodes)
    //  得到当前请求的路由路径
    console.log('输出路由组件的参数：',this.props)
    const path = this.props.location.pathname;
    const openKey = this.openKey;

    return (
      <div>
        <Link to="/" className="left-nav">
          <header className="left-nav-header">
            <img src={logo1} alt="logo" />
            <h1>商品管理后台</h1>
          </header>
        </Link>
        {/*  */}
        <div style={{ width: 200 }}>
          <Button
            type="primary"
            onClick={this.toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
          </Button>
          <Menu
            // defaultSelectedKeys={["1"]}
            selectedKeys={[path]}
            defaultOpenKeys={[openKey]}
            mode="inline"
            theme="dark"
            // inlineCollapsed={this.state.collapsed}
          >
            
{/*          
 //#region    
            <Menu.Item key="/home">
              <Link to="/home">
                <Icon type="pie-chart" />
                <span>首页</span>
              </Link>
            </Menu.Item>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>商品</span>
                </span>
              }
            >
              <Menu.Item key="/category">
                <Link to="/category">
                  <Icon type="inbox" />
                  <span>品类管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/products">
                <Link to="/products">
                  <Icon type="inbox" />
                  <span>商品管理</span>
                </Link>
              </Menu.Item>
            </SubMenu>
 //#endregion
 */}
            {
              this.menuNodes  // 将生成的菜单导航节点放到组件当中去
            }
          </Menu>
        </div>
        ;
      </div>
    );
  }
}

export default withRouter(LeftNav)