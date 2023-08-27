import React from 'react'

const Background = () => {
  return (
      <div
      className="absolute w-[100vh] h-full z-0 opacity-40"
    >
       <div
      className="w-[188vh] h-full overflow-hidden"
      style={{
        position: 'relative',
      }}
    >
      <div
      className="absolute w-[188vh] h-screen r-[5px] animate-pulse-slower overflow-hidden no-scrollbar"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(228, 144, 18, 0.784), rgba(228, 144, 18, 0.784), rgb(181, 63, 81), rgb(123, 46, 150)`,
        }}
      ></div>
    </div>
    </div>
  )
}

export default Background;
