import React, { Fragment, useState } from 'react';
import Dashboard from './Dashboard';

// import Links from '../backend/links'

const navigationItemsPages = {
   Dashboard: { label: 'Dashboard', component: <Dashboard /> },
   Import: { label: 'Import', component: <Dashboard /> },
   BackendLinks: { label: 'Backend Links', component: <Dashboard /> },
};

const navigationActionsPages = {
   Settings: { label: 'Settings', component: <div>Settings</div> }, 
}

const navigationPages = {
   ...navigationItemsPages,
   ...navigationActionsPages
}


const _getTabId = (itemKey) => {
   if (itemKey === 'Settings') {
      return null
   }
   return `ShapeColorPivot_${itemKey}`;
 };

const PageNavigation = () => {
   const [currentNavItem, setCurrentNavItem] = useState(Object.keys(navigationItemsPages)[0])

   const actionButtonProps = {
      iconProps: { 
         iconName: 'Settings', 
         style: { color: currentNavItem === 'Settings' ? 'blue' : 'black' } 
      },
      onClick: _ => { setCurrentNavItem('Settings')},
      text: "Settings"
   }

   return navigationPages[currentNavItem].component;
};

export default PageNavigation;
