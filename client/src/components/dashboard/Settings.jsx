import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Shield, 
  Trash2, 
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    bio: 'Full-stack developer passionate about AI and automation.'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    webhookAlerts: true,
    usageAlerts: false,
    securityAlerts: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'advanced', label: 'Advanced', icon: Shield }
  ];

  const handleProfileSave = () => {
    // Save profile data
    console.log('Profile saved:', profileData);
  };

  const handlePasswordChange = () => {
    // Handle password change
    console.log('Password changed');
  };

  const handleNotificationSave = () => {
    // Save notification settings
    console.log('Notifications saved:', notificationSettings);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent resize-none"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleProfileSave}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#3b82f6]"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#3b82f6]"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[#1f2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9ca3af] hover:text-[#3b82f6]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handlePasswordChange}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Update Password
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-[#9ca3af]">Receive updates via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                    className="w-4 h-4 text-[#3b82f6] bg-[rgba(255,255,255,0.05)] border-[#1f2937] rounded focus:ring-[#3b82f6] focus:ring-2"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
                  <div>
                    <h4 className="font-medium">Webhook Alerts</h4>
                    <p className="text-sm text-[#9ca3af]">Get notified of webhook events</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.webhookAlerts}
                    onChange={(e) => setNotificationSettings({...notificationSettings, webhookAlerts: e.target.checked})}
                    className="w-4 h-4 text-[#3b82f6] bg-[rgba(255,255,255,0.05)] border-[#1f2937] rounded focus:ring-[#3b82f6] focus:ring-2"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
                  <div>
                    <h4 className="font-medium">Usage Alerts</h4>
                    <p className="text-sm text-[#9ca3af]">Alert when approaching limits</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.usageAlerts}
                    onChange={(e) => setNotificationSettings({...notificationSettings, usageAlerts: e.target.checked})}
                    className="w-4 h-4 text-[#3b82f6] bg-[rgba(255,255,255,0.05)] border-[#1f2937] rounded focus:ring-[#3b82f6] focus:ring-2"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.05)] rounded-lg">
                  <div>
                    <h4 className="font-medium">Security Alerts</h4>
                    <p className="text-sm text-[#9ca3af]">Important security notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.securityAlerts}
                    onChange={(e) => setNotificationSettings({...notificationSettings, securityAlerts: e.target.checked})}
                    className="w-4 h-4 text-[#3b82f6] bg-[rgba(255,255,255,0.05)] border-[#1f2937] rounded focus:ring-[#3b82f6] focus:ring-2"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleNotificationSave}
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
              <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-6">
                <div className="text-center">
                  <CreditCard className="w-12 h-12 text-[#3b82f6] mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Current Plan: Pro</h4>
                  <p className="text-[#9ca3af] mb-4">$29/month • Next billing: Feb 15, 2024</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium">API Calls</p>
                      <p className="text-[#9ca3af]">50,000/month</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Storage</p>
                      <p className="text-[#9ca3af]">10GB</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Support</p>
                      <p className="text-[#9ca3af]">Priority</p>
                    </div>
                  </div>
                  <button className="mt-6 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div className="bg-[rgba(255,255,255,0.05)] rounded-lg p-4">
                  <h4 className="font-medium mb-2">Export Data</h4>
                  <p className="text-sm text-[#9ca3af] mb-4">Download all your data in JSON format</p>
                  <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200">
                    Export Data
                  </button>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-red-400">Danger Zone</h4>
                  <p className="text-sm text-[#9ca3af] mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Settings</h2>
        <p className="text-[#9ca3af]">Manage your account settings and preferences</p>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#3b82f6] text-white'
                        : 'text-[#9ca3af] hover:text-[#e5e5e5] hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-xl border border-[#1f2937] p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;