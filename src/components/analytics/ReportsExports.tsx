import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Badge, Button } from 'flowbite-react';

interface ReportTemplate {
  id: number;
  name: string;
  description: string;
  type: 'CSV' | 'PDF' | 'Excel';
  category: string;
  lastGenerated: string;
  frequency: 'Manual' | 'Daily' | 'Weekly' | 'Monthly';
  recipients: number;
}

const ReportsExports = () => {
  const [selectedReports, setSelectedReports] = useState<number[]>([]);

  // Sample report templates
  const reportTemplates: ReportTemplate[] = [
    {
      id: 1,
      name: 'Student Performance Summary',
      description: 'Complete overview of student engagement and performance metrics',
      type: 'PDF',
      category: 'Performance',
      lastGenerated: '2024-01-08',
      frequency: 'Weekly',
      recipients: 5,
    },
    {
      id: 2,
      name: 'Login Analytics Export',
      description: 'Detailed login patterns and user activity data',
      type: 'CSV',
      category: 'Analytics',
      lastGenerated: '2024-01-07',
      frequency: 'Daily',
      recipients: 3,
    },
    {
      id: 3,
      name: 'Content Usage Report',
      description: 'Video views, QBank attempts, and content engagement metrics',
      type: 'Excel',
      category: 'Content',
      lastGenerated: '2024-01-06',
      frequency: 'Monthly',
      recipients: 8,
    },
    {
      id: 4,
      name: 'Red Zone Students Alert',
      description: 'Students requiring immediate attention and intervention',
      type: 'PDF',
      category: 'Alerts',
      lastGenerated: '2024-01-08',
      frequency: 'Weekly',
      recipients: 12,
    },
    {
      id: 5,
      name: 'Competency Analysis',
      description: 'Subject-wise competency scores and improvement trends',
      type: 'PDF',
      category: 'Academic',
      lastGenerated: '2024-01-05',
      frequency: 'Monthly',
      recipients: 6,
    },
    {
      id: 6,
      name: 'Individual Student Reports',
      description: "Personalized reports for each student's performance",
      type: 'PDF',
      category: 'Individual',
      lastGenerated: '2024-01-07',
      frequency: 'Manual',
      recipients: 248,
    },
  ];

  const quickExportOptions = [
    {
      title: 'Student Data Export',
      description: 'Export complete student database',
      icon: 'solar:users-group-two-rounded-bold',
      format: 'CSV',
      color: 'blue',
    },
    {
      title: 'Performance Metrics',
      description: 'Export all performance data',
      icon: 'solar:graph-up-bold',
      format: 'Excel',
      color: 'green',
    },
    {
      title: 'Content Analytics',
      description: 'Export content usage statistics',
      icon: 'solar:chart-2-bold',
      format: 'PDF',
      color: 'purple',
    },
    {
      title: 'Custom Report',
      description: 'Create and export custom report',
      icon: 'solar:document-add-bold',
      format: 'PDF',
      color: 'orange',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 text-red-800';
      case 'CSV':
        return 'bg-green-100 text-green-800';
      case 'Excel':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'Daily':
        return 'bg-green-100 text-green-800';
      case 'Weekly':
        return 'bg-blue-100 text-blue-800';
      case 'Monthly':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReportSelection = (reportId: number) => {
    setSelectedReports((prev) =>
      prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId],
    );
  };

  const handleGenerateReports = () => {
    // Simulate report generation
    alert(`Generating ${selectedReports.length} report(s)...`);
    setSelectedReports([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Reports & Exports</h2>
          <p className="text-sm text-gray-600 mt-1">Generate and schedule comprehensive reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="solar:document-text-bold" className="text-indigo-500" width={20} />
          <span className="text-sm text-indigo-600 font-medium">Report Management</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Export Options */}
        <div className="xl:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Export</h3>

          <div className="space-y-3">
            {quickExportOptions.map((option, index) => (
              <button
                key={index}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md bg-${option.color}-100 text-${option.color}-600`}>
                    <Icon icon={option.icon} width={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{option.title}</div>
                    <div className="text-xs text-gray-600">{option.description}</div>
                  </div>
                  <Badge color="info" size="sm">
                    {option.format}
                  </Badge>
                </div>
              </button>
            ))}
          </div>

          {/* Schedule Reports */}
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="solar:calendar-bold" className="text-blue-600" width={20} />
              <span className="font-semibold text-blue-900">Schedule Reports</span>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              Set up automated report generation and email delivery
            </p>
            <button
              onClick={() => alert('Schedule configuration coming soon!')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Icon icon="solar:settings-bold" className="inline mr-2" width={16} />
              Configure Scheduling
            </button>
          </div>
        </div>

        {/* Report Templates */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
            <div className="flex gap-2">
              {selectedReports.length > 0 && (
                <Button size="sm" color="blue" onClick={handleGenerateReports}>
                  <Icon icon="solar:download-minimalistic-bold" className="mr-2" width={16} />
                  Generate Selected ({selectedReports.length})
                </Button>
              )}
              <Button size="sm" color="gray">
                <Icon icon="solar:add-circle-bold" className="mr-2" width={16} />
                New Template
              </Button>
            </div>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {reportTemplates.map((report) => (
              <div
                key={report.id}
                className={`p-4 border rounded-md transition-all duration-200 cursor-pointer ${
                  selectedReports.includes(report.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleReportSelection(report.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report.id)}
                      onChange={() => handleReportSelection(report.id)}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{report.description}</div>

                      <div className="flex items-center gap-2 mt-3">
                        <Badge color="info" size="sm" className={getTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                        <Badge
                          color="gray"
                          size="sm"
                          className={getFrequencyColor(report.frequency)}
                        >
                          {report.frequency}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {report.recipients} recipient{report.recipients !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-500">Last generated</div>
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(report.lastGenerated).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Action buttons for individual reports */}
                <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                    <Icon icon="solar:play-bold" className="inline mr-1" width={12} />
                    Generate Now
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                    <Icon icon="solar:settings-linear" className="inline mr-1" width={12} />
                    Configure
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded hover:bg-green-100 transition-colors">
                    <Icon icon="solar:eye-bold" className="inline mr-1" width={12} />
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-600">Reports Generated</div>
            <div className="text-xs text-gray-500">This month</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-gray-600">Delivery Success</div>
            <div className="text-xs text-gray-500">Last 30 days</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">24</div>
            <div className="text-sm text-gray-600">Scheduled Reports</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">2.4GB</div>
            <div className="text-sm text-gray-600">Storage Used</div>
            <div className="text-xs text-gray-500">Archive</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium">
          <Icon icon="solar:archive-bold" className="inline mr-2" width={16} />
          View Report Archive
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
          <Icon icon="solar:settings-bold" className="inline mr-2" width={16} />
          Manage Recipients
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">
          <Icon icon="solar:question-circle-bold" className="inline mr-2" width={16} />
          Help & Documentation
        </button>
      </div>
    </div>
  );
};

export default ReportsExports;
