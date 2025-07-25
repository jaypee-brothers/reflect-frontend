// Test file to verify all table components compile correctly
import { QBankAnalyticsTable } from '../src/components/tables/QBankAnalyticsTable';
import { UsersTable } from '../src/components/tables/UsersTable';
import { TestSeriesTable } from '../src/components/tables/TestSeriesTable';
import { VideosTable } from '../src/components/tables/VideosTable';

// Test component that uses all table components
const TableTest = () => {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>QBank Analytics Table</h2>
        <QBankAnalyticsTable />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Users Table</h2>
        <UsersTable />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Test Series Table</h2>
        <TestSeriesTable />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Videos Table</h2>
        <VideosTable />
      </div>
    </div>
  );
};

export default TableTest;
