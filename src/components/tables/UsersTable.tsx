import { useState, useMemo } from 'react';
import { Badge, Select, TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import { Table } from 'flowbite-react';

interface UserData {
  sNo: number;
  userId: string;
  userName: string;
  email: string;
  role: string;
  institution: string;
  lastLogin: string;
  status: string;
  testsCompleted: number;
  avgScore: string;
  joinDate: string;
}

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof UserData;
    direction: 'asc' | 'desc';
  } | null>(null);

  const userData: UserData[] = [
    {
      sNo: 1,
      userId: 'USR001',
      userName: 'Arjun Sharma',
      email: 'arjun.sharma@email.com',
      role: 'Student',
      institution: 'AIIMS Delhi',
      lastLogin: '2024-01-15',
      status: 'Active',
      testsCompleted: 45,
      avgScore: '78.5%',
      joinDate: '2023-08-15',
    },
    {
      sNo: 2,
      userId: 'USR002',
      userName: 'Priya Singh',
      email: 'priya.singh@email.com',
      role: 'Faculty',
      institution: 'Manipal University',
      lastLogin: '2024-01-14',
      status: 'Active',
      testsCompleted: 120,
      avgScore: '85.2%',
      joinDate: '2023-06-10',
    },
    {
      sNo: 3,
      userId: 'USR003',
      userName: 'Rohit Kumar',
      email: 'rohit.kumar@email.com',
      role: 'Student',
      institution: 'JIPMER',
      lastLogin: '2024-01-12',
      status: 'Inactive',
      testsCompleted: 28,
      avgScore: '65.3%',
      joinDate: '2023-09-20',
    },
    {
      sNo: 4,
      userId: 'USR004',
      userName: 'Dr. Kavita Patel',
      email: 'kavita.patel@email.com',
      role: 'Admin',
      institution: 'AIIMS Mumbai',
      lastLogin: '2024-01-15',
      status: 'Active',
      testsCompleted: 200,
      avgScore: '92.1%',
      joinDate: '2023-05-01',
    },
    {
      sNo: 5,
      userId: 'USR005',
      userName: 'Ananya Gupta',
      email: 'ananya.gupta@email.com',
      role: 'Student',
      institution: 'CMC Vellore',
      lastLogin: '2024-01-13',
      status: 'Active',
      testsCompleted: 67,
      avgScore: '82.7%',
      joinDate: '2023-07-25',
    },
    {
      sNo: 6,
      userId: 'USR006',
      userName: 'Vikram Mehta',
      email: 'vikram.mehta@email.com',
      role: 'Student',
      institution: 'KGMU Lucknow',
      lastLogin: '2024-01-10',
      status: 'Suspended',
      testsCompleted: 15,
      avgScore: '45.8%',
      joinDate: '2023-10-05',
    },
    {
      sNo: 7,
      userId: 'USR007',
      userName: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      role: 'Faculty',
      institution: 'NIMS Hyderabad',
      lastLogin: '2024-01-14',
      status: 'Active',
      testsCompleted: 89,
      avgScore: '88.9%',
      joinDate: '2023-04-12',
    },
    {
      sNo: 8,
      userId: 'USR008',
      userName: 'Amit Joshi',
      email: 'amit.joshi@email.com',
      role: 'Student',
      institution: 'BHU Varanasi',
      lastLogin: '2024-01-11',
      status: 'Active',
      testsCompleted: 52,
      avgScore: '73.4%',
      joinDate: '2023-08-30',
    },
    {
      sNo: 9,
      userId: 'USR009',
      userName: 'Meera Krishnan',
      email: 'meera.krishnan@email.com',
      role: 'Student',
      institution: 'JIPMER',
      lastLogin: '2024-01-15',
      status: 'Active',
      testsCompleted: 78,
      avgScore: '79.6%',
      joinDate: '2023-06-18',
    },
    {
      sNo: 10,
      userId: 'USR010',
      userName: 'Dr. Rajesh Nair',
      email: 'rajesh.nair@email.com',
      role: 'Admin',
      institution: 'AIIMS Kochi',
      lastLogin: '2024-01-15',
      status: 'Active',
      testsCompleted: 180,
      avgScore: '94.3%',
      joinDate: '2023-03-15',
    },
  ];

  // Get unique roles and statuses for filters
  const roles = ['all', ...Array.from(new Set(userData.map((item) => item.role)))];
  const statuses = ['all', ...Array.from(new Set(userData.map((item) => item.status)))];

  // Filter and search logic
  const filteredData = useMemo(() => {
    return userData.filter((item) => {
      const matchesSearch =
        item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.institution.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'all' || item.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchTerm, roleFilter, statusFilter]);

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

  const handleSort = (key: keyof UserData) => {
    setSortConfig((current) => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'red';
      case 'Faculty':
        return 'yellow';
      case 'Student':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Inactive':
        return 'yellow';
      case 'Suspended':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getScoreBadgeColor = (score: string) => {
    const numScore = parseFloat(score.replace('%', ''));
    if (numScore >= 80) return 'green';
    if (numScore >= 60) return 'yellow';
    return 'red';
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h5 className="card-title">User Management</h5>
          <p className="card-subtitle">Manage users, roles, and permissions</p>
        </div>
        <div className="flex gap-2">
          <Icon icon="solar:users-group-two-rounded-outline" className="text-2xl text-primary" />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <TextInput
            icon={HiSearch}
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="min-w-[150px]"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role === 'all' ? 'All Roles' : role}
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
              onClick={() => handleSort('userId')}
            >
              <div className="flex items-center gap-1">
                User ID
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('userName')}
            >
              <div className="flex items-center gap-1">
                User Info
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('institution')}
            >
              <div className="flex items-center gap-1">
                Institution
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('testsCompleted')}
            >
              <div className="flex items-center gap-1">
                Tests
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
              onClick={() => handleSort('lastLogin')}
            >
              <div className="flex items-center gap-1">
                Last Login
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {paginatedData.map((item) => (
              <Table.Row key={item.userId} className="hover:bg-lightprimary/20">
                <Table.Cell className="p-4 font-medium">{item.sNo}</Table.Cell>
                <Table.Cell className="font-medium text-primary">{item.userId}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon icon="solar:user-circle-outline" className="text-primary text-xl" />
                    </div>
                    <div>
                      <div className="font-medium text-dark dark:text-white">{item.userName}</div>
                      <div className="text-sm text-bodytext">{item.email}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={getRoleBadgeColor(item.role)}>{item.role}</Badge>
                </Table.Cell>
                <Table.Cell className="text-sm">{item.institution}</Table.Cell>
                <Table.Cell className="text-center font-medium">{item.testsCompleted}</Table.Cell>
                <Table.Cell>
                  <Badge color={getScoreBadgeColor(item.avgScore)} className="justify-center">
                    {item.avgScore}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-sm">{item.lastLogin}</Table.Cell>
                <Table.Cell>
                  <Badge color={getStatusBadgeColor(item.status)}>{item.status}</Badge>
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

export { UsersTable };
