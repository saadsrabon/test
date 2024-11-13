import Container from '@/components/shared/Container/Container';

const ClassRules = ({data}) => {

  const {rules,whoShouldntAttend
  } = data

  return (
    <Container>
      <div className="space-y-10">
        <div className="space-y-5">
          <h1 className="font-bold ">Terms and Conditions of this specific activity</h1>
          <p className="text-sm">
            {rules}
          </p>
        </div>
        <div className="space-y-5">
          <h1 className="font-bold ">Who should not attend this activity</h1>
          <p className="text-sm">
          {whoShouldntAttend}
          </p>
        </div>
      </div>
      <div className="my-10">
        <hr />
      </div>
    </Container>
  );
};

export default ClassRules;
