import React from "react";

const Expense = React.lazy(() => 
   import("./components/Expense/Expense")
)

const Setting = React.lazy(() => 
   import("./components/Setting/setting")
)

const Profile = React.lazy(() => 
   import("./components/Profile/profile")
)

const routes = [
   {
      path:"/dashboard/expense",
      exact:true,
      name:"Expense",
      component: Expense
   },
   {
      path:"/dashboard/setting",
      exact:true,
      name:"Setting",
      component: Setting
   },
   {
      path:"/dashboard/profile",
      exact:true,
      name:"Profile",
      component: Profile
   }
]

export default routes;