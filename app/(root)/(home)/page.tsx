

import MeetingTypeList from '@/components/MeetingTypeList';
import { currentUser } from '@clerk/nextjs';
const Home = async ()  => {
	const now = new Date();
	const date = now.toLocaleDateString('en-US', { dateStyle: 'full' });
	const time = now.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit'
	});

    const hour: string = new Date().getHours().toString();
	const user = await currentUser();

return (
	<section className=' flex size-full flex-col gap-8 text-white'>
		<div
			className={`${
				hour >= '21' ? 'bg-night' : hour > '12' ? 'bg-afternoon' : 'bg-day'
			} h-[303px] flex flex-col justify-between  items-start rounded-xl w-full px-10 py-9`}>
			<div className='flex justify-between size-full flex-row-reverse '>
				<div className='z-10 relative flex justify-end flex-col'>
					<h1 className='greet text-white text-6xl font-bold font-anek-devanagari'>
						{hour >= '21'
							? 'Good Night'
							: hour > '12'
							? ' Good Afternoon'
							: ' Good Day'}
					</h1>
					<p className='text-4xl capitalize font-semibold font-anek-devanagari text-right mt-3 text-slate-100'>
						{user?.firstName + ' ' + user?.lastName}
					</p>
				</div>

				<div className=' z-10 relative flex justify-end flex-col'>
					<p className='text-[#ECF0FF] bg-slate-950/40 px-4 py-2  rounded-lg text-base mb-20'>
						Upcoming Meeting is at: 12:30 PM
					</p>
					<p className='timezone text-[#ECF0FF] text-[65px] leading-[72px] font-extrabold pb-3'>
						{time}
					</p>
					<p className=' text-[#ECF0FF] text-2xl leading-[30px] font-medium'>
						{date}
					</p>
				</div>
			</div>
		</div>

		<MeetingTypeList />
	</section>
);
};

export default Home;
