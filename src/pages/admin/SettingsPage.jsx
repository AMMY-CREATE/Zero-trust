import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Switch from "@/components/Switch";
import Checkbox from "@/components/Checkbox";
import { Building, Shield, Bell, Key, Database, Zap } from "lucide-react";

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        companyName: "ZTADS Corporation",
        adminEmail: "admin@ztads.com",
        mfaEnabled: true,
        passwordExpiry: 90,
        sessionTimeout: 30,
        emailNotifications: true,
        slackIntegration: false,
        autoBackup: true,
        backupFrequency: "daily",
    });

    const handleSave = () => {
        console.log("Saving settings:", settings);
        // Add save logic here
    };

    return (
        <DashboardLayout userRole="admin" title="System Settings" subtitle="Configure system preferences and integrations">
            <div className="max-w-4xl space-y-6">
                {/* General Settings */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Building className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">General Settings</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="company-name">Company Name</Label>
                                <Input
                                    id="company-name"
                                    value={settings.companyName}
                                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="admin-email">Admin Email</Label>
                                <Input
                                    id="admin-email"
                                    type="email"
                                    value={settings.adminEmail}
                                    onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Security Settings</h3>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                                <div className="font-medium">Multi-Factor Authentication</div>
                                <div className="text-sm text-muted-foreground">Require MFA for all users</div>
                            </div>
                            <div style={{ transform: 'scale(0.4)', transformOrigin: 'right' }}>
                                <Switch />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                                <Input
                                    id="password-expiry"
                                    type="number"
                                    value={settings.passwordExpiry}
                                    onChange={(e) => setSettings({ ...settings, passwordExpiry: parseInt(e.target.value) })}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                                <Input
                                    id="session-timeout"
                                    type="number"
                                    value={settings.sessionTimeout}
                                    onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="require-strong-passwords"
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="require-strong-passwords" className="cursor-pointer">
                                    Require strong passwords (min 12 characters, special chars)
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="ip-whitelist"
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="ip-whitelist" className="cursor-pointer">
                                    Enable IP whitelist for admin access
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="audit-all-actions"
                                    checked={true}
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="audit-all-actions" className="cursor-pointer">
                                    Audit all user actions
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Notifications</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                                <div className="font-medium">Email Notifications</div>
                                <div className="text-sm text-muted-foreground">Send alerts via email</div>
                            </div>
                            <div style={{ transform: 'scale(0.4)', transformOrigin: 'right' }}>
                                <Switch />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                                <div className="font-medium">Slack Integration</div>
                                <div className="text-sm text-muted-foreground">Post alerts to Slack channel</div>
                            </div>
                            <div style={{ transform: 'scale(0.4)', transformOrigin: 'right' }}>
                                <Switch />
                            </div>
                        </div>

                        <div className="space-y-3 mt-4">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="notify-critical"
                                    checked={true}
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="notify-critical" className="cursor-pointer">
                                    Critical alerts
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="notify-high"
                                    checked={true}
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="notify-high" className="cursor-pointer">
                                    High severity alerts
                                </Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="notify-medium"
                                    scale={0.3}
                                    showExtras={false}
                                />
                                <Label htmlFor="notify-medium" className="cursor-pointer">
                                    Medium severity alerts
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integration Settings */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Integrations</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-medium">SIEM Integration</div>
                                <Button variant="outline" size="sm">Configure</Button>
                            </div>
                            <div className="text-sm text-muted-foreground">Connect to Splunk, QRadar, or other SIEM platforms</div>
                        </div>

                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-medium">SSO / SAML</div>
                                <Button variant="outline" size="sm">Setup</Button>
                            </div>
                            <div className="text-sm text-muted-foreground">Enable single sign-on with Azure AD, Okta, or Google</div>
                        </div>

                        <div className="p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-medium">API Keys</div>
                                <Button variant="outline" size="sm">Manage</Button>
                            </div>
                            <div className="text-sm text-muted-foreground">Generate and manage API keys for external integrations</div>
                        </div>
                    </div>
                </div>

                {/* Backup Settings */}
                <div className="bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Database className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Backup & Recovery</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div>
                                <div className="font-medium">Automatic Backups</div>
                                <div className="text-sm text-muted-foreground">Enable scheduled backups</div>
                            </div>
                            <div style={{ transform: 'scale(0.4)', transformOrigin: 'right' }}>
                                <Switch />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="backup-frequency">Backup Frequency</Label>
                            <select
                                id="backup-frequency"
                                value={settings.backupFrequency}
                                onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                                className="w-full mt-2 px-3 py-2 bg-background border border-border rounded-md"
                            >
                                <option value="hourly">Hourly</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1">Backup Now</Button>
                            <Button variant="outline" className="flex-1">Restore</Button>
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
