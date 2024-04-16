import React from 'react';

const Home = () => {
	const now = new Date();
	const date = now.toLocaleDateString('en-US', {dateStyle: 'full'});	
	const time = now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12: false});

	function displayAMPM(time: string): string {
		const hour = parseInt(time.split(':')[0]);
	
		if (hour >= 12) {
			return 'PM';
		} else {
			return 'AM';
		}
	}
	
	const timenew = `${time}`; // Example time
	const ampm = displayAMPM(timenew);
	return (
		<section className=' flex size-full flex-col gap-10 text-white'>
			<div className='h-[303px] flex flex-col justify-between items-start banner w-full px-10 py-9'>
			<div className=''>
		<p className='text-[#ECF0FF] text-base'>Upcoming Meeting at: 12:30 PM</p>
			</div>
			<div className=''>
				<p className='timezone text-[#ECF0FF] text-7xl leading-[72px] font-extrabold pb-3' >{time} <span>{ampm}</span></p>
				<p className=' text-[#ECF0FF] text-2xl leading-[30px] font-medium'>{date}</p>
			</div>
			

			</div>
		</section>
	);
};

export default Home;
