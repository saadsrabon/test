export const convertToQuery = (filterData) => {
    console.log('Received filterData:', filterData); // Log input

    const activityType = filterData?.activityType;
    const time = filterData?.time;
    const dayOfWeek = filterData?.dayOfWeek;
    const activityFor = filterData?.activityFor;
    const minAge = filterData?.minAge;
    const maxAge = filterData?.maxAge;
    const minBudget = filterData?.minBudget;
    const maxBudget = filterData?.maxBudget;
    const forField = filterData?.forField;
    const totalPeopleCanJoin = filterData?.numberOfPeople;


    // Constructing the query string conditionally
    const queryData = [
        minBudget && `minBudget=${minBudget}`,
        maxBudget && `maxBudget=${maxBudget}`,
        activityType && `activityType=${activityType}`,
        time && `time=${time}`,
        forField && `for=${forField}`,
        totalPeopleCanJoin && `totalPeopleCanJoin=${totalPeopleCanJoin}`,
        minAge && `minAge=${minAge}`,
        maxAge && `maxAge=${maxAge}`,
        dayOfWeek && `dayOfWeek=${dayOfWeek}`,
        activityFor && `activityFor=${activityFor}`
    ]
        .filter(Boolean) // Remove empty or undefined values
        .join('&');

    return queryData;
};
