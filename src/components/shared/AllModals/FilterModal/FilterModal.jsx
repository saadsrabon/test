import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { BsSliders } from 'react-icons/bs';
import SelectTypes from './SelectTypes';
import { DynamicSlider } from '../DynamicSlider';
import { Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setFilter } from '@/store/features/filterSlice';
import { convertToQuery } from '@/lib/filterToQuery';
import CustomRangeSlider from './CustomRangeSlider';
import { useActivityQuery } from '@/store/activity/activity';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@radix-ui/react-select';
import { getLocalData } from '@/lib/auth/token';
import { getCountryFromCoords } from '@/lib/GetDistance';

const FilterModal = ({ children, openModal, setOpenModal }) => {
  // const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const selectTypesRef = useRef(null);

  // Component state for various filter options
  const [ageGroup, setAgeGroup] = useState([1, 100]);
  const [activityType, setActivityType] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [priceRange, setPriceRange] = useState(
    location == 'Colombia' ? [10000, 1000000] : [1, 10000]
  );
  const [activityFor, setActivityFor] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');

  // Handle selections
  const handleActivitySelect = (selectedActivity) =>
    setActivityType(selectedActivity);
  const handleDistanceSelect = (selectedDistance) =>
    setDistance(selectedDistance);
  const handleTimeSelect = (selectedTime) => setTime(selectedTime);
  const handleDaySelect = (selectedDay) => setDayOfWeek(selectedDay);
  const handleActivityForSelect = (selectedActivityFor) =>
    setActivityFor(selectedActivityFor);
  const handleNumberOfPeopleSelect = (selectedNumberOfPeople) =>
    setNumberOfPeople(selectedNumberOfPeople);

  const query = useSelector((state) => state.filter.query);

  const { data: { data: activity } = [], isLoading } = useActivityQuery(query);
  useEffect(() => {
    const getCountry = async () => {
      const data = getLocalData('location');
      console.log(data);
      if (!data) {
        return;
      }
      const CountryName = await getCountryFromCoords(data?.lat, data?.lng);
      setLocation(CountryName);
    };
    getCountry();
  }, []);
  const handleFilter = () => {
    const filterData = {
      activityType,
      time,
      dayOfWeek,
      minAge: ageGroup?.length && ageGroup[0],
      maxAge: ageGroup?.length && ageGroup[1],
      minBudget: priceRange?.length && priceRange[0],
      maxBudget: priceRange?.length && priceRange[1],
      activityFor,
      numberOfPeople,
    };

    const query = convertToQuery(filterData);

    dispatch(setFilter(query));

    setOpenModal(false);
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
    // setOpenModal(false);
    setAgeGroup([0, 100]);
    setActivityType('');
    setTime('');
    setDayOfWeek('');
    setPriceRange(location == 'Colombia' ? [10000, 1000000] : [1, 10000]);

    if (selectTypesRef.current) {
      selectTypesRef.current.resetSelections();
    }
  };

  useEffect(() => {
    const filterData = {
      activityType,
      time,
      dayOfWeek,
      minAge: ageGroup?.length && ageGroup[0],
      maxAge: ageGroup?.length && ageGroup[1],
      minBudget: priceRange?.length && priceRange[0],
      maxBudget: priceRange?.length && priceRange[1] < 1000000 && priceRange[1],
      activityFor,
      numberOfPeople,
    };

    const query = convertToQuery(filterData);

    dispatch(setFilter(query));

    return () => {};
  }, [
    activityType,
    time,
    dayOfWeek,
    ageGroup,
    priceRange,
    activityFor,
    numberOfPeople,
    dispatch,
  ]);

  return (
    <div>
      {/* Filter button */}

      {/* <div
                onClick={() => setOpenModal(true)}
                className="hidden px-6 py-2 bg-white border rounded-lg cursor-pointer md:block border-slate-300 hover:bg-white"
            >
                <div className="flex items-center gap-5">
                    <BsSliders className="text-[#091540] text-[26px]" />
                    <span>Filters</span>
                </div>
            </div> */}

      {children}

      {/* Filter modal */}
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-50 text-black flex items-center justify-center ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 h-full w-full bg-black/50 duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute w-full rounded-2xl z-[999999999999999] bg-white sm:w-[500px] max-h-[70vh] md:max-h-[80vh] overflow-auto ${openModal ? 'opacity-1 translate-y-0 duration-300' : '-translate-y-20 opacity-0 duration-150'}`}
        >
          {/* Filter form */}
          <div className="px-5 pt-3 pb-5 lg:pb-10 lg:pt-5 lg:px-10">
            <div className="flex justify-start gap-x-28">
              <div className="cursor-pointer">
                <IoCloseOutline
                  onClick={() => setOpenModal(false)}
                  className="text-2xl "
                />
              </div>
              <h1 className="ml-10 text-lg font-bold ">Filter</h1>
            </div>
            <div className="w-full my-3">
              <hr />
            </div>
            <div className="">
              {/* Age Group Filter */}

              {/* Activity, Time, and Day Selectors */}
              <SelectTypes
                ref={selectTypesRef}
                onActivitySelect={handleActivitySelect}
                onDistanceSelect={handleDistanceSelect}
                onTimeSelect={handleTimeSelect}
                onDaySelect={handleDaySelect}
                onActivityForSelect={handleActivityForSelect}
                onNumberOfPeopleSelect={handleNumberOfPeopleSelect}
              />

              <div className="">
                <h1 className="text-base font-semibold text-start">
                  Age group
                </h1>

                <CustomRangeSlider
                  values={ageGroup}
                  setValues={setAgeGroup}
                  min={1}
                  max={100}
                />

                <div className="flex items-center justify-between gap-3 mt-3 md:gap-8">
                  <Input
                    className="text-center"
                    value={ageGroup?.length && ageGroup[0]}
                    onInput={(e) =>
                      setAgeGroup((prev) => [
                        parseInt(e.target.value) || 1,
                        prev[1],
                      ])
                    }
                    max={99}
                    type="number"
                    placeholder="Min $10"
                  />
                  <Minus className="text-muted-foreground size-10" />
                  <Input
                    className="text-center"
                    value={ageGroup?.length && ageGroup[1]}
                    onInput={(e) =>
                      setAgeGroup((prev) => [
                        prev[0],
                        parseInt(e.target.value) || 100,
                      ])
                    }
                    max={100}
                    type="number"
                    placeholder="Max $200"
                  />
                </div>
                {/* <DynamicSlider
                                    sliderValue={ageGroup}
                                    setSliderValue={setAgeGroup}
                                    min={1} max={100}s
                                /> */}
              </div>
              {/* Price Range Filter */}
              {location == 'Colombia' ? (
                <div className="">
                  <h1 className="text-base font-semibold text-start">
                    Price range
                  </h1>
                  <CustomRangeSlider
                    values={priceRange}
                    setValues={setPriceRange}
                    min={10000}
                    max={1000000}
                  />

                  <div className="flex items-center justify-between gap-3 mt-3 md:gap-8">
                    {/* Input for Minimum Price */}
                    <Input
                      className="text-center"
                      value={`COP $ ${priceRange?.length && priceRange[0]}`}

                      onInput={(e) => {
                        const value = parseInt(e.target.value);
                        setPriceRange((prev) => [
                          // Ensure the minimum price is between 10,000 and 1,000,000
                          value >= 10000 && value <= 1000000 ? value : prev[0],
                          prev[1], // Keep the maximum price the same
                        ]);
                      }}
                      min={10000}
                      max={1000000}
                      type="text"
                      placeholder="Min $10,000"
                    />
                    <Minus className="text-muted-foreground size-10" />
                    {/* Input for Maximum Price */}
                    <Input
                      className="text-center"
                      value={`COP $ ${priceRange?.length && priceRange[1]}`}
                      onInput={(e) => {
                        const value = parseInt(e.target.value);
                        setPriceRange((prev) => [
                          prev[0], // Keep the minimum price the same
                          // Ensure the maximum price is between 10,000 and 1,000,000
                          value >= 10000 && value <= 1000000 ? value : prev[1],
                        ]);
                      }}
                      min={10000}
                      max={1000000}
                      type="text"
                      placeholder="Max $1,000,000"
                    />
                  </div>
                </div>
              ) : (
                <div className="">
                  <h1 className="text-base font-semibold text-start">
                    Price range
                  </h1>
                  <CustomRangeSlider
                    values={priceRange}
                    setValues={setPriceRange}
                    min={1}
                    max={10000}
                  />

                  <div className="flex items-center justify-between gap-3 mt-3 md:gap-8">
                    <Input
                      className="text-center"
                      value={`EUR $ ${priceRange?.length && priceRange[0]}`}
                      onInput={(e) =>
                        setPriceRange((prev) => [
                          parseInt(e.target.value) < 10000                                     
                          
                            ? parseInt(e.target.value)
                            : 10000 || 1,
                          prev[1],
                        ])
                      }
                      max={10000}
                      type="text"
                      // placeholder="Min $10"
                    />
                    <Minus className="text-muted-foreground size-10" />
                    <Input
                      className="text-center"
                      value={`EUR $ ${priceRange?.length && priceRange[1]}`}
                      onInput={(e) =>
                        setPriceRange((prev) => [
                          prev[0],
                          parseInt(e.target.value) < 10000
                            ? parseInt(e.target.value)
                            : 10000 || 1,
                        ])
                      }
                      min={1}
                      max={10000}
                      type="text"
                      // placeholder="Max $200"
                    />
                  </div>
                </div>
              )}

              <div className="mt-3 mb-5 flex gap-2 items-center">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Only show activities that require profile competition
                </label>
              </div>
            </div>
            {/* Filter buttons */}
            <div className="flex items-center justify-between mt-3">
              <Button
                onClick={handleClearFilter}
                className="text-base font-bold bg-transparent rounded-none text-foreground hover:text-gray-700 hover:shadow-lg hover:bg-transparent"
              >
                Clear All
              </Button>
              <Button
                onClick={handleFilter}
                className="relative py-2.5 bg-gray-800 text-white hover:bg-gray-700 rounded-none"
              >
                Show {activity?.length} activities
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
