// import React from 'react';
// import { Switch, Route, Redirect } from "react-router-dom";

// import { Layout, Menu, Breadcrumb, Icon } from 'antd';

// const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

// export default class Dashboard extends React.Component {
//   state = {
//     collapsed: false,
//   };

//   onCollapse = collapsed => {
//     console.log(collapsed);
//     this.setState({ collapsed });
//   };

//   render() {
//     return (
//       <Layout style={{ minHeight: '100vh' }}>
//         <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
//           <div className="logo" />
//           <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//             <Menu.Item key="1">
//               <Icon type="pie-chart" />
//               <span>Home</span>
//             </Menu.Item>
//             <Menu.Item key="2">
//               <Icon type="desktop" />
//               <span>Settings</span>
//             </Menu.Item>
            
//             <Menu.Item key="9">
//               <Icon type="file" />
//               <span>Profile</span>
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout>
//           <Header style={{ background: '#fff', padding: 0 }} />
//           <Content style={{ margin: '0 16px' }}>
//             <Breadcrumb style={{ margin: '16px 0' }}>
//               <Breadcrumb.Item>User</Breadcrumb.Item>
//               <Breadcrumb.Item>Bill</Breadcrumb.Item>
//             </Breadcrumb>
//             {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
//             <Switch>
//                <Route key="1" path="/" exact="/" name="" render={}/>
//             </Switch>
//           </Content>
//           <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//         </Layout>
//       </Layout>
//     );
//   }
// }

import React, { Component, Suspense } from "react";
import { Container } from "reactstrap";
import Header from "./Header";
import { Switch, Route, Redirect } from "react-router-dom"; 
import * as router from "react-router-dom";

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";

import navigation from "../../_nav";
import routes from "../../routes";

import { connect } from "react-redux";
import { deleteUser } from "../../apis/storage";

// import { logoutAction } from "../../actions/authActions";

export default class Dashboard extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    //this.props.logoutAction();
    deleteUser()
    console.log("Log Out");
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <Header onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : (
                      console.log("None")
                    );
                  })}
                  {/* <Redirect from="/" to="/dashboard" /> */}
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <React.Fragment>
              <span>&copy; 2019 creativeLabs.</span>
              <span className="ml-auto">
                Powered by{" "}
                <a href="https://techzillaindia.com">
                  Techzilla India Infotech
                </a>
              </span>
            </React.Fragment>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}