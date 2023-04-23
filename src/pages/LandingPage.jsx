import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import Image from '../Image.jsx';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getPlaces } from '../services/apiService.js';
import PlacePage from './PlacePage.jsx';
import { selectCity, selectType } from '../redux/features/auth/bookingSlice.js';
import { differenceInCalendarDays, format } from 'date-fns';


export default function LandingPage() {
  // const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({});
  const [showBooking, setShowBooking] = useState(false);
  const [showPlaceReady, setShowPlaceReady] = useState(false);
  const [showPlace, setShowPlace] = useState(false);

  const roomType = useSelector(selectType);
  const guestCity = useSelector(selectCity);

  //================{New Config}====================
  useEffect(() => {
    getAllPlaces();
  }, [places]);

  // const getAllPlaces = async () => {
  //   getPlaces(city, type).then((response) => {
  //     setPlaces(response);
  //   });
  // };

  const getAllPlaces = async () => {
    let type = roomType?.type;
    let city = guestCity?.city;
    getPlaces(city, type).then((response) => {
      setPlaces(response);
    });
  };

  const handleSubmit = () => {
    console.log('generatedPlace', newPlace);
    setShowBooking(true);
  };

  useEffect(() => {
    if (showPlaceReady === true) {
      setShowPlace(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  const handleSelect = () => {
    if (showBooking === true) {
      let id = newPlace._id;
      console.log('newPlaceId', id);
      // navigate(`/place/${id}`);
      setShowBooking(false);
      setShowPlaceReady(true);
    }
  };

  
  let lisbonTime = new Date().toLocaleString("en-Us",{timeZone:'Europe/Lisbon', timeStyle:"medium", hourCycle:"h24"}) // GMT reference
  let londonTime = new Date().toLocaleString("en-Us",{timeZone:'Europe/London', timeStyle:"medium", hourCycle:"h24"})  // London is 1 hour ahead of GMt in summer (From April)

  let russiaTime = new Date().toLocaleString("en-Us",{timeZone:"Europe/Moscow", timeStyle:"medium", hourCycle:"h24"})
  let dubaiTime = new Date().toLocaleString("en-Us",{timeZone:"Asia/Dubai", timeStyle:"medium", hourCycle:"h24"})
  let checkIn = "2023-04-01"

  

  return (
    <>
      {showPlace ? (
        <PlacePage place={newPlace} />
      ) : (
        <>
          {' '}
          { places.length < 1 ? (<div className='py-2 mt-8 mb-8 flex flex-row justify-center items-center'><div className='text-gray-900 text-base'>No {roomType?.type} is available in {guestCity?.city} at the moment</div></div>):(<div className="ml-8 mt-8 mb-8">
            <h1 className="text-4xl">
              {roomType?.type}'s in {guestCity?.city}
            </h1>
           
          </div>)}
          
          <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {places &&
              places?.map((place, index) => (
                <div
                  className="cursor-pointer"
                  key={index}
                  onClick={() => {
                    setNewPlace(place);
                    handleSubmit();
                  }}
                >
                  {/* <Link to={'/place/' + place._id} key={index}> */}
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {place.photos?.[0] && (
                      <Image
                        className="rounded-2xl object-cover aspect-square"
                        src={place.photos?.[0]}
                        alt=""
                      />
                    )}
                  </div>
                  {/* <h2 className="font-bold">{place.city}</h2> */}
                  <h2 className="font-bold">
                    {place.address}, {place.city}
                  </h2>
                  <h3 className="text-sm text-gray-500">{place.title}</h3>
                  <div className="mt-1">
                    <span className="font-bold">${place.price}</span> per night
                  </div>
                  {/* {showBooking === true ? ( */}
                  {showBooking && (
                    <div className="mt-4">
                      <button
                        className="cursor-pointer"
                        onClick={() => handleSelect()}
                      >
                        <span className="px-2 py-2 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-700">
                          Book
                        </span>
                      </button>
                    </div>
                  )}
                  {/* ) : null} */}
                </div>
              ))}
          </div>
        </>
      )}
      <>
        {/* <h2 className="text-xl text-gray-900">roomType: {roomType?.type}</h2>
        <h2 className="text-xl text-gray-900">guestCity: {guestCity?.city}</h2> */}
        <div className='flex flex-row justify-start items-start gap-1 object-contain'>
        <div className="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        {/* {format(new Date(checkOut), 'yyyy-MM-dd')} */}
        {format(new Date(checkIn), 'yyyy-MM-dd')}
      </div>
        </div>
        <h2 className="text-xl text-gray-900">Time in Portugal (GMT): {lisbonTime}</h2>
        <h2 className="text-xl text-gray-900">Time in London: {londonTime}</h2>
        <h2 className="text-xl text-gray-700">Time in Russia: {russiaTime}</h2>
        <h2 className="text-xl text-gray-500">Time in Dubai: {dubaiTime}</h2>
      </>
    </>
  );
}
