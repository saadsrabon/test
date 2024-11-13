import Container from '@/components/shared/Container/Container';

const Address = ({ data }) => {

  return (
    <Container>
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="font-bold">Address</h1>
          <p className="text-sm ">{data?.fullAddress}</p>
        </div>
        <div className="space-y-3">
          <h1 className="font-bold">Address Note</h1>
          <p className="text-sm ">{data?.noteAboutLocation}</p>
        </div>
        <div className="space-y-3">
          <h1 className="font-bold">What should you bring?</h1>
          <p className="text-sm ">{data?.attendeesBring}</p>
        </div>
      </div>
    </Container>
  );
};

export default Address;
