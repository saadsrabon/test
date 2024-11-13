import MyCalendar from '@/components/Pages/MyCalendar/MyCalendar';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import Container from '@/components/shared/Container/Container';

const page = () => {
  return (
    <ProtectedPage role={['host', 'admin', 'user']}>
    <Container>
      <MyCalendar />
      </Container>
    </ProtectedPage>
  );
};

export default page;
