import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Menu from "./components/layout/Menu";
import Sidebar from "./components/layout/Sidebar";
import { useSidebar } from "./components/ui/sidebar";
import { cn } from "./lib/utils";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/pages/auth/ProtectedRoute";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Assets = lazy(() => import("@/pages/Assets"));
const Borrow = lazy(() => import("@/pages/Borrow"));
const Issuance = lazy(() => import("@/pages/Issuance"));
const Repair = lazy(() => import("@/pages/Repair"));
const Settings = lazy(() => import("@/pages/Settings"));
const Login = lazy(() => import("@/pages/Login"));

const CategoriesPage = lazy(() => import("@/components/pages/settings/categories/CategoriesPage"));
const AssetConfigPage = lazy(() => import("@/components/pages/settings/AssetConfigPage"));
const RecycleBinPage = lazy(() => import("@/components/pages/settings/RecycleBinPage"));
const InsurancePage = lazy(() => import("@/components/pages/settings/InsurancePage"));
const ActivityLogs = lazy(() => import("@/components/pages/settings/ActivityLogs"));
const AssetBatchUploadPage = lazy(() => import("@/components/pages/assets/AssetBatchUploadPage"));

function AdminLayout() {
  return (
    <Sidebar>
      <AdminLayoutInner />
    </Sidebar>
  );
}

function AdminLayoutInner() {
  const { state, isMobile } = useSidebar();

  return (
    <div className="p-4 pl-0 bg-zinc-100 h-screen">
      <Menu />
      <div className="bg-white rounded-md h-full flex-col overflow-y-auto">
        <Header />
        <div
          className={cn(
            "p-2 px-0 min-h-0 flex-1",
            !isMobile
              ? state === "collapsed"
                ? "max-w-[calc(100vw-3rem)]"
                : "max-w-[calc(100vw-14rem)]"
              : ""
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <Routes>

          <Route path="login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="masterlist" element={<Assets />} />
              <Route path="masterlist/batch" element={<AssetBatchUploadPage />} />
              <Route path="borrow" element={<Borrow />} />
              <Route path="issuance" element={<Issuance />} />
              <Route path="repair" element={<Repair />} />
              <Route path="settings" element={<Settings />}>
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="config" element={<AssetConfigPage />} />
                <Route path="insurance" element={<InsurancePage />} />
                <Route path="recycle_bin" element={<RecycleBinPage />} />
                <Route path="activity_logs" element={<ActivityLogs />} />
              </Route>
            </Route>
          </Route>

        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;