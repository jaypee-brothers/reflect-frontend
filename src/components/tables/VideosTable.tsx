import { useState, useMemo } from 'react';
import { Badge, Select, TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import { Table } from 'flowbite-react';

interface VideoData {
  sNo: number;
  videoId: string;
  videoTitle: string;
  instructor: string;
  subject: string;
  duration: string;
  views: number;
  likes: number;
  avgRating: number;
  uploadDate: string;
  status: string;
  category: string;
}

const VideosTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof VideoData;
    direction: 'asc' | 'desc';
  } | null>(null);

  const videoData: VideoData[] = [
    {
      sNo: 1,
      videoId: 'VID001',
      videoTitle: 'Human Anatomy - Cardiovascular System',
      instructor: 'Dr. Arun Sharma',
      subject: 'Anatomy',
      duration: '45:30',
      views: 12500,
      likes: 1180,
      avgRating: 4.8,
      uploadDate: '2024-01-10',
      status: 'Published',
      category: 'Lecture',
    },
    {
      sNo: 2,
      videoId: 'VID002',
      videoTitle: 'Pharmacology Basics - Drug Mechanisms',
      instructor: 'Dr. Priya Singh',
      subject: 'Pharmacology',
      duration: '38:15',
      views: 8900,
      likes: 890,
      avgRating: 4.6,
      uploadDate: '2024-01-08',
      status: 'Published',
      category: 'Tutorial',
    },
    {
      sNo: 3,
      videoId: 'VID003',
      videoTitle: 'Pathology Case Studies - Liver Diseases',
      instructor: 'Dr. Rajesh Kumar',
      subject: 'Pathology',
      duration: '52:20',
      views: 6780,
      likes: 720,
      avgRating: 4.7,
      uploadDate: '2024-01-05',
      status: 'Published',
      category: 'Case Study',
    },
    {
      sNo: 4,
      videoId: 'VID004',
      videoTitle: 'Physiology - Respiratory System Function',
      instructor: 'Dr. Meera Patel',
      subject: 'Physiology',
      duration: '41:45',
      views: 9850,
      likes: 1050,
      avgRating: 4.9,
      uploadDate: '2024-01-12',
      status: 'Published',
      category: 'Lecture',
    },
    {
      sNo: 5,
      videoId: 'VID005',
      videoTitle: 'Surgery Techniques - Laparoscopic Procedures',
      instructor: 'Dr. Vikram Joshi',
      subject: 'Surgery',
      duration: '1:15:30',
      views: 15200,
      likes: 1680,
      avgRating: 4.8,
      uploadDate: '2024-01-07',
      status: 'Published',
      category: 'Demonstration',
    },
    {
      sNo: 6,
      videoId: 'VID006',
      videoTitle: 'Biochemistry - Enzyme Kinetics',
      instructor: 'Dr. Anita Reddy',
      subject: 'Biochemistry',
      duration: '33:25',
      views: 5400,
      likes: 480,
      avgRating: 4.4,
      uploadDate: '2024-01-03',
      status: 'Draft',
      category: 'Tutorial',
    },
    {
      sNo: 7,
      videoId: 'VID007',
      videoTitle: 'Microbiology - Bacterial Infections',
      instructor: 'Dr. Suresh Nair',
      subject: 'Microbiology',
      duration: '47:10',
      views: 7320,
      likes: 650,
      avgRating: 4.5,
      uploadDate: '2024-01-09',
      status: 'Published',
      category: 'Lecture',
    },
    {
      sNo: 8,
      videoId: 'VID008',
      videoTitle: 'Pediatrics - Child Development Milestones',
      instructor: 'Dr. Kavita Gupta',
      subject: 'Pediatrics',
      duration: '29:45',
      views: 4560,
      likes: 420,
      avgRating: 4.6,
      uploadDate: '2024-01-11',
      status: 'Published',
      category: 'Educational',
    },
    {
      sNo: 9,
      videoId: 'VID009',
      videoTitle: 'Radiology - CT Scan Interpretation',
      instructor: 'Dr. Amit Thakur',
      subject: 'Radiology',
      duration: '56:35',
      views: 8900,
      likes: 890,
      avgRating: 4.7,
      uploadDate: '2024-01-06',
      status: 'Under Review',
      category: 'Tutorial',
    },
    {
      sNo: 10,
      videoId: 'VID010',
      videoTitle: 'Psychiatry - Mental Health Assessment',
      instructor: 'Dr. Neha Kapoor',
      subject: 'Psychiatry',
      duration: '42:20',
      views: 6200,
      likes: 580,
      avgRating: 4.5,
      uploadDate: '2024-01-04',
      status: 'Published',
      category: 'Case Study',
    },
  ];

  // Get unique values for filters
  const subjects = ['all', ...Array.from(new Set(videoData.map((item) => item.subject)))];
  const statuses = ['all', ...Array.from(new Set(videoData.map((item) => item.status)))];
  const categories = ['all', ...Array.from(new Set(videoData.map((item) => item.category)))];

  // Filter and search logic
  const filteredData = useMemo(() => {
    return videoData.filter((item) => {
      const matchesSearch =
        item.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.videoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject = subjectFilter === 'all' || item.subject === subjectFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      return matchesSearch && matchesSubject && matchesStatus && matchesCategory;
    });
  }, [searchTerm, subjectFilter, statusFilter, categoryFilter]);

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

  const handleSort = (key: keyof VideoData) => {
    setSortConfig((current) => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'green';
      case 'Draft':
        return 'yellow';
      case 'Under Review':
        return 'blue';
      case 'Archived':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'Lecture':
        return 'blue';
      case 'Tutorial':
        return 'green';
      case 'Case Study':
        return 'yellow';
      case 'Demonstration':
        return 'purple';
      case 'Educational':
        return 'pink';
      default:
        return 'gray';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h5 className="card-title">Video Content Management</h5>
          <p className="card-subtitle">Manage educational videos and content library</p>
        </div>
        <div className="flex gap-2">
          <Icon icon="solar:video-frame-play-vertical-outline" className="text-2xl text-primary" />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <TextInput
            icon={HiSearch}
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="min-w-[130px]"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </Select>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="min-w-[130px]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </Select>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-w-[130px]"
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
              onClick={() => handleSort('videoId')}
            >
              <div className="flex items-center gap-1">
                Video ID
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('videoTitle')}
            >
              <div className="flex items-center gap-1">
                Video Details
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('instructor')}
            >
              <div className="flex items-center gap-1">
                Instructor
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>Duration</Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('views')}
            >
              <div className="flex items-center gap-1">
                Views
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell
              className="cursor-pointer hover:bg-lightprimary"
              onClick={() => handleSort('avgRating')}
            >
              <div className="flex items-center gap-1">
                Rating
                <Icon icon="solar:sort-vertical-outline" className="text-xs" />
              </div>
            </Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-border dark:divide-darkborder">
            {paginatedData.map((item) => (
              <Table.Row key={item.videoId} className="hover:bg-lightprimary/20">
                <Table.Cell className="p-4 font-medium">{item.sNo}</Table.Cell>
                <Table.Cell className="font-medium text-primary">{item.videoId}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 rounded bg-primary/10 flex items-center justify-center">
                      <Icon icon="solar:play-circle-outline" className="text-primary text-2xl" />
                    </div>
                    <div className="max-w-xs">
                      <div className="font-medium text-dark dark:text-white line-clamp-2">
                        {item.videoTitle}
                      </div>
                      <div className="text-sm text-bodytext">{item.subject}</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-sm">{item.instructor}</Table.Cell>
                <Table.Cell className="text-center font-mono text-sm">
                  {formatDuration(item.duration)}
                </Table.Cell>
                <Table.Cell className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Icon icon="solar:eye-outline" className="text-bodytext" />
                    <span className="font-medium">{item.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-center text-sm text-bodytext">
                    <Icon icon="solar:heart-outline" className="text-red-500" />
                    <span>{item.likes}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-center">
                  <div
                    className={`flex items-center gap-1 justify-center ${getRatingColor(
                      item.avgRating,
                    )}`}
                  >
                    <Icon icon="solar:star-bold" />
                    <span className="font-medium">{item.avgRating}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={getCategoryBadgeColor(item.category)}>{item.category}</Badge>
                </Table.Cell>
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

export { VideosTable };
