import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Switch from "@/components/Switch";
import Checkbox from "@/components/Checkbox";
import { User, Mail, Lock, Bell, Shield, Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
    const [showPassword, setShowPassword] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@company.com",
        phone: "+1 (555) 123-4567",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleSave = () => {
        console.log("Saving profile:", profile);
        // Add save logic here
    };

    return (
        <DashboardLayout userRole="user" title="Profile Settings" subtitle="Manage your account preferences">
            <div className="max-w-4xl space-y-6">
                {/* Personal Information */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Security Settings</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                                <div className="font-medium">Multi-Factor Authentication</div>
                                <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                            </div>
                            <div style={{ transform: 'scale(0.4)', transformOrigin: 'right' }}>
                                <Switch />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium">Change Password</h4>
                            <div>
                                <Label htmlFor="current-password">Current Password</Label>
                                <div className="relative mt-2">
                                    <Input
                                        id="current-password"
                                        type={showPassword ? "text" : "password"}
                                        value={profile.currentPassword}
                                        onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input
                                        id="new-password"
                                        type={showPassword ? "text" : "password"}
                                        value={profile.newPassword}
                                        onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type={showPassword ? "text" : "password"}
                                        value={profile.confirmPassword}
                                        onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <Button variant="outline">Update Password</Button>
                        </div>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Notification Preferences</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                                <div className="font-medium">Email Notifications</div>
                                <div className="text-sm text-muted-foreground">Receive security alerts via email</div>
                            </div>
                            <div style={{ transform: 'scale(0.4)', transformOrigin: 'right' }}>
                                <Switch />
                            </div>
                        </div>

                        <div className="space-y-3 mt-4">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="notify-login"
                                    checked={true}
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="notify-login" className="cursor-pointer">
                                    Notify me of new login attempts
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="notify-device"
                                    checked={true}
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="notify-device" className="cursor-pointer">
                                    Alert me when a new device is added
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="notify-password"
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="notify-password" className="cursor-pointer">
                                    Remind me to change password periodically
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="notify-security"
                                    checked={true}
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="notify-security" className="cursor-pointer">
                                    Send security tips and updates
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Privacy Settings</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                                <div className="font-medium">Activity Tracking</div>
                                <div className="text-sm text-muted-foreground">Track login history and device usage</div>
                            </div>
                            <div style={{ transform: 'scale(0.4)', transformOrigin: 'right' }}>
                                <Switch />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                                <div className="font-medium">Location Services</div>
                                <div className="text-sm text-muted-foreground">Allow location-based security features</div>
                            </div>
                            <div style={{ transform: 'scale(0.4)', transformOrigin: 'right' }}>
                                <Switch />
                            </div>
                        </div>

                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-medium">Data Export</div>
                                <Button variant="outline" size="sm">Download Data</Button>
                            </div>
                            <div className="text-sm text-muted-foreground">Download all your account data and activity history</div>
                        </div>

                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-medium text-red-400">Delete Account</div>
                                <Button variant="destructive" size="sm">Delete</Button>
                            </div>
                            <div className="text-sm text-muted-foreground">Permanently delete your account and all associated data</div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
