import EditInformation from '@/components/Pages/EditProfile/EditInformation';
import EditPersonalInfo from '@/components/Pages/EditProfile/EditPersonalInfo';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import Container from '@/components/shared/Container/Container';

const page = () => {
  return (
    <ProtectedPage role={['host', 'admin', 'user']}>
    <Container>
      <div className="flex flex-col md:flex-row justify-around items-start">
        <EditPersonalInfo />
        <EditInformation />
      </div>
      </Container>
    </ProtectedPage>
  );
};

export default page;
