import { useState, useEffect } from 'react';

import FrameBuyConnect from './FrameBuyConnect';

export default function BuyPage() {
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
            <FrameBuyConnect />
          </div>
        </section>
      </div>
    </div>
  );
}
