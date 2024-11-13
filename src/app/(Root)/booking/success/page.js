import Success from '@/components/Pages/BookingStatus/Success'
import ProtectedPage from '@/components/Pages/protectedPage/ProtectedPage'
import React from 'react'

const page = () => {
    return (
        <ProtectedPage role={['host', 'admin', 'user']}>
            <Success />
        </ProtectedPage>
    )
}

export default page