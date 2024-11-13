'use client';

import useAuth from '@/components/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProtectedPage = ({ children, role }) => {
  const isAuthenticated = useAuth();
  const userRole = Cookies.get('role');
  const { toast } = useToast()

  const router = useRouter();
  //   console.log('nice');

  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log('accessToken', accessToken);
  if (!isAuthenticated) {
    if(!role.includes(userRole)) {
      toast({
        title: 'You are not authorized',
      })
      if (role.length === 1 && role[0] === 'host') {
        router.push('/become-host')
      }
    }
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    router.push('/');
  }

  return children;
};

export default ProtectedPage;
