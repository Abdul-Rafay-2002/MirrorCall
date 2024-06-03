import CallList from '@/components/CallList';
import MeetingTypeList from '@/components/MeetingTypeList';
import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';

const Home = async () => {
	const now = new Date();
	const date = now.toLocaleDateString('en-US', { dateStyle: 'full' });
	const time = now.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});

	const hour: string = new Date().getHours().toString();
	const user = await currentUser();

	return (
		<section className=' flex size-full flex-col gap-8 text-white'>
			<div
				className={`${
					hour >= '21' ? 'bg-night' : hour > '12' ? 'bg-afternoon' : 'bg-day'
				} h-[303px] flex flex-col justify-between  items-start rounded-xl w-full px-10 py-9`}>
				<div className='flex justify-between size-full sm:flex-row-reverse flex-col-reverse '>
					<div className='z-10 relative flex justify-end flex-col'>
						<h1 className='greet text-4xl  text-white md:text-4xl lg:text-5xl xl:text-6xl font-bold font-anek-devanagari'>
							{hour >= '21'
								? 'Good Night'
								: hour > '12'
								? ' Good Afternoon'
								: ' Good Day'}
						</h1>
						<p className='md:text-2xl lg:text-4xl capitalize font-semibold font-anek-devanagari sm:text-right mt-3 text-slate-100'>
							{user?.firstName + ' ' + user?.lastName}
						</p>
					</div>

					<div className=' z-10 relative flex justify-end flex-col'>
						<p className='timezone text-4xl text-[#ECF0FF] md:text-5xl  lg:text-[55px] xl:text-[65px] xl:leading-[72px] font-extrabold pb-3'>
							{time}
						</p>
						<p className=' text-[#ECF0FF] md:text-xl lg:text-2xl xl:leading-[30px] font-medium'>
							{date}
						</p>
					</div>
				</div>
			</div>

			<MeetingTypeList />
			<div className='flex items-end justify-between'>
				<h1 className='text-3xl lg:text-4xl  mt-10 mb-0 font-bold'>
					Todays Upcoming Meeting
				</h1>
				<Link
					href={'/upcoming'}
					className='hover:bg-slate-950 transition-colors bg-blue-700 px-4 py-2 rounded-full block  max-sm:hidden'>
					See more
				</Link>
			</div>
			{<CallList type='upcoming' />}
		</section>
	);
};

export default Home;
