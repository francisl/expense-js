import React, { Fragment, useState } from 'react';
import InvoiceDashboard from '../components/dashboard/dashboard';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import Links from '../components/backend/links'

initializeIcons(/* optional base url */);

const navigationItemsPages = {
   Dashboard: { label: 'Dashboard', component: <InvoiceDashboard /> },
   Import: { label: 'Import', component: <InvoiceDashboard /> },
   BackendLinks: { label: 'Backend Links', component: <Links /> },
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

const MainPage = () => {
   const [currentNavItem, setCurrentNavItem] = useState(Object.keys(navigationItemsPages)[0])

   const actionButtonProps = {
      iconProps: { 
         iconName: 'Settings', 
         style: { color: currentNavItem === 'Settings' ? 'blue' : 'black' } 
      },
      onClick: _ => { setCurrentNavItem('Settings')},
      text: "Settings"
   }

   return <Fragment>
      <div
         style={{
            display: 'flex',
            alignItems: 'center'
         }}
      >
         <Pivot
            style={{ flexGrow: 1 }}
            selectedKey={Object.keys(navigationItemsPages).indexOf(currentNavItem) >= 0 ? currentNavItem : null}
            onLinkClick={({ props }) => { setCurrentNavItem(props.itemKey)}}
            headersOnly={true}
            getTabId={_getTabId}
         >
            {Object.keys(navigationItemsPages).map(key => (
               <PivotItem key={`pivotItemKey_${key}`} headerText={navigationItemsPages[key].label} itemKey={key} />   
            ))}
         </Pivot>
         {
            currentNavItem === 'Settings' ?
               <PrimaryButton {...actionButtonProps} /> :
               <DefaultButton {...actionButtonProps} />
         }
         
      </div>
     {navigationPages[currentNavItem].component}
   </Fragment>;
};

export default MainPage;
