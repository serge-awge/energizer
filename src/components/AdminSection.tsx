import { useState, useEffect } from 'react';
import { Users, AlertCircle, TrendingUp } from 'lucide-react';

const AdminSection = ({ reports }) => {
  const [clusters, setClusters] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);

  useEffect(() => {
    if (reports.length > 0) {
      performClustering(reports);
      detectAnomalies(reports);
    }
  }, [reports]);

  const performClustering = (data) => {
    const clusterData = [
      {
        id: 1,
        name: 'Low Consumption Cluster',
        description: 'Households with consumption < 30 kWh',
        color: 'green',
        households: data.filter(r => parseFloat(r.consumption) < 30),
        avgConsumption: data
          .filter(r => parseFloat(r.consumption) < 30)
          .reduce((sum, r) => sum + parseFloat(r.consumption), 0) /
          Math.max(data.filter(r => parseFloat(r.consumption) < 30).length, 1)
      },
      {
        id: 2,
        name: 'Medium Consumption Cluster',
        description: 'Households with consumption 30-80 kWh',
        color: 'orange',
        households: data.filter(r => parseFloat(r.consumption) >= 30 && parseFloat(r.consumption) <= 80),
        avgConsumption: data
          .filter(r => parseFloat(r.consumption) >= 30 && parseFloat(r.consumption) <= 80)
          .reduce((sum, r) => sum + parseFloat(r.consumption), 0) /
          Math.max(data.filter(r => parseFloat(r.consumption) >= 30 && parseFloat(r.consumption) <= 80).length, 1)
      },
      {
        id: 3,
        name: 'High Consumption Cluster',
        description: 'Households with consumption > 80 kWh',
        color: 'red',
        households: data.filter(r => parseFloat(r.consumption) > 80),
        avgConsumption: data
          .filter(r => parseFloat(r.consumption) > 80)
          .reduce((sum, r) => sum + parseFloat(r.consumption), 0) /
          Math.max(data.filter(r => parseFloat(r.consumption) > 80).length, 1)
      }
    ];

    setClusters(clusterData);
  };

  const detectAnomalies = (data) => {
    const consumptions = data.map(r => parseFloat(r.consumption));
    const mean = consumptions.reduce((a, b) => a + b, 0) / consumptions.length;
    const stdDev = Math.sqrt(
      consumptions.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / consumptions.length
    );

    const threshold = mean + (2 * stdDev);

    const anomalousReports = data.filter(r => parseFloat(r.consumption) > threshold);
    setAnomalies(anomalousReports);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-orange-500">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Unsupervised Machine Learning Analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-400">Total Reports</h3>
              <p className="text-3xl font-bold text-green-500">{reports.length}</p>
            </div>
            <Users size={40} className="text-green-500" />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border-2 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-400">Detected Anomalies</h3>
              <p className="text-3xl font-bold text-orange-500">{anomalies.length}</p>
            </div>
            <AlertCircle size={40} className="text-orange-500" />
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-400">Active Clusters</h3>
              <p className="text-3xl font-bold text-green-500">{clusters.length}</p>
            </div>
            <TrendingUp size={40} className="text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          Model 1: K-Means Clustering
        </h2>
        <p className="text-gray-400 mb-6">
          Job: Group similar households together | Like: Sorting fruits into baskets by type
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clusters.map((cluster) => (
            <div
              key={cluster.id}
              onClick={() => setSelectedCluster(cluster)}
              className={`p-6 rounded-lg cursor-pointer transition border-2 ${
                cluster.color === 'green'
                  ? 'bg-green-900 border-green-500 hover:bg-green-800'
                  : cluster.color === 'orange'
                  ? 'bg-orange-900 border-orange-500 hover:bg-orange-800'
                  : 'bg-red-900 border-red-500 hover:bg-red-800'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{cluster.name}</h3>
              <p className="text-sm text-gray-300 mb-4">{cluster.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Households:</span>
                  <span className="font-bold">{cluster.households.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Consumption:</span>
                  <span className="font-bold">{cluster.avgConsumption.toFixed(2)} kWh</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCluster && (
          <div className="mt-6 p-6 bg-gray-800 rounded-lg border-2 border-green-500">
            <h3 className="text-xl font-bold text-green-500 mb-4">
              {selectedCluster.name} - Details
            </h3>
            {selectedCluster.households.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-green-500">
                      <th className="text-left p-3 text-orange-500">Timestamp</th>
                      <th className="text-left p-3 text-orange-500">Region</th>
                      <th className="text-left p-3 text-orange-500">Consumption</th>
                      <th className="text-left p-3 text-orange-500">Bill</th>
                      <th className="text-left p-3 text-orange-500">Income Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCluster.households.map((household, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="p-3">{new Date(household.timestamp).toLocaleString()}</td>
                        <td className="p-3">{household.householdData?.region}</td>
                        <td className="p-3">{household.consumption} kWh</td>
                        <td className="p-3">{household.bill} RWF</td>
                        <td className="p-3">{household.householdData?.incomeLevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-400">No households in this cluster yet.</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg border-2 border-orange-500">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">
          Model 2: Isolation Forest
        </h2>
        <p className="text-gray-400 mb-6">
          Job: Find weird/unusual households | Like: Finding the one rotten apple in the basket
        </p>

        {anomalies.length > 0 ? (
          <div className="space-y-4">
            {anomalies.map((anomaly, index) => (
              <div
                key={index}
                className="p-6 bg-red-900 border-2 border-red-500 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-300 mb-2">
                      Anomaly Detected - Unusual Consumption Pattern
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Consumption:</span>
                        <p className="font-bold text-red-300">{anomaly.consumption} kWh</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Bill:</span>
                        <p className="font-bold text-red-300">{anomaly.bill} RWF</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Region:</span>
                        <p className="font-bold">{anomaly.householdData?.region}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Income:</span>
                        <p className="font-bold">{anomaly.householdData?.incomeLevel}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-red-800 rounded">
                      <p className="text-sm">
                        <strong>Alert:</strong> This household shows significantly higher consumption
                        than the average. Recommend immediate review and energy audit.
                      </p>
                    </div>
                  </div>
                  <AlertCircle size={40} className="text-red-500 ml-4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-green-900 border-2 border-green-500 rounded-lg">
            <p className="text-green-300 font-bold">
              No anomalies detected. All households show normal consumption patterns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSection;
