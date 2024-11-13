import PostYourActivity from "@/components/Pages/PostYourActivites/PostYourActivity";
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';


const page = () => {
    
  return (
    <div>
      <ProtectedPage role={['host']}>
        <PostYourActivity />
      </ProtectedPage>
    </div>
  );
};

export default page;
