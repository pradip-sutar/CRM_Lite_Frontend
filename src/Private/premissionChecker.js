export function hasTabPermission(tabName, permissions) {
  console.log(permissions);
  console.log(tabName);
  const tab = permissions?.find((permission) => permission.tabName === tabName);
  console.log(tab);
  if (!tab) {
    return false;
  } else {
    console.log(tab);
    return true;
  }
}

export function hasSubTabPermission(tabName, subTabName, permissions) {
  const tab = permissions?.find((permission) => permission.tabName === tabName);
 if(!tab){
    return false;
 }
 const subTab=tab.subTabs.find((subtab)=>subtab.name===subTabName);
 return subTab ? true : false;
}

export function hasRightsPermission(tabName,subTabName,rights,permissions){
    const tab=permissions?.find((permission)=>permission.tabName===tabName);
    if(!tab){
        return false;
    }
    const subtab=tab?.subTabs?.find((subtab)=>subtab.name===subTabName);
    return subtab ? subtab?.permissions[rights] : false;
}
  


