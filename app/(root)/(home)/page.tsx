import MeetingTypeList from '@/components/MeetingTypeList';
const Home = () => {
	const now = new Date();
	const date = now.toLocaleDateString('en-US', { dateStyle: 'full' });
	const time = now.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit'
	});

	return (
		<section className=' flex size-full flex-col gap-8 text-white'>
			<div className='h-[303px] flex flex-col justify-between items-start rounded-xl bg-gray-950 w-full px-10 py-9'>
				<div className=''>
					<p className='text-[#ECF0FF] bg-slate-600/40 px-4 py-2  rounded-lg text-base'>
						Upcoming Meeting at: 12:30 PM
					</p>
				</div>
				<div className=''>
					<p className='timezone text-[#ECF0FF] text-[65px] leading-[72px] font-extrabold pb-3'>
						{time}
					</p>
					<p className=' text-[#ECF0FF] text-2xl leading-[30px] font-medium'>
						{date}
					</p>
				</div>
			</div>

			<MeetingTypeList/>
		</section>
	);
};

export default Home;
