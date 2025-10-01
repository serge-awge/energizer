import { useState } from 'react';
import { Plus, Trash2, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PredictionSection = ({ onGenerateReport }) => {
  const [appliances, setAppliances] = useState([]);
  const [currentAppliance, setCurrentAppliance] = useState({
    name: '',
    power: '',
    hours: '',
    quantity: 1,
    usageDays: 30
  });
  const [householdData, setHouseholdData] = useState({
    region: 'Kigali',
    incomeLevel: 'Medium',
    householdSize: 4,
    monthlyBudget: 50000
  });
  const [predictions, setPredictions] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const addAppliance = () => {
    if (currentAppliance.name && currentAppliance.power && currentAppliance.hours) {
      setAppliances([...appliances, { ...currentAppliance, id: Date.now() }]);
      setCurrentAppliance({
        name: '',
        power: '',
        hours: '',
        quantity: 1,
        usageDays: 30
      });
    }
  };

  const removeAppliance = (id) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const calculatePredictions = () => {
    const totalConsumption = appliances.reduce((total, app) => {
      const dailyKwh = (app.power * app.hours * app.quantity) / 1000;
      const monthlyKwh = dailyKwh * app.usageDays;
      return total + monthlyKwh;
    }, 0);

    let tariffBracket = '0-20 kWh';
    let ratePerKwh = 103;

    if (totalConsumption > 50) {
      tariffBracket = '50+ kWh';
      ratePerKwh = 171;
    } else if (totalConsumption > 20) {
      tariffBracket = '21-50 kWh';
      ratePerKwh = 141;
    }

    const estimatedBill = totalConsumption * ratePerKwh;

    const predictionData = {
      consumption: totalConsumption.toFixed(2),
      bill: estimatedBill.toFixed(2),
      tariffBracket,
      appliances: appliances.map(app => ({
        name: app.name,
        consumption: ((app.power * app.hours * app.quantity * app.usageDays) / 1000).toFixed(2)
      })),
      householdData,
      timestamp: new Date().toISOString()
    };

    setPredictions(predictionData);
    onGenerateReport(predictionData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getRecommendations = () => {
    if (!predictions) return [];

    const recommendations = [];
    const consumption = parseFloat(predictions.consumption);

    if (consumption > 100) {
      recommendations.push({
        text: 'High consumption detected! Consider reducing AC usage by 2 hours daily to save ~15 kWh',
        type: 'warning'
      });
    }

    recommendations.push({
      text: 'Switch to LED bulbs to reduce lighting costs by up to 75%',
      type: 'success'
    });

    if (parseFloat(predictions.bill) > householdData.monthlyBudget) {
      recommendations.push({
        text: 'Budget exceeded! Reduce high-power appliance usage during peak hours',
        type: 'warning'
      });
    }

    return recommendations;
  };

  const chartData = predictions?.appliances || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-orange-500">Energy Consumption Prediction</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
          <h2 className="text-xl font-bold text-green-500 mb-4">Household Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 text-white">Region</label>
              <select
                value={householdData.region}
                onChange={(e) => setHouseholdData({...householdData, region: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded text-white"
              >
                <option>Kigali</option>
                <option>Eastern</option>
                <option>Western</option>
                <option>Northern</option>
                <option>Southern</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-white">Income Level</label>
              <select
                value={householdData.incomeLevel}
                onChange={(e) => setHouseholdData({...householdData, incomeLevel: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded text-white"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-white">Household Size</label>
              <input
                type="number"
                value={householdData.householdSize}
                onChange={(e) => setHouseholdData({...householdData, householdSize: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-white">Monthly Budget (RWF)</label>
              <input
                type="number"
                value={householdData.monthlyBudget}
                onChange={(e) => setHouseholdData({...householdData, monthlyBudget: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
          <h2 className="text-xl font-bold text-green-500 mb-4">Add Appliance</h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Appliance Name"
              value={currentAppliance.name}
              onChange={(e) => setCurrentAppliance({...currentAppliance, name: e.target.value})}
              className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded text-white"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Power (Watts)"
                value={currentAppliance.power}
                onChange={(e) => setCurrentAppliance({...currentAppliance, power: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded text-white"
              />
              <input
                type="number"
                placeholder="Hours/Day"
                value={currentAppliance.hours}
                onChange={(e) => setCurrentAppliance({...currentAppliance, hours: e.target.value})}
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Quantity"
                value={currentAppliance.quantity}
                onChange={(e) => setCurrentAppliance({...currentAppliance, quantity: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded text-white"
              />
              <input
                type="number"
                placeholder="Usage Days/Month"
                value={currentAppliance.usageDays}
                onChange={(e) => setCurrentAppliance({...currentAppliance, usageDays: parseInt(e.target.value)})}
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded text-white"
              />
            </div>

            <button
              onClick={addAppliance}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded flex items-center justify-center space-x-2 transition"
            >
              <Plus size={20} />
              <span>Add Appliance</span>
            </button>
          </div>
        </div>
      </div>

      {appliances.length > 0 && (
        <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
          <h2 className="text-xl font-bold text-green-500 mb-4">Appliances List</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-500">
                  <th className="text-left p-3 text-orange-500">Name</th>
                  <th className="text-left p-3 text-orange-500">Power (W)</th>
                  <th className="text-left p-3 text-orange-500">Hours/Day</th>
                  <th className="text-left p-3 text-orange-500">Quantity</th>
                  <th className="text-left p-3 text-orange-500">Days/Month</th>
                  <th className="text-left p-3 text-orange-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {appliances.map((app) => (
                  <tr key={app.id} className="border-b border-gray-800">
                    <td className="p-3">{app.name}</td>
                    <td className="p-3">{app.power}</td>
                    <td className="p-3">{app.hours}</td>
                    <td className="p-3">{app.quantity}</td>
                    <td className="p-3">{app.usageDays}</td>
                    <td className="p-3">
                      <button
                        onClick={() => removeAppliance(app.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={calculatePredictions}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-6 rounded flex items-center space-x-2 transition"
          >
            <Zap size={20} />
            <span>Generate Prediction</span>
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="bg-green-500 text-black p-4 rounded-lg font-bold text-center">
          Prediction Generated Successfully! Report saved to Reports section.
        </div>
      )}

      {predictions && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
              <h3 className="text-sm text-gray-400 mb-2">Monthly Consumption</h3>
              <p className="text-3xl font-bold text-green-500">{predictions.consumption} kWh</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border-2 border-orange-500">
              <h3 className="text-sm text-gray-400 mb-2">Estimated Bill</h3>
              <p className="text-3xl font-bold text-orange-500">{predictions.bill} RWF</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
              <h3 className="text-sm text-gray-400 mb-2">Tariff Bracket</h3>
              <p className="text-3xl font-bold text-white">{predictions.tariffBracket}</p>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
            <h2 className="text-xl font-bold text-green-500 mb-4">Budget Analysis</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Estimated Bill: {predictions.bill} RWF</span>
                <span>Budget: {householdData.monthlyBudget} RWF</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full ${
                    parseFloat(predictions.bill) > householdData.monthlyBudget
                      ? 'bg-red-500'
                      : 'bg-green-500'
                  }`}
                  style={{
                    width: `${Math.min(
                      (parseFloat(predictions.bill) / householdData.monthlyBudget) * 100,
                      100
                    )}%`
                  }}
                />
              </div>
            </div>
            {parseFloat(predictions.bill) > householdData.monthlyBudget ? (
              <div className="bg-red-500 text-black p-4 rounded font-bold">
                Warning: Your estimated bill exceeds your budget by{' '}
                {(parseFloat(predictions.bill) - householdData.monthlyBudget).toFixed(2)} RWF
              </div>
            ) : (
              <div className="bg-green-500 text-black p-4 rounded font-bold">
                Great! Your estimated bill is within budget. You can save{' '}
                {(householdData.monthlyBudget - parseFloat(predictions.bill)).toFixed(2)} RWF
              </div>
            )}
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
            <h2 className="text-xl font-bold text-green-500 mb-4">Energy Consumption by Appliance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#00FF7F" />
                <YAxis stroke="#00FF7F" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #00FF7F' }}
                />
                <Bar dataKey="consumption" fill="#00FF7F" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
            <h2 className="text-xl font-bold text-green-500 mb-4">Smart Recommendations</h2>
            <div className="space-y-3">
              {getRecommendations().map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded ${
                    rec.type === 'warning'
                      ? 'bg-orange-500 text-black'
                      : 'bg-green-500 text-black'
                  } font-medium`}
                >
                  {rec.text}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PredictionSection;
