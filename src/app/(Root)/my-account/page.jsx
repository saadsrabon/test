import MyAccount from '@/components/Pages/MyProfile/MyAccount';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import Container from '@/components/shared/Container/Container';

const page = () => {
  return (
    <ProtectedPage role={['host', 'admin', 'user']}>
    <Container>
      <MyAccount />
      </Container>
    </ProtectedPage>
  );
};

export default page;
