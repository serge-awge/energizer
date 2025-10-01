import { Settings, Zap, DollarSign, Globe, Bell } from 'lucide-react';
import { useState } from 'react';

const SettingsSection = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    darkMode: true,
    currency: 'RWF',
    language: 'English',
    tariffRate1: 103,
    tariffRate2: 141,
    tariffRate3: 171,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-orange-500">Settings</h1>
        <p className="text-gray-400 mt-2">Configure your dashboard preferences</p>
      </div>

      {saved && (
        <div className="bg-green-500 text-black p-4 rounded-lg font-bold text-center">
          Settings saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
          <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center space-x-2">
            <Settings size={24} />
            <span>General Settings</span>
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded">
              <div>
                <p className="font-bold">Enable Notifications</p>
                <p className="text-sm text-gray-400">Receive alerts for high consumption</p>
              </div>
              <button
                onClick={() => setSettings({...settings, notifications: !settings.notifications})}
                className={`w-12 h-6 rounded-full transition ${
                  settings.notifications ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-800 rounded">
              <div>
                <p className="font-bold">Auto-Save Reports</p>
                <p className="text-sm text-gray-400">Automatically save generated reports</p>
              </div>
              <button
                onClick={() => setSettings({...settings, autoSave: !settings.autoSave})}
                className={`w-12 h-6 rounded-full transition ${
                  settings.autoSave ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-800 rounded">
              <div>
                <p className="font-bold">Dark Mode</p>
                <p className="text-sm text-gray-400">Use dark theme</p>
              </div>
              <button
                onClick={() => setSettings({...settings, darkMode: !settings.darkMode})}
                className={`w-12 h-6 rounded-full transition ${
                  settings.darkMode ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border-2 border-orange-500">
          <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center space-x-2">
            <Globe size={24} />
            <span>Regional Settings</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-white">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border-2 border-orange-500 rounded text-white"
              >
                <option>RWF</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-white">Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border-2 border-orange-500 rounded text-white"
              >
                <option>English</option>
                <option>Kinyarwanda</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500 lg:col-span-2">
          <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center space-x-2">
            <DollarSign size={24} />
            <span>Tariff Rate Configuration</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2 text-white">
                Tier 1 (0-20 kWh) - RWF per kWh
              </label>
              <input
                type="number"
                value={settings.tariffRate1}
                onChange={(e) => setSettings({...settings, tariffRate1: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-800 border-2 border-green-500 rounded text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Current: {settings.tariffRate1} RWF/kWh</p>
            </div>

            <div>
              <label className="block text-sm mb-2 text-white">
                Tier 2 (21-50 kWh) - RWF per kWh
              </label>
              <input
                type="number"
                value={settings.tariffRate2}
                onChange={(e) => setSettings({...settings, tariffRate2: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-800 border-2 border-orange-500 rounded text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Current: {settings.tariffRate2} RWF/kWh</p>
            </div>

            <div>
              <label className="block text-sm mb-2 text-white">
                Tier 3 (50+ kWh) - RWF per kWh
              </label>
              <input
                type="number"
                value={settings.tariffRate3}
                onChange={(e) => setSettings({...settings, tariffRate3: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-800 border-2 border-green-500 rounded text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Current: {settings.tariffRate3} RWF/kWh</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-800 rounded">
            <p className="text-sm text-gray-400">
              <strong className="text-orange-500">Note:</strong> These tariff rates are used for
              calculating estimated bills in the prediction section. Adjust according to the current
              Rwanda energy authority rates.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border-2 border-orange-500 lg:col-span-2">
          <h2 className="text-xl font-bold text-orange-500 mb-4 flex items-center space-x-2">
            <Bell size={24} />
            <span>Alert Thresholds</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-white">
                High Consumption Alert (kWh)
              </label>
              <input
                type="number"
                placeholder="100"
                className="w-full px-4 py-3 bg-gray-800 border-2 border-orange-500 rounded text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Alert when consumption exceeds this value</p>
            </div>

            <div>
              <label className="block text-sm mb-2 text-white">
                Budget Overage Alert (%)
              </label>
              <input
                type="number"
                placeholder="90"
                className="w-full px-4 py-3 bg-gray-800 border-2 border-orange-500 rounded text-white"
              />
              <p className="text-xs text-gray-400 mt-1">Alert when bill reaches this % of budget</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-3 rounded transition">
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 rounded transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsSection;
