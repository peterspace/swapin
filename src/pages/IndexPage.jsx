import { useState, useEffect } from 'react';
// import { getUser } from '../services/apiService';
// import { SetUserId } from '../redux/features/auth/authSlice.js';

// import { selectGuestNumber } from '../redux/features/auth/bookingSlice.js';
// import { useSelector, useDispatch } from 'react-redux';

// import { setOwnerId, selectOwnerId } from '../redux/features/auth/bookingSlice';

import FrameSwapConnect from '../components/Frame/FrameSwapConnect';
// import PageBackground from '../backgrounds/PageBackground';

//Note: alwways set fetched redux states after loggin in with a getUser api call and set states
export default function IndexPage() {
  // const dispatch = useDispatch();

  // const [userId, setUserId] = useState('');

  // const activeOwnerId = useSelector(selectOwnerId);
  // useEffect(() => {
  //   getUser().then((response) => {
  //     // setUser(response);
  //     setUserId(response?._id);
  //     dispatch(setOwnerId({ ownerId: response?._id }));
  //     dispatch(SetUserId({ userId: response?._id }));
  //     console.log('activeOwnerId:', activeOwnerId);
  //     console.log('userId:', userId);
  //   });
  // }, []);
  // const guestNumber = useSelector(selectGuestNumber)

  return (
    <div className="relative">
      <div className="fixed bg-primary w-screen h-screen z-0 overflow-scroll">
        <section className="opacity-60 filter blur-[180px]">
          <div className="absolute left-[720px] top-[197px] w-[501px] h-[340px]  bg-[#dca4fd]"></div>
          <div className="absolute left-[714px] top-[464px] w-[574px] h-[389px]  bg-[#6a40ae]"></div>
          <div className="absolute left-[439px] top-[464px] w-[501px] h-[340px]  bg-[#dca4fd]"></div>
          {/* <div className="absolute left-[352px] top-[464px] w-[574px] h-[389px]  bg-[#6a40ae]"></div> */}
          <div className="absolute left-[352px] top-[148px] w-[574px] h-[389px]  bg-[#6a40ae]"></div>
        </section>
        <section className="relative mt-10 md:mt-20">
          <div className="relative flex justify-center items-center mx-5 lg:mx-32">
            <FrameSwapConnect />
          </div>
        </section>
      </div>
    </div>
  );
}
