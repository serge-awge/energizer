import { LayoutDashboard, LineChart, FileText, Settings, Users } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'admin', label: 'Admin', icon: Users },
    { id: 'prediction', label: 'Prediction', icon: LayoutDashboard },
    { id: 'analysis', label: 'Analysis', icon: LineChart },
    { id: 'report', label: 'Report', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r-2 border-green-500">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-500">Rwanda Energy</h1>
        <p className="text-sm text-orange-500">Predictor Dashboard</p>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full px-6 py-4 flex items-center space-x-3 transition ${
                activeSection === item.id
                  ? 'bg-green-500 text-black border-l-4 border-orange-500'
                  : 'text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
        <div className="text-sm text-gray-400">
          <p>Rwanda Energy System</p>
          <p className="text-green-500">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
