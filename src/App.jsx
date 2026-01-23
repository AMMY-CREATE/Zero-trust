import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScanningLoader from "./components/ScanningLoader";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const InformationPage = lazy(() => import("./pages/InformationPage"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const ArchitecturePage = lazy(() => import("./pages/ArchitecturePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AnomalyDetectionPage = lazy(() => import("./pages/admin/AnomalyDetectionPage"));
const UserManagementPage = lazy(() => import("./pages/admin/UserManagementPage"));
const AuditLogsPage = lazy(() => import("./pages/admin/AuditLogsPage"));
const SettingsPage = lazy(() => import("./pages/admin/SettingsPage"));
const ThreatIntelligencePage = lazy(() => import("./pages/admin/ThreatIntelligencePage"));
const PoliciesPage = lazy(() => import("./pages/admin/PoliciesPage"));
const IncidentResponsePage = lazy(() => import("./pages/admin/IncidentResponsePage"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const LoginHistoryPage = lazy(() => import("./pages/user/LoginHistoryPage"));
const DevicesPage = lazy(() => import("./pages/user/DevicesPage"));
const NotificationsPage = lazy(() => import("./pages/user/NotificationsPage"));
const ProfilePage = lazy(() => import("./pages/user/ProfilePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Suspense fallback={<ScanningLoader />}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/information" element={<InformationPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/architecture" element={<ArchitecturePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/anomalies" element={<AnomalyDetectionPage />} />
                        <Route path="/admin/users" element={<UserManagementPage />} />
                        <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
                        <Route path="/admin/settings" element={<SettingsPage />} />
                        <Route path="/admin/threats" element={<ThreatIntelligencePage />} />
                        <Route path="/admin/policies" element={<PoliciesPage />} />
                        <Route path="/admin/incidents" element={<IncidentResponsePage />} />
                        <Route path="/dashboard" element={<UserDashboard />} />
                        <Route path="/dashboard/history" element={<LoginHistoryPage />} />
                        <Route path="/dashboard/devices" element={<DevicesPage />} />
                        <Route path="/dashboard/notifications" element={<NotificationsPage />} />
                        <Route path="/dashboard/profile" element={<ProfilePage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
