import React from 'react';

const Home = () => {
  const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase();
  const formattedDate = () => {
    const d = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
  };


  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[220px] rounded py-2 text-center text-base font-normal'>
            No Upcoming Meetings
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {formattedTime}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {formattedDate()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
