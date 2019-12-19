import React, { Fragment, useState } from 'react';
import InvoiceDashboard from '../components/dashboard/dashboard';

import Links from '../components/backend/links'

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
         {/* <Pivot
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
            <Button variant="contained" color="primary" {...actionButtonProps} /> :
            <Button variant="contained"> {...actionButtonProps} />
         } */}
         
      </div>
     {navigationPages[currentNavItem].component}
   </Fragment>;
};

export default MainPage;
