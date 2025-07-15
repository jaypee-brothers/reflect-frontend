import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Table, TextInput, Button } from 'flowbite-react';

interface Student {
  id: number;
  name: string;
  email: string;
  professor: string;
  totalLogins: number;
  lastLogin: string;
  videosWatched: number;
  qbankAttempted: number;
  testsTaken: number;
  isActive: boolean;
}

interface StudentEngagementProps {
  selectedProfessors?: string[];
}

const StudentEngagement = ({ selectedProfessors = [] }: StudentEngagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  // Sample student data - replace with real API data
  const [students] = useState<Student[]>([
    {
      id: 1,
      name: 'Dr. Arjun Sharma',
      email: 'arjun.sharma@medcollege.edu',
      professor: 'prof 1',
      totalLogins: 45,
      lastLogin: '2024-01-08',
      videosWatched: 128,
      qbankAttempted: 67,
      testsTaken: 12,
      isActive: true,
    },
    {
      id: 2,
      name: 'Dr. Priya Patel',
      email: 'priya.patel@medcollege.edu',
      professor: 'prof 2',
      totalLogins: 38,
      lastLogin: '2024-01-07',
      videosWatched: 95,
      qbankAttempted: 52,
      testsTaken: 8,
      isActive: true,
    },
    {
      id: 3,
      name: 'Dr. Rahul Kumar',
      email: 'rahul.kumar@medcollege.edu',
      professor: 'prof 3',
      totalLogins: 52,
      lastLogin: '2024-01-08',
      videosWatched: 156,
      qbankAttempted: 89,
      testsTaken: 15,
      isActive: true,
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha.gupta@email.com',
      professor: 'prof 1',
      totalLogins: 29,
      lastLogin: '2024-01-06',
      videosWatched: 73,
      qbankAttempted: 41,
      testsTaken: 6,
      isActive: false,
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      professor: 'prof 4',
      totalLogins: 61,
      lastLogin: '2024-01-08',
      videosWatched: 187,
      qbankAttempted: 103,
      testsTaken: 18,
      isActive: true,
    },
    {
      id: 6,
      name: 'Anita Desai',
      email: 'anita.desai@email.com',
      professor: 'prof 2',
      totalLogins: 34,
      lastLogin: '2024-01-05',
      videosWatched: 82,
      qbankAttempted: 45,
      testsTaken: 9,
      isActive: true,
    },
    {
      id: 7,
      name: 'Ravi Verma',
      email: 'ravi.verma@email.com',
      professor: 'prof 5',
      totalLogins: 47,
      lastLogin: '2024-01-07',
      videosWatched: 134,
      qbankAttempted: 71,
      testsTaken: 13,
      isActive: true,
    },
    {
      id: 8,
      name: 'Kavya Nair',
      email: 'kavya.nair@email.com',
      professor: 'prof 3',
      totalLogins: 25,
      lastLogin: '2024-01-04',
      videosWatched: 58,
      qbankAttempted: 32,
      testsTaken: 5,
      isActive: false,
    },
    {
      id: 9,
      name: 'Rohit Mehta',
      email: 'rohit.mehta@email.com',
      professor: 'prof 5',
      totalLogins: 89,
      lastLogin: '2024-01-08',
      videosWatched: 245,
      qbankAttempted: 156,
      testsTaken: 28,
      isActive: true,
    },
    {
      id: 10,
      name: 'Priya Singh',
      email: 'priya.singh@email.com',
      professor: 'prof 1',
      totalLogins: 67,
      lastLogin: '2024-01-07',
      videosWatched: 198,
      qbankAttempted: 89,
      testsTaken: 14,
      isActive: true,
    },
  ]);

  // Calculate totals for display in headers
  const totalVideosWatched = students.reduce((sum, student) => sum + student.videosWatched, 0);
  const totalQbankAttempted = students.reduce((sum, student) => sum + student.qbankAttempted, 0);
  const totalTestsTaken = students.reduce((sum, student) => sum + student.testsTaken, 0);

  // Filter students based on search term and selected professors
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProfessor =
      selectedProfessors.length === 0 || selectedProfessors.includes(student.professor);

    return matchesSearch && matchesProfessor;
  });

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Student Engagement Metrics</h2>

        <Button size="sm" color="blue">
          <Icon icon="solar:eye-bold" className="mr-2" width={16} />
          View All Students
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
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
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Student Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>
              Prof&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Table.HeadCell>
            <Table.HeadCell>Last Login</Table.HeadCell>
            <Table.HeadCell>Videos Watched ({totalVideosWatched.toLocaleString()})</Table.HeadCell>
            <Table.HeadCell>
              QBank Attempted ({totalQbankAttempted.toLocaleString()})
            </Table.HeadCell>
            <Table.HeadCell>Tests Taken ({totalTestsTaken})</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentStudents.map((student) => (
              <Table.Row key={student.id} className="bg-white">
                <Table.Cell className="font-medium text-gray-900">{student.name}</Table.Cell>
                <Table.Cell className="text-gray-600">{student.email}</Table.Cell>
                <Table.Cell>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {student.professor}
                  </span>
                </Table.Cell>
                <Table.Cell className="text-gray-600">
                  {formatLastLogin(student.lastLogin)}
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
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstStudent + 1} to{' '}
            {Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length}{' '}
            students
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              color="gray"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                color={currentPage === page ? 'blue' : 'gray'}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              size="sm"
              color="gray"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEngagement;
