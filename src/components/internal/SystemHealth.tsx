const SystemHealth = () => {
  const systemMetrics = {
    uptime: '99.97%',
    responseTime: '245ms',
    errorRate: '0.03%',
    serverLoad: 67,
    databasePerformance: 89,
    cdnEfficiency: 94,
  };

  const serverStatus = [
    { name: 'Web Server 1', status: 'healthy', cpu: 45, memory: 62, uptime: '15 days' },
    { name: 'Web Server 2', status: 'healthy', cpu: 52, memory: 58, uptime: '15 days' },
    { name: 'Database Primary', status: 'healthy', cpu: 38, memory: 71, uptime: '30 days' },
    { name: 'Database Replica', status: 'healthy', cpu: 34, memory: 68, uptime: '30 days' },
    { name: 'Video Streaming CDN', status: 'healthy', cpu: 28, memory: 45, uptime: '45 days' },
    { name: 'API Gateway', status: 'warning', cpu: 78, memory: 82, uptime: '12 days' },
  ];

  const securityMetrics = [
    { metric: 'Login Attempts', value: '45,678', suspicious: 23, blocked: 15 },
    { metric: 'API Requests', value: '2.3M', suspicious: 145, blocked: 89 },
    { metric: 'File Downloads', value: '123,456', suspicious: 12, blocked: 8 },
    { metric: 'Video Streams', value: '567,890', suspicious: 34, blocked: 21 },
  ];

  const performanceAlerts = [
    {
      type: 'warning',
      message: 'API Gateway CPU usage above 75%',
      timestamp: '2 minutes ago',
      severity: 'medium',
    },
    {
      type: 'info',
      message: 'Database backup completed successfully',
      timestamp: '15 minutes ago',
      severity: 'low',
    },
    {
      type: 'error',
      message: 'Video encoding queue backed up',
      timestamp: '1 hour ago',
      severity: 'high',
    },
    {
      type: 'success',
      message: 'CDN cache optimization completed',
      timestamp: '2 hours ago',
      severity: 'low',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'critical':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return '🔴';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      case 'info':
        return 'ℹ️';
      default:
        return '⚪';
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 80) return 'bg-red-500';
    if (usage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">⏱️</div>
            <div className="text-xl font-bold text-green-600">{systemMetrics.uptime}</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-xl font-bold text-blue-600">{systemMetrics.responseTime}</div>
            <div className="text-sm text-gray-600">Response Time</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-xl font-bold text-purple-600">{systemMetrics.errorRate}</div>
            <div className="text-sm text-gray-600">Error Rate</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🖥️</div>
            <div className="text-xl font-bold text-orange-600">{systemMetrics.serverLoad}%</div>
            <div className="text-sm text-gray-600">Server Load</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">💾</div>
            <div className="text-xl font-bold text-indigo-600">
              {systemMetrics.databasePerformance}%
            </div>
            <div className="text-sm text-gray-600">DB Performance</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🌐</div>
            <div className="text-xl font-bold text-red-600">{systemMetrics.cdnEfficiency}%</div>
            <div className="text-sm text-gray-600">CDN Efficiency</div>
          </div>
        </div>
      </div>

      {/* Server Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Server Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Server</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">CPU Usage</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Memory Usage</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Uptime</th>
              </tr>
            </thead>
            <tbody>
              {serverStatus.map((server) => (
                <tr key={server.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="text-xl mr-3">{getStatusIcon(server.status)}</div>
                      <div className="font-medium text-gray-900">{server.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        server.status,
                      )}`}
                    >
                      {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                          style={{ width: `${server.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{server.cpu}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                          style={{ width: `${server.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{server.memory}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{server.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Metrics */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Metrics</h3>
          <div className="space-y-4">
            {securityMetrics.map((metric) => (
              <div key={metric.metric} className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">{metric.metric}</div>
                  <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-600">Suspicious: {metric.suspicious}</span>
                  <span className="text-red-600">Blocked: {metric.blocked}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Alerts */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {performanceAlerts.map((alert, index) => (
              <div key={index} className={`p-4 border rounded-md ${getAlertColor(alert.type)}`}>
                <div className="flex items-start">
                  <div className="text-xl mr-3">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{alert.message}</div>
                    <div className="text-sm text-gray-600 mt-1">{alert.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="text-2xl mr-3">🔧</div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">System Health Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div>
                <p>• All critical systems operational</p>
                <p>• Database performance within normal range</p>
                <p>• CDN delivering optimal speeds globally</p>
              </div>
              <div>
                <p>• API Gateway requires attention (high CPU)</p>
                <p>• Video encoding queue experiencing delays</p>
                <p>• Security metrics showing normal activity</p>
              </div>
              <div>
                <p>• Uptime exceeding 99.9% SLA target</p>
                <p>• Response times 18% faster than last month</p>
                <p>• Error rates at all-time low</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
