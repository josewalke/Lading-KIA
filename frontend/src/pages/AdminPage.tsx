import AdminLogin from '../components/AdminLogin';
import { DashboardWrapper } from '../components/DashboardWrapper';

const AdminPage: React.FC = () => {
  return (
    <DashboardWrapper>
      <AdminLogin />
    </DashboardWrapper>
  );
};

export default AdminPage;
