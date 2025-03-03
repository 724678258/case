import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import AuthRoute from "@/components/AuthRoute";
import ClassificationManagement from "@/pages/classificationManagement";
import FoodManagement from "@/pages/foodManagement";
import StaffManagement from "@/pages/staffManagement";
import AddStaffPage from "@/pages/staffManagement/addStaffModal";

export const routes: any[] = [
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/foodmanagement" />, //默认选中页面
      },
      { path: "/foodmanagement", element: <FoodManagement /> },
      {
        path: "/classificationmanagement",
        element: <ClassificationManagement />,
      },
      {
        path: "/staffmanagement",
        element: <StaffManagement />,
      },
      {
        path: "/staffmanagement/add",
        element: <AddStaffPage />,
        meta: {
          menu: "/staffmanagement",
        },
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export function getRouteMetaByRoutePath(path: string) {
  let meta: any = null;

  const traverse = (routes: any[]) => {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (route.path === path) {
        meta = route.meta;
        break;
      }
      if (route.children) {
        traverse(route.children);
      }
    }
  };

  traverse(routes);
  return meta;
}

const router = createBrowserRouter(routes);
export default router;
