import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/layout";
import Login from "@/pages/login";
import AuthRoute from "@/components/AuthRoute";
import ClassificationManagement from "@/pages/classificationManagement";
import FoodManagement from "@/pages/foodManagement";
import StaffManagement from "@/pages/staffManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      { path: "/foodmanagement", element: <FoodManagement /> },
      {
        path: "/classificationmanagement",
        element: <ClassificationManagement />,
      },
      { path: "/staffmanagement", element: <StaffManagement /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
export default router;
