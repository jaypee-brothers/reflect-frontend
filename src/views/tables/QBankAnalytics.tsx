import { QBankAnalyticsTable } from 'src/components/tables/QBankAnalyticsTable';

const QBankAnalytics = () => {
  return (
    <>
      {/* Ensure QBankAnalyticsTable does not show any id column or id value to the user */}
      <QBankAnalyticsTable />
    </>
  );
};

export default QBankAnalytics;
