import { Badge } from 'flowbite-react';
import { useInstitutionalStore } from '../../data/institutional/institutionalStore';
import { useEffect } from 'react';

const StudentsToWatch = () => {
  const { topStudents: topStudentsState, fetchTopStudents } = useInstitutionalStore();

  useEffect(() => {
    fetchTopStudents({ limit: 5 });
  }, [fetchTopStudents]);

  // Access data from the new API-first structure
  const { data: topStudentsData = [], loading, error } = topStudentsState;
  const topStudents = topStudentsData;

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Top Performers</h2>
        </div>
      </div>

      {/* Top Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {topStudents.map(
          (student) =>
            student.avgScore && (
              <div
                key={student.id || Math.random()}
                className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                {/* Rank Badge */}
                <div
                  className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${getRankBadgeColor(
                    student.rank || 0,
                  )} flex items-center justify-center text-sm font-bold shadow-lg`}
                >
                  #{student.rank || 0}
                </div>

                {/* Student Info */}
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mx-auto mb-2">
                      {(student.name || '')
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {student.name || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{student.email || 'N/A'}</div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Avg Score</span>
                      <Badge color="success" size="sm">
                        {student.avgScore || 0}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Total Tests</span>
                      <span className="text-xs font-medium text-gray-900">
                        {student.testsAttempted || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default StudentsToWatch;
