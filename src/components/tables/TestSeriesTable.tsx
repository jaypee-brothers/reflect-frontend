import { useState, useEffect } from 'react';
import { Badge, Select, Spinner, Alert, Pagination } from 'flowbite-react';
import { HiExclamationCircle } from 'react-icons/hi';
import { Table } from 'flowbite-react';
import { useInstitutionalStore } from '../../data/institutional/institutionalStore';
import Popover from '../shared/Popover';
import { INFO_POPOVER_CONTENTS } from '../../utils/constants';

const TestSeriesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Zustand store integration
  const {
    testSeriesManagementTable: { data, loading, error, pagination },
    fetchTestSeriesManagementTable,
  } = useInstitutionalStore();

  // Fetch data on component mount and when filters change
  useEffect(() => {
    const fetchData = async () => {
      await fetchTestSeriesManagementTable({
        page: currentPage,
        limit: itemsPerPage,
      });
    };

    fetchData();
  }, [currentPage, itemsPerPage, fetchTestSeriesManagementTable]);

  // Sync local currentPage with API response
  useEffect(() => {
    if (pagination?.current_page && pagination.current_page !== currentPage) {
      setCurrentPage(pagination.current_page);
    }
  }, [pagination?.current_page]);

  const totalPages = pagination?.total_pages || 1;
  const totalCount = pagination?.total_count || 0;

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
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
          <h2 className="text-xl font-semibold text-gray-900">Test Series Analytics</h2>
          <Popover content={INFO_POPOVER_CONTENTS['test-series-analytics']} />
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

      {/* Filters - Only Page Size */}

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
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Test Type</Table.HeadCell>
            <Table.HeadCell>Students</Table.HeadCell>
            <Table.HeadCell>Avg Score</Table.HeadCell>
            <Table.HeadCell>Difficulty</Table.HeadCell>
            <Table.HeadCell>Start Date</Table.HeadCell>
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
                  <div className="text-gray-500">No test series data available.</div>
                </Table.Cell>
              </Table.Row>
            ) : (
              data.map((item, index) => (
                <Table.Row
                  key={`${item.serial_number}-${index}`}
                  className="hover:bg-lightprimary/20"
                >
                  <Table.Cell>
                    <div>
                      <div className="font-medium">{item.title}</div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm">{item.test_type}</div>
                  </Table.Cell>
                  <Table.Cell className="text-center font-medium">{item.total_students}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={getScoreBadgeColor(item.average_score)}
                      className="justify-center"
                    >
                      {item.average_score}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={
                        item.difficulty_level === 'Easy'
                          ? 'green'
                          : item.difficulty_level === 'Medium'
                          ? 'yellow'
                          : 'red'
                      }
                      className="justify-center"
                    >
                      {item.difficulty_level}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm">{new Date(item.start_date).toLocaleDateString()}</div>
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
            {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} test series
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

export { TestSeriesTable };
