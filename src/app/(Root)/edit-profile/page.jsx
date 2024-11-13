import EditInformation from '@/components/Pages/EditProfile/EditInformation';
import EditProfile from '@/components/Pages/EditProfile/EditProfile';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import Container from '@/components/shared/Container/Container';

const page = () => {
  return (
    <ProtectedPage role={['host', 'admin', 'user']}>
    <Container>
      <div className="flex flex-col items-center justify-around md:flex-row">
        <EditProfile />
        {/* <EditInformation /> */}
      </div>
      </Container>
    </ProtectedPage>
  );
};

export default page;
