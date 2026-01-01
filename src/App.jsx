import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import FeaturesPage from "./pages/FeaturesPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AnomalyDetectionPage from "./pages/admin/AnomalyDetectionPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import AuditLogsPage from "./pages/admin/AuditLogsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import ThreatIntelligencePage from "./pages/admin/ThreatIntelligencePage";
import PoliciesPage from "./pages/admin/PoliciesPage";
import IncidentResponsePage from "./pages/admin/IncidentResponsePage";
import UserDashboard from "./pages/user/UserDashboard";
import LoginHistoryPage from "./pages/user/LoginHistoryPage";
import DevicesPage from "./pages/user/DevicesPage";
import NotificationsPage from "./pages/user/NotificationsPage";
import ProfilePage from "./pages/user/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
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
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
