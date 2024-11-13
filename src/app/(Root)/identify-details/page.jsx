import Information from '@/components/Pages/IdentifyDetails/Information';
import ProvideInformation from '@/components/Pages/IdentifyDetails/ProvideInformation';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';
import Container from '@/components/shared/Container/Container';

const page = () => {
  return (
    <ProtectedPage role={['host', 'admin', 'user']}>
    <Container>
      <div className='flex flex-col-reverse md:flex-row justify-around items-start my-10'>
      <ProvideInformation />
      <Information/>
      </div>
      </Container>
    </ProtectedPage>
  );
};

export default page;
