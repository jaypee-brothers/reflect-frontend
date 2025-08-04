import { useState, useEffect } from 'react';
import { Badge, Select, Spinner, Alert, Pagination } from 'flowbite-react';
import { HiExclamationCircle } from 'react-icons/hi';
import { Table } from 'flowbite-react';
import { useInstitutionalStore } from '../../data/institutional/institutionalStore';
import Popover from '../shared/Popover';
import { INFO_POPOVER_CONTENTS } from '../../utils/constants';

const QBankAnalyticsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Zustand store integration
  const {
    qbankAnalyticsTable: { data, loading, error, pagination },
    fetchQBankAnalyticsTable,
  } = useInstitutionalStore();

  // Fetch data on component mount and when filters change
  useEffect(() => {
    const fetchData = async () => {
      await fetchQBankAnalyticsTable({
        page: currentPage,
        limit: itemsPerPage,
      });
    };

    fetchData();
  }, [currentPage, itemsPerPage, fetchQBankAnalyticsTable]);

  // Sync local currentPage with API response
  useEffect(() => {
    if (pagination?.current_page && pagination.current_page !== currentPage) {
      setCurrentPage(pagination.current_page);
    }
  }, [pagination?.current_page]);

  console.log(data);

  const totalPages = pagination?.total_pages || 1;
  const totalCount = pagination?.total_count || 0;

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'hard':
        return 'red';
      default:
        return 'info';
    }
  };

  const getAccuracyBadgeColor = (accuracy: number) => {
    if (accuracy >= 80) return 'green';
    if (accuracy >= 60) return 'yellow';
    return 'red';
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <Alert color="failure" icon={HiExclamationCircle}>
        <span className="font-medium">Error:</span> {error}
      </Alert>
    );
  }

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">QBank Analytics</h2>
          <Popover content={INFO_POPOVER_CONTENTS['qbank-analytics']} />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex gap-2 flex-wrap ml-auto">
            <Select
              value={currentPage.toString()}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              className="min-w-[100px]"
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
            <Table.HeadCell>S.No</Table.HeadCell>
            <Table.HeadCell>QBank Name</Table.HeadCell>
            <Table.HeadCell>Module</Table.HeadCell>
            <Table.HeadCell>Total Attempts</Table.HeadCell>
            <Table.HeadCell>Avg Accuracy</Table.HeadCell>
            <Table.HeadCell>Difficulty</Table.HeadCell>
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
                  <div className="text-gray-500">No QBank data available.</div>
                </Table.Cell>
              </Table.Row>
            ) : (
              data.map((item, index) => (
                <Table.Row key={`${item.qbank_id}-${index}`} className="hover:bg-lightprimary/20">
                  <Table.Cell className="font-medium text-dark dark:text-white">
                    {item.serial_number}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-dark dark:text-white">
                    {item.name}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color="info">{item.module}</Badge>
                  </Table.Cell>
                  <Table.Cell className="text-center font-medium">{item.total_attempts}</Table.Cell>
                  <Table.Cell>
                    <Badge color={getAccuracyBadgeColor(item.avg_accuracy)}>
                      {item.avg_accuracy.toFixed(1)}%
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={getDifficultyBadgeColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
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
            {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} modules
          </div>
          {/* <div className="flex items-center gap-4"> */}
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
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export { QBankAnalyticsTable };
