import { useState, useEffect } from 'react';
import { Badge, Select, Spinner, Alert } from 'flowbite-react';
import { HiExclamationCircle } from 'react-icons/hi';
import { Table } from 'flowbite-react';
import { useInstitutionalStore } from '../../data/institutional/institutionalStore';
import { Link } from 'react-router';
import { Pagination } from 'flowbite-react';
import Popover from '../shared/Popover';
import { INFO_POPOVER_CONTENTS } from '../../utils/constants';

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Zustand store integration
  const {
    userManagementTable: { data, loading, error, pagination },
    fetchUserManagementTable,
  } = useInstitutionalStore();
  console.log('UsersTable data:', data);
  console.log('UsersTable pagination:', pagination);
  console.log('UsersTable loading:', loading);
  console.log('UsersTable error:', error);

  // Fetch data on component mount and when filters change
  useEffect(() => {
    const fetchData = async () => {
      await fetchUserManagementTable({
        page: currentPage,
        limit: itemsPerPage,
      });
    };

    fetchData();
  }, [currentPage, itemsPerPage, fetchUserManagementTable]);

  const totalPages = pagination?.total_pages || 1;
  const totalCount = pagination?.total_count || 0;

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'green';
      case 'inactive':
        return 'red';
      case 'pending':
        return 'yellow';
      case 'suspended':
        return 'red';
      default:
        return 'info';
    }
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">User Analytics</h2>
          <Popover content={INFO_POPOVER_CONTENTS['user-analytics']} />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex gap-2 flex-wrap ml-auto">
            <Select
              value={currentPage.toString()}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              className="min-w-[120px]"
              disabled={loading}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}
                </option>
              ))}
            </Select>
            <Select
              value={itemsPerPage.toString()}
              onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
              className="min-w-[100px]"
              disabled={loading}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </Select>
          </div>
        </div>
      </div>
      {/* Error State */}
      {error && (
        <Alert color="failure" icon={HiExclamationCircle} className="mb-4">
          <span className="font-medium">Error loading data:</span> {error}
        </Alert>
      )}

      {/* Results summary */}
      <div className="mb-4">
        <p className="text-sm text-bodytext">
          {loading ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" />
              Loading...
            </span>
          ) : (
            <>
              Showing {data.length} of {totalCount} results
            </>
          )}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>User Details</Table.HeadCell>
            <Table.HeadCell>Grand Tests Taken</Table.HeadCell>
            <Table.HeadCell>Avg Score</Table.HeadCell>
            <Table.HeadCell>Signup Date</Table.HeadCell>
            <Table.HeadCell>Last Login</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center items-center gap-2">
                    <Spinner size="md" />
                    <span>Loading data...</span>
                  </div>
                </Table.Cell>
              </Table.Row>
            ) : data.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center py-8">
                  <div className="text-gray-500">No user data available.</div>
                </Table.Cell>
              </Table.Row>
            ) : (
              data.map((item, index) => (
                <Table.Row key={`${item.email}-${index}`} className="hover:bg-lightprimary/20">
                  <Table.Cell>
                    <Link
                      to={`/profile/student/${item.id}`}
                      className="font-medium text-dark dark:text-white hover:underline text-blue-700"
                      style={{ textDecoration: 'none' }}
                    >
                      <div>
                        {item.user_name}
                        <div className="text-sm text-bodytext">{item.email}</div>
                      </div>
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="text-center font-medium">
                    <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {item.tests_completed}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={getScoreBadgeColor(item.avg_score)} className="justify-center">
                      {item.avg_score}%
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm">{formatDate(item.join_date)}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm">{formatDate(item.last_login)}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={getStatusBadgeColor(item.status)}>{item.status}</Badge>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && !loading && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
          <div className="text-sm text-bodytext">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} users
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showIcons
            layout="navigation"
            previousLabel=" "
            nextLabel=" "
            className="ml-auto"
          />
        </div>
      )}
    </div>
  );
};

export { UsersTable };
