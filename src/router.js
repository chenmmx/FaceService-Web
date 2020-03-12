/*
 * @Description: In User Settings Edit
 * @Author: chenmmx
 * @Date: 2019-09-18 11:36:12
 * @LastEditTime: 2019-09-18 11:36:12
 * @LastEditors: chenmmx
 */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Application from './pages/application';
import ApplicationCreateForm from './pages/application/form/create';
import Callback from './pages/callback';
import Device from './pages/device';
import ResourceNode from './pages/resource/node';
import DeviceFormAdd from './pages/device/terminal/form/add';
import DeviceFormUpdate from './pages/device/terminal/form/update';
import Person from './pages/person';
import AddPerson from './pages/person/form/create';
import Record from './pages/record';
import Accredit from './pages/person/accredit/accredit';
import Account from './pages/account';

const AppRouter = () => {
  const routeConfig = [
    {
      id: '0', path: '/application', title: '应用管理', exact: true, component: Application
    },
    {
      id: '5', path: '/application/create', title: '应用管理', exact: false, component: ApplicationCreateForm
    },
    {
      id: '1', path: '/callback', title: '回调管理', exact: false, component: Callback
    },
    {
      id: '2', path: '/device', title: '设备管理', exact: true, component: Device
    },
    {
      id: '11', path: '/resource/node', title: '边缘节点', exact: true, component: ResourceNode
    },
    {
      id: '8', path: '/device/add', title: '绑定设备', exact: false, component: DeviceFormAdd
    },
    {
      id: '9', path: '/device/update/:id', title: '编辑设备', exact: false, component: DeviceFormUpdate
    },
    {
      id: '3', path: '/person', title: '人员管理', exact: true, component: Person
    },
    {
      id: '6', path: '/person/addPerson', title: '添加人员', exact: false, component: AddPerson
    },
    {
      id: '7', path: '/person/accredit/:id', title: '人员授权', exact: false, component: Accredit
    },
    {
      id: '4', path: '/record', title: '识别记录管理', exact: false, component: Record
    },
    {
      id: '10', path: '/account', title: '账号管理', exact: false, component: Account
    }
  ];

  return (
    <div className="routes">
      <Route path="/" exact render={() => <Redirect to="/login" />} />
      {
        routeConfig.map((item) => (
          <Route
            key={item.id}
            exact={item.exact}
            path={item.path}
            component={item.component}
          />
        ))
        }
    </div>
  );
};

export default AppRouter;
