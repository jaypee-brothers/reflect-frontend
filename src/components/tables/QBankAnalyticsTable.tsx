import { useState, useMemo } from 'react';
import { Badge, Select, TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import { Table } from 'flowbite-react';

interface QBankData {
  sNo: number;
  qbankId: string;
  qbankName: string;
  noOfQuestions: number;
  totalAttempts: number;
  totalCompleted: number;
  averageScore: string;
  topScore: string;
  subject: string;
  difficulty: string;
}

const QBankAnalyticsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof QBankData;
    direction: 'asc' | 'desc';
  } | null>(null);

  const qbankData: QBankData[] = [
    {
      sNo: 1,
      qbankId: 'QBAI001',
      qbankName: 'Radiology Medium Level',
      noOfQuestions: 121,
      totalAttempts: 1883,
      totalCompleted: 1172,
      averageScore: '73.73%',
      topScore: '84.85%',
      subject: 'Radiology',
      difficulty: 'Medium',
    },
    {
      sNo: 2,
      qbankId: 'QBAI002',
      qbankName: 'Surgery Easy Level',
      noOfQuestions: 106,
      totalAttempts: 327,
      totalCompleted: 270,
      averageScore: '88.61%',
      topScore: '99.83%',
      subject: 'Surgery',
      difficulty: 'Easy',
    },
    {
      sNo: 3,
      qbankId: 'QBAI003',
      qbankName: 'ENT Hard Level',
      noOfQuestions: 179,
      totalAttempts: 1391,
      totalCompleted: 921,
      averageScore: '62.73%',
      topScore: '84.8%',
      subject: 'ENT',
      difficulty: 'Hard',
    },
    {
      sNo: 4,
      qbankId: 'QBAI004',
      qbankName: 'Psychiatry Medium Level',
      noOfQuestions: 177,
      totalAttempts: 1899,
      totalCompleted: 1150,
      averageScore: '55.89%',
      topScore: '77.8%',
      subject: 'Psychiatry',
      difficulty: 'Medium',
    },
    {
      sNo: 5,
      qbankId: 'QBAI005',
      qbankName: 'Medicine Medium Level',
      noOfQuestions: 139,
      totalAttempts: 1869,
      totalCompleted: 1321,
      averageScore: '67.67%',
      topScore: '89.71%',
      subject: 'Medicine',
      difficulty: 'Medium',
    },
    {
      sNo: 6,
      qbankId: 'QBAI006',
      qbankName: 'Surgery Easy Level',
      noOfQuestions: 88,
      totalAttempts: 1470,
      totalCompleted: 963,
      averageScore: '87.52%',
      topScore: '100%',
      subject: 'Surgery',
      difficulty: 'Easy',
    },
    {
      sNo: 7,
      qbankId: 'QBAI007',
      qbankName: 'Surgery Hard Level',
      noOfQuestions: 151,
      totalAttempts: 1746,
      totalCompleted: 1242,
      averageScore: '55.8%',
      topScore: '74.74%',
      subject: 'Surgery',
      difficulty: 'Hard',
    },
    {
      sNo: 8,
      qbankId: 'QBAI008',
      qbankName: 'Pediatrics Easy Level',
      noOfQuestions: 82,
      totalAttempts: 1790,
      totalCompleted: 1170,
      averageScore: '87.58%',
      topScore: '98.64%',
      subject: 'Pediatrics',
      difficulty: 'Easy',
    },
    {
      sNo: 9,
      qbankId: 'QBAI009',
      qbankName: 'Orthopedics Easy Level',
      noOfQuestions: 102,
      totalAttempts: 343,
      totalCompleted: 304,
      averageScore: '87.98%',
      topScore: '100%',
      subject: 'Orthopedics',
      difficulty: 'Easy',
    },
    {
      sNo: 10,
      qbankId: 'QBAI010',
      qbankName: 'Orthopedics Hard Level',
      noOfQuestions: 215,
      totalAttempts: 1563,
      totalCompleted: 1138,
      averageScore: '61.41%',
      topScore: '72.56%',
      subject: 'Orthopedics',
      difficulty: 'Hard',
    },
    {
      sNo: 11,
      qbankId: 'QBAI011',
      qbankName: 'Radiology Easy Level',
      noOfQuestions: 106,
      totalAttempts: 210,
      totalCompleted: 148,
      averageScore: '93.81%',
      topScore: '100%',
      subject: 'Radiology',
      difficulty: 'Easy',
    },
    {
      sNo: 12,
      qbankId: 'QBAI012',
      qbankName: 'Ophthalmology Easy Level',
      noOfQuestions: 93,
      totalAttempts: 1997,
      totalCompleted: 1406,
      averageScore: '83.32%',
      topScore: '96.66%',
      subject: 'Ophthalmology',
      difficulty: 'Easy',
    },
    {
      sNo: 13,
      qbankId: 'QBAI013',
      qbankName: 'Ophthalmology Medium Level',
      noOfQuestions: 177,
      totalAttempts: 373,
      totalCompleted: 334,
      averageScore: '63.36%',
      topScore: '80.11%',
      subject: 'Ophthalmology',
      difficulty: 'Medium',
    },
    {
      sNo: 14,
      qbankId: 'QBAI014',
      qbankName: 'Surgery Hard Level',
      noOfQuestions: 211,
      totalAttempts: 1006,
      totalCompleted: 843,
      averageScore: '54.38%',
      topScore: '66.56%',
      subject: 'Surgery',
      difficulty: 'Hard',
    },
    {
      sNo: 15,
      qbankId: 'QBAI015',
      qbankName: 'Psychiatry Easy Level',
      noOfQuestions: 109,
      totalAttempts: 1714,
      totalCompleted: 1160,
      averageScore: '91.57%',
      topScore: '100%',
      subject: 'Psychiatry',
      difficulty: 'Easy',
    },
    {
      sNo: 16,
      qbankId: 'QBAI016',
      qbankName: 'Orthopedics Hard Level',
      noOfQuestions: 206,
      totalAttempts: 1216,
      totalCompleted: 864,
      averageScore: '51.51%',
      topScore: '63.93%',
      subject: 'Orthopedics',
      difficulty: 'Hard',
    },
    {
      sNo: 17,
      qbankId: 'QBAI017',
      qbankName: 'Psychiatry Medium Level',
      noOfQuestions: 172,
      totalAttempts: 1409,
      totalCompleted: 907,
      averageScore: '86.65%',
      topScore: '99.99%',
      subject: 'Psychiatry',
      difficulty: 'Medium',
    },
    {
      sNo: 18,
      qbankId: 'QBAI018',
      qbankName: 'Pharmacology Medium Level',
      noOfQuestions: 142,
      totalAttempts: 713,
      totalCompleted: 576,
      averageScore: '80.48%',
      topScore: '91.15%',
      subject: 'Pharmacology',
      difficulty: 'Medium',
    },
    {
      sNo: 19,
      qbankId: 'QBAI019',
      qbankName: 'Anatomy Hard Level',
      noOfQuestions: 215,
      totalAttempts: 1627,
      totalCompleted: 1373,
      averageScore: '30.7%',
      topScore: '42.37%',
      subject: 'Anatomy',
      difficulty: 'Hard',
    },
    {
      sNo: 20,
      qbankId: 'QBAI020',
      qbankName: 'Medicine Medium Level',
      noOfQuestions: 135,
      totalAttempts: 1570,
      totalCompleted: 1012,
      averageScore: '69.18%',
      topScore: '80.84%',
      subject: 'Medicine',
      difficulty: 'Medium',
    },
  ];

  // Get unique subjects and difficulties for filters
  const subjects = ['all', ...Array.from(new Set(qbankData.map((item) => item.subject)))];
  const difficulties = ['all', ...Array.from(new Set(qbankData.map((item) => item.difficulty)))];

  // Filter and search logic
  const filteredData = useMemo(() => {
    return qbankData.filter((item) => {
      const matchesSearch =
        item.qbankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.qbankId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject = subjectFilter === 'all' || item.subject === subjectFilter;
      const matchesDifficulty = difficultyFilter === 'all' || item.difficulty === difficultyFilter;

      return matchesSearch && matchesSubject && matchesDifficulty;
    });
  }, [searchTerm, subjectFilter, difficultyFilter]);

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

  const handleSort = (key: keyof QBankData) => {
    setSortConfig((current) => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Hard':
        return 'failure';
      default:
        return 'info';
    }
  };

  const getScoreBadgeColor = (score: string) => {
    const numScore = parseFloat(score.replace('%', ''));
    if (numScore >= 80) return 'success';
    if (numScore >= 60) return 'warning';
    return 'failure';
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h5 className="card-title">Q-Bank Analytics</h5>
          <p className="card-subtitle">Comprehensive Q-Bank performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <Icon icon="solar:chart-line-outline" className="text-2xl text-primary" />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <TextInput
            icon={HiSearch}
            placeholder="Search Q-Banks..."
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
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="min-w-[150px]"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty}
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
              onClick={() => handleSort('qbankId')}
            >
              <div className="flex items-center gap-1">
                Q-bank ID
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('qbankName')}
            >
              <div className="flex items-center gap-1">
                Q-bank Name
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('noOfQuestions')}
            >
              <div className="flex items-center gap-1">
                Questions
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('totalAttempts')}
            >
              <div className="flex items-center gap-1">
                Total Attempts
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('totalCompleted')}
            >
              <div className="flex items-center gap-1">
                Completed
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('averageScore')}
            >
              <div className="flex items-center gap-1">
                Avg Score
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('topScore')}
            >
              <div className="flex items-center gap-1">
                Top Score
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>Difficulty</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {paginatedData.map((item) => (
              <Table.Row key={item.qbankId} className="hover:bg-lightprimary/20">
                <Table.Cell className="p-4 font-medium">{item.sNo}</Table.Cell>
                <Table.Cell className="font-medium text-primary">{item.qbankId}</Table.Cell>
                <Table.Cell>
                  <div>
                    <div className="font-medium text-dark dark:text-white">{item.qbankName}</div>
                    <div className="text-sm text-bodytext">{item.subject}</div>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-center font-medium">{item.noOfQuestions}</Table.Cell>
                <Table.Cell className="text-center">
                  {item.totalAttempts.toLocaleString()}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {item.totalCompleted.toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  <Badge color={getScoreBadgeColor(item.averageScore)} className="justify-center">
                    {item.averageScore}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={getScoreBadgeColor(item.topScore)} className="justify-center">
                    {item.topScore}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={getDifficultyBadgeColor(item.difficulty)}>{item.difficulty}</Badge>
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

export { QBankAnalyticsTable };
