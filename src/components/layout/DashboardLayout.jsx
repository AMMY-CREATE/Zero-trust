import { DashboardSidebar } from "./DashboardSidebar";
import { Bell, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function DashboardLayout({ children, userRole, title, subtitle }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <DashboardSidebar userRole={userRole} />


            <div className="pl-64">

                <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
                    <div className="h-full px-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(-1)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div>
                                <h1 className="text-lg font-semibold">{title}</h1>
                                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-9 w-64 bg-background"
                                />
                            </div>

                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-danger text-danger-foreground text-xs rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </Button>
                        </div>
                    </div>
                </header>


                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
