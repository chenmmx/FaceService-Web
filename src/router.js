/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Application from './pages/application';
import ApplicationCreateForm from './pages/application/form/createForm';
import Callback from './pages/callback';
import Device from './pages/device';
import Person from './pages/person';
import Record from './pages/record';


export default function AppRouter() {
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
      id: '2', path: '/device', title: '设备管理', exact: false, component: Device
    },
    {
      id: '3', path: '/person', title: '人员管理', exact: false, component: Person
    },
    {
      id: '4', path: '/record', title: '识别记录管理', exact: false, component: Record
    }
  ];

  return (
  // <Router>
    <div className="routes">
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
  // </Router>
  );
}
