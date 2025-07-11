import { useState, useMemo } from 'react';
import { Badge, Dropdown, Select, TextInput } from 'flowbite-react';
import { HiOutlineDotsVertical, HiSearch } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import { Table } from 'flowbite-react';

interface TestSeriesData {
  sNo: number;
  seriesId: string;
  seriesName: string;
  totalTests: number;
  totalStudents: number;
  avgScore: string;
  completionRate: string;
  subject: string;
  duration: string;
  status: string;
}

const TestSeriesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TestSeriesData;
    direction: 'asc' | 'desc';
  } | null>(null);

  const testSeriesData: TestSeriesData[] = [
    {
      sNo: 1,
      seriesId: 'TS001',
      seriesName: 'NEET Foundation Series',
      totalTests: 25,
      totalStudents: 1250,
      avgScore: '78.5%',
      completionRate: '85.2%',
      subject: 'Biology',
      duration: '3 months',
      status: 'Active',
    },
    {
      sNo: 2,
      seriesId: 'TS002',
      seriesName: 'JEE Advanced Physics',
      totalTests: 30,
      totalStudents: 890,
      avgScore: '65.3%',
      completionRate: '79.1%',
      subject: 'Physics',
      duration: '4 months',
      status: 'Active',
    },
    {
      sNo: 3,
      seriesId: 'TS003',
      seriesName: 'Medical Entrance Chemistry',
      totalTests: 20,
      totalStudents: 1100,
      avgScore: '72.8%',
      completionRate: '88.5%',
      subject: 'Chemistry',
      duration: '2 months',
      status: 'Completed',
    },
    {
      sNo: 4,
      seriesId: 'TS004',
      seriesName: 'AIIMS Preparation Series',
      totalTests: 35,
      totalStudents: 750,
      avgScore: '69.2%',
      completionRate: '76.8%',
      subject: 'General',
      duration: '6 months',
      status: 'Active',
    },
    {
      sNo: 5,
      seriesId: 'TS005',
      seriesName: 'CBSE Board Preparation',
      totalTests: 15,
      totalStudents: 2100,
      avgScore: '82.1%',
      completionRate: '92.3%',
      subject: 'Mathematics',
      duration: '2 months',
      status: 'Active',
    },
    {
      sNo: 6,
      seriesId: 'TS006',
      seriesName: 'Entrance Mock Tests',
      totalTests: 40,
      totalStudents: 650,
      avgScore: '58.7%',
      completionRate: '68.4%',
      subject: 'General',
      duration: '3 months',
      status: 'Draft',
    },
    {
      sNo: 7,
      seriesId: 'TS007',
      seriesName: 'Advanced Biology Series',
      totalTests: 28,
      totalStudents: 980,
      avgScore: '74.6%',
      completionRate: '81.2%',
      subject: 'Biology',
      duration: '4 months',
      status: 'Active',
    },
    {
      sNo: 8,
      seriesId: 'TS008',
      seriesName: 'Quick Revision Tests',
      totalTests: 12,
      totalStudents: 1580,
      avgScore: '86.3%',
      completionRate: '94.7%',
      subject: 'General',
      duration: '1 month',
      status: 'Completed',
    },
  ];

  // Get unique subjects and statuses for filters
  const subjects = ['all', ...Array.from(new Set(testSeriesData.map((item) => item.subject)))];
  const statuses = ['all', ...Array.from(new Set(testSeriesData.map((item) => item.status)))];

  // Filter and search logic
  const filteredData = useMemo(() => {
    return testSeriesData.filter((item) => {
      const matchesSearch =
        item.seriesName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.seriesId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject = subjectFilter === 'all' || item.subject === subjectFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [searchTerm, subjectFilter, statusFilter]);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();

      if (aString < bString) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aString > bString) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (key: keyof TestSeriesData) => {
    setSortConfig((current) => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Completed':
        return 'info';
      case 'Draft':
        return 'warning';
      case 'Inactive':
        return 'failure';
      default:
        return 'gray';
    }
  };

  const getScoreBadgeColor = (score: string) => {
    const numScore = parseFloat(score.replace('%', ''));
    if (numScore >= 80) return 'success';
    if (numScore >= 60) return 'warning';
    return 'failure';
  };

  const tableActionData = [
    { icon: 'solar:eye-outline', listtitle: 'View Details' },
    { icon: 'solar:pen-new-square-broken', listtitle: 'Edit' },
    { icon: 'solar:copy-outline', listtitle: 'Duplicate' },
    { icon: 'solar:download-outline', listtitle: 'Export' },
    { icon: 'solar:trash-bin-minimalistic-outline', listtitle: 'Delete' },
  ];

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h5 className="card-title">Test Series Management</h5>
          <p className="card-subtitle">Manage and analyze test series performance</p>
        </div>
        <div className="flex gap-2">
          <Icon icon="solar:test-tube-outline" className="text-2xl text-primary" />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <TextInput
            icon={HiSearch}
            placeholder="Search test series..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="min-w-[150px]"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </Select>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-w-[150px]"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </option>
            ))}
          </Select>
          <Select
            value={itemsPerPage.toString()}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            className="min-w-[100px]"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </Select>
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-4">
        <p className="text-sm text-bodytext">
          Showing {paginatedData.length} of {sortedData.length} results
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell
              className="p-4 cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('sNo')}
            >
              <div className="flex items-center gap-1">
                S No
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('seriesId')}
            >
              <div className="flex items-center gap-1">
                Series ID
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('seriesName')}
            >
              <div className="flex items-center gap-1">
                Series Name
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('totalTests')}
            >
              <div className="flex items-center gap-1">
                Total Tests
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('totalStudents')}
            >
              <div className="flex items-center gap-1">
                Students
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('avgScore')}
            >
              <div className="flex items-center gap-1">
                Avg Score
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('completionRate')}
            >
              <div className="flex items-center gap-1">
                Completion
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>Duration</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {paginatedData.map((item) => (
              <Table.Row key={item.seriesId} className="hover:bg-lightprimary/20">
                <Table.Cell className="p-4 font-medium">{item.sNo}</Table.Cell>
                <Table.Cell className="font-medium text-primary">{item.seriesId}</Table.Cell>
                <Table.Cell>
                  <div>
                    <div className="font-medium text-dark dark:text-white">{item.seriesName}</div>
                    <div className="text-sm text-bodytext">{item.subject}</div>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-center font-medium">{item.totalTests}</Table.Cell>
                <Table.Cell className="text-center">
                  {item.totalStudents.toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  <Badge color={getScoreBadgeColor(item.avgScore)} className="justify-center">
                    {item.avgScore}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={getScoreBadgeColor(item.completionRate)} className="justify-center">
                    {item.completionRate}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-center">{item.duration}</Table.Cell>
                <Table.Cell>
                  <Badge color={getStatusBadgeColor(item.status)}>{item.status}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (
                      <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                        <HiOutlineDotsVertical size={22} />
                      </span>
                    )}
                  >
                    {tableActionData.map((actionItem, idx) => (
                      <Dropdown.Item key={idx} className="flex gap-3">
                        <Icon icon={actionItem.icon} height={18} />
                        <span>{actionItem.listtitle}</span>
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-bodytext">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i + 1));
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === pageNum
                      ? 'text-blue-600 bg-blue-50 border border-blue-300 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { TestSeriesTable };
