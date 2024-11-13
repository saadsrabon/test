import { useState, useImperativeHandle, forwardRef } from 'react';

const SelectTypes = forwardRef(({ onActivitySelect, onDistanceSelect, onTimeSelect, onDaySelect, onActivityForSelect, onNumberOfPeopleSelect }, ref) => {
    const [active, setActive] = useState(0);
    const [allTimes, setTimes] = useState(0);
    const [distance, setDistance] = useState(0);
    const [allDays, setDays] = useState(0);
    const [forActivities, setForActivities] = useState(0);
    const [numbers, setNumbers] = useState(0);

    const activityType = [
        { title: 'Select all', value: '' },
        { title: 'Indoor', value: 'Indoor' },
        { title: 'Outdoor', value: 'Outdoor' },
    ];

    const times = [
        { title: 'Select all', value: '' },
        { title: 'Morning', value: 'Morning' },
        { title: 'Afternoon', value: 'Afternoon' },
        { title: 'Night', value: 'Night' },
    ];

    const days = [
        { title: 'Select all' },
        { title: 'Sunday' },
        { title: 'Monday' },
        { title: 'Tuesday' },
        { title: 'Wednesday' },
        { title: 'Thursday' },
        { title: 'Friday' },
        { title: 'Saturday' },
    ];

    const activitiesFor = [
        { title: 'Select all' },
        { title: 'Me' },
        { title: 'Singles' },
        { title: 'Couples' },
        { title: 'Families' },
        { title: 'Babies/Infants' },
        { title: 'For Kids' },
        { title: 'Adults' },
        { title: 'Men' },
        { title: 'Women' },
        { title: 'Elderly' },
    ];

    const numberOfPeople = [
        { title: 'Select all' },
        { title: 'Less than 5' },
        { title: '5 to 10' },
        { title: '10 to 20' },
        { title: '20 to 30' },
        { title: 'More than 30' },
    ];
    const howClose = [
        { title: "Select all"},
        { title: 'Up to 3 km' },
        { title: 'Up to 6 km' },
        { title: 'Up to 10 km' },
        { title: 'Up to 20 km' },
        { title: 'Up to 30 km' },
        { title: 'More than 30 km' },
    ];

    const handleActivity = (id) => {
        setActive(id);
        onActivitySelect(activityType[id].value);
    };

    const handleTimes = (index) => {
        setTimes(index);
        onTimeSelect(times[index].value);
    };

    const handleDistance = (ind) => {
        setDistance(ind);
        onDistanceSelect(ind);
    };

    const handleDays = (ind) => {
        setDays(ind);
        onDaySelect(ind);
    };
    const handleForActivities = (ind) => {
        setForActivities(ind);
        onActivityForSelect(ind);
    };

    const handleNumberOfPeople = (ind) => {
        setNumbers(ind);
        onNumberOfPeopleSelect(ind);
    };

    useImperativeHandle(ref, () => ({
        resetSelections: () => {
            setActive(0);
            setTimes(0);
            setDays(0);
            onActivitySelect(activityType[0].title);
            onTimeSelect(times[0].title);
            onDaySelect(0);
            onActivityForSelect(0)
            onNumberOfPeopleSelect(0)
        },
    }));

    return (
        <div className="">
            {/* Activity Type */}
            <div className="mt-2">
                <h2 className="text-sm font-semibold text-start">Type of activity</h2>
                <div className="grid grid-cols-3 mt-1 place-items-start">
                    {activityType.map((activity, index) => (
                        <button
                            key={index}
                            onClick={() => handleActivity(index)}
                            className={`px-2 py-0.5 w-full border-[0.01px] border-gray-800 font-semibold cursor-pointer capitalize flex justify-start items-center gap-2 text-xs md:text-sm ${index === active ? "py-0.5 bg-gray-800 text-white text-default" : ""}`}>
                            <span className='md:hidden'>{index === 0 ? activity.title.split(' ').slice(1).join(' ') : activity.title}</span> <span className='hidden md:block'>{activity.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            {/* Days */}
            <div className="mt-2">
                <h2 className="text-sm font-semibold text-start">How close to you</h2>
                <div className="flex flex-wrap mt-1 border-gray-800 place-items-start">
                    {howClose.map((distances, index) => (
                        <button
                            key={index}
                            onClick={() => handleDistance(index)}
                            className={`px-2 py-0.5 mb-2 text-center border-[0.01px] border-gray-800 font-semibold cursor-pointer capitalize flex justify-start items-center gap-2 text-xs md:text-sm ${index === distance ? "py-0.5 bg-gray-800 text-white text-default" : ""}`}>
                            <span className=''>{distances.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            {/* Days */}
            <div className="mt-2">
                <h2 className="text-sm font-semibold text-start">Activity Days</h2>
                <div className="grid grid-cols-4 mt-1 border-gray-800 place-items-start">
                    {days.map((day, index) => (
                        <button
                            key={index}
                            onClick={() => handleDays(index)}
                            className={`px-2 py-0.5 mb-2 text-center w-full border-[0.01px] border-gray-800 font-semibold cursor-pointer capitalize flex justify-start items-center gap-2 text-xs md:text-sm ${index === allDays ? "py-0.5 bg-gray-800 text-white text-default" : ""}`}>
                            <span className='md:hidden'> {index === 0 ? day.title.split(' ').slice(1).join(' ') : day.title.substring(0, 3)}</span> <span className='hidden md:block'>{day.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            {/* Times */}
            <div className="mt-2">
                <h2 className="text-sm font-semibold text-start">Activity Times</h2>
                <div className="grid grid-cols-4 mt-1 border-y-[0.1px] border-gray-800 place-items-center place-content-center">
                    {times.map((time, index) => (
                        <button
                            key={index}
                            onClick={() => handleTimes(index)}
                            className={`pl-1 md:px-2 text-center py-0.5 w-full border-[0.01px] border-gray-800 border-y-0 font-semibold cursor-pointer capitalize flex justify-start items-center gap-2 text-xs md:text-sm ${index === allTimes ? "py-0.5 bg-gray-800 text-white text-default" : ""}`}>
                            <span className='md:hidden'>{index === 0 ? time.title.split(' ').slice(1).join(' ') : time.title}</span><span className='hidden md:block'>{time.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-2">
                <h2 className="text-sm font-semibold text-start">Activities design for</h2>
                <div className="grid grid-cols-4 mt-1 border-gray-800 place-items-start">
                    {activitiesFor.map((activityFor, index) => (
                        <button
                            key={index}
                            onClick={() => handleForActivities(index)}
                            className={`px-2 py-0.5 mb-2 text-center w-full border-[0.01px] border-gray-800 font-semibold cursor-pointer capitalize flex justify-start items-center gap-2 text-xs md:text-sm ${index === forActivities ? "py-0.5 bg-gray-800 text-white text-default" : ""}`}>
                            <span className='text-xs'>{activityFor.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-2">
                <h2 className="text-sm font-semibold text-start">Number of people in the activity</h2>
                <div className="grid grid-cols-4 mt-1 border-gray-800 place-items-start">
                    {numberOfPeople.map((number, index) => (
                        <button
                            key={index}
                            onClick={() => handleNumberOfPeople(index)}
                            className={`px-2 py-0.5 mb-2 text-center w-full border-[0.01px] border-gray-800 font-semibold cursor-pointer capitalize flex justify-start items-center gap-2 text-xs md:text-sm ${index === numbers ? "py-0.5 bg-gray-800 text-white text-default" : ""}`}>
                            <span className='text-xs'>{number.title}</span>
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
});

// Set the display name for the component
SelectTypes.displayName = 'SelectTypes';

export default SelectTypes;
