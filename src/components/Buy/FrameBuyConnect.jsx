// import { useState, useEffect, useRef } from 'react';

//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================
//======================================={OLD BLOCK ENDS}===============================================
// OnRamper

const FrameBuyConnect = () => {
  //   const onRamperAPI_Key =
  // 'pk_test_miOd0G5h_VAfO1tKbq6m1PrKyQQK1gNHU2R41GpwAj00';

  // console.log(onRamperAPI_Key)

  // themes
  // bluey
  // dark
  // light

  const color = {
    original: '266677',
    primary: '130D1A',
    // container: '150d1b',
    // container: '150222',
    // container: '151222',
    // container: '1b1222',
    // container: '1b1223',
    container: '1b1225',
    primaryFill: '2B2132',
    secondary: 'DCA4FD',
    primaryText: 'FFFFFF',
    secondaryText: '9D9DA3',
    infoText: 'B27CFF',
    violet: '2e1065',
  };

  //   primaryFill: 'rgba(19, 13, 26, 0.64)',
  //   {
  //     background: #130d1a;
  //     opacity: 0.6;
  // }

  console.log(color);
  return (
    <div className="flex flex-col justify-center items-center gap-2 mb-8">
      <div className="border border-secondaryFillLight bg-primaryFill shadow-lg mb-8">
        {/* Title:Select a Token */}
        <div>
          <iframe
            src={`https://buy.onramper.com/?themeName=dark&containerColor=${color.container}&primaryColor=46de8c&secondaryColor=${color.primaryFill}&cardColor=${color.primary}&primaryTextColor=ffffff&secondaryTextColor=ffffff&borderRadius=0.5&wgBorderRadius=1`}
            // src={`https://buy.onramper.com/?themeName=light&containerColor=${color.primary}&primaryColor=46de8c&secondaryColor=${color.primaryFill}&cardColor=${color.primary}&primaryTextColor=ffffff&secondaryTextColor=ffffff&borderRadius=0.5&wgBorderRadius=1`}
            // src={`https://buy.onramper.com/?themeName=dark&containerColor=141416&primaryColor=46de8c&secondaryColor=3f3f43&cardColor=272727&primaryTextColor=ffffff&secondaryTextColor=ffffff&borderRadius=0.5&wgBorderRadius=1`}
            // src="https://buy.onramper.com/?themeName=light&containerColor=ffffff&primaryColor=241d1c&secondaryColor=ffffff&cardColor=f6f7f9&primaryTextColor=141519&secondaryTextColor=6b6f80&borderRadius=0.5&wgBorderRadius=1"
            // src="https://buy.onramper.com/?themeName=light&containerColor=ffffff&primaryColor=241d1c&secondaryColor=ffffff&cardColor=f6f7f9&primaryTextColor=141519&secondaryTextColor=6b6f80&borderRadius=0.5&wgBorderRadius=1"
            title="Onramper Widget"
            height="700px"
            width="450px"
            allow="accelerometer; autoplay; camera; gyroscope; payment"
          />
        </div>
      </div>
    </div>
  );
};

export default FrameBuyConnect;
