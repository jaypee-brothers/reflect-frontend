import { TestSeriesTable } from 'src/components/tables/TestSeriesTable';

const TestSeriesManagement = () => {
  return (
    <>
      {/* Ensure TestSeriesTable does not show any id column or id value to the user */}
      <TestSeriesTable />
    </>
  );
};

export default TestSeriesManagement;
