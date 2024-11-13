import React from 'react';
import Container from '@/components/shared/Container/Container';
import BecomeHostForm from '@/components/Pages/BecomeHost/BecomeHostForm';
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage';

const BecomeHost = () => {
    return (
        <ProtectedPage role={['user']}>
        <Container>
            <BecomeHostForm/>
            </Container>
        </ProtectedPage>
    );
};

export default BecomeHost;