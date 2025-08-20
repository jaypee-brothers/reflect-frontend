import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Table, Button } from 'flowbite-react';
import { useInstitutionalStore } from '../../data/institutional/institutionalStore';
import { Link } from 'react-router';
import Popover from '../shared/Popover';
import { INFO_POPOVER_CONTENTS } from '../../utils/constants';
import { Pagination } from 'flowbite-react';

interface StudentEngagementProps {
  selectedProfs?: string[];
}

const StudentEngagement = ({}: StudentEngagementProps) => {
  const { students: studentsState, fetchStudents } = useInstitutionalStore();
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  // Debounce search term
  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setDebouncedSearchTerm(searchTerm);
  //       setCurrentPage(1); // Reset to first page on search
  //     }, 500);

  //     return () => clearTimeout(timer);
  //   }, [searchTerm]);

  useEffect(() => {
    fetchStudents({
      page: currentPage,
      limit: studentsPerPage,
      //   search: debouncedSearchTerm,
    });
  }, [fetchStudents, currentPage]);

  // Access data from the new API-first structure
  const { data: students = [], loading, error } = studentsState;
  //   console.log('StudentEngagement', students);

  // Calculate totals for display in headers
  const totalVideosWatched = students.reduce(
    (sum: number, student: any) => sum + student.videosWatched,
    0,
  );
  const totalQbankAttempted = students.reduce(
    (sum: number, student: any) => sum + student.qbankAttempted,
    0,
  );
  const totalTestsTaken = students.reduce(
    (sum: number, student: any) => sum + student.testsTaken,
    0,
  );

  // Since API now handles filtering server-side, we use the data directly
  const currentStudents = students;
  const totalPages = Math.ceil(studentsState.totalCount / studentsPerPage);

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Within an hour - show minutes
    if (diffMinutes < 60) {
      if (diffMinutes < 1) return 'Just now';
      return `${diffMinutes} min ago`;
    }

    // Within a day - show hours and minutes
    if (diffHours < 24) {
      const remainingMinutes = diffMinutes % 60;
      if (remainingMinutes === 0) {
        return `${diffHours}h ago`;
      }
      return `${diffHours}h ${remainingMinutes}m ago`;
    }

    // Beyond a day - show days with better formatting
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    // Show date with time for older entries
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}`;
  };

  if (loading)
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="overflow-x-auto">
            <div className="h-12 bg-gray-200 rounded mb-2 w-full"></div>
            {[...Array(studentsPerPage)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded mb-2 w-full"></div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-900">Student Engagement</h2>
          <Popover content={INFO_POPOVER_CONTENTS['student-engagement']} />
        </div>
        <Link to={'/tables/users'}>
          <Button size="sm" color="blue">
            <Icon icon="solar:eye-bold" className="mr-2" width={16} />
            View All Students
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      {/* <div className="mb-6">
        <div className="relative">
          <Icon
            icon="solar:magnifer-linear"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            width={20}
          />
          <TextInput
            type="text"
            placeholder="Search by Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div> */}

      {/* Students Table */}
      <div className="overflow-x-auto flex-1">
        <Table>
          <Table.Head>
            <Table.HeadCell>Student Details</Table.HeadCell>
            <Table.HeadCell>Videos Watched </Table.HeadCell>
            <Table.HeadCell>QBank Attempted</Table.HeadCell>
            <Table.HeadCell>Tests Taken </Table.HeadCell>
            <Table.HeadCell>Last Login</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentStudents.map((student: any) => (
              <Table.Row key={student.user_id} className="bg-white">
                <Table.Cell className="font-medium text-gray-900">
                  <Link
                    to={`/profile/student/${student.user_id}`}
                    className="flex flex-col hover:underline text-blue-700"
                  >
                    <div>{student.name}</div>
                    <div className="text-bodytext">{student.email}</div>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {student.videosWatched}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {student.qbankAttempted}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="bg-orange-100 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {student.testsTaken}
                  </span>
                </Table.Cell>
                <Table.Cell className="text-gray-600">
                  {formatLastLogin(student.lastLogin)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
          <div className="text-sm text-bodytext">
            Showing {(currentPage - 1) * studentsPerPage + 1} to{' '}
            {Math.min(currentPage * studentsPerPage, studentsState.totalCount)} of{' '}
            {studentsState.totalCount} students
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showIcons
              layout="navigation"
              previousLabel=" "
              nextLabel=" "
              className="mt-[-8px]"
            />
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="min-w-[120px] px-2 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEngagement;
