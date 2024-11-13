import HostProfile from '@/components/Pages/MyProfile/HostProfile';
import Reviews from '@/components/Pages/MyProfile/Reviews';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import Container from '@/components/shared/Container/Container';

const page = () => {
  return (
    <ProtectedPage role={['host', 'admin', 'user']}>
    <Container>
      <div className="flex  flex-col md:flex-row justify-around items-start gap-20">
        <HostProfile />
        <Reviews />
      </div>
      </Container>
    </ProtectedPage>
  );
};

export default page;
