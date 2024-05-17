'use client';

import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import MeetingCard from './MeetingCard';
import { Calendar, Clipboard, PlusIcon, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MeetingModel from './MeetingModel';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from '@/components/ui/use-toast';
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';

const MeetingTypeList = () => {
	const { toast } = useToast();
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: '',
		link: '',
	});
	const [callDetails, setCallDetails] = useState<Call>();
	const [meetingState, setMeetingState] = useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
	>();

	const { user } = useUser();
	const client = useStreamVideoClient();
	const createMeeting = async () => {
		if (!client || !user) return;
		try {
			if (!values.dateTime) {
				toast({
					variant: 'destructive',
					title: 'Please select a date and time!',
				});

				return;
			}
			const id = crypto.randomUUID();

			const call = client.call('default', id);
			if (!call) throw new Error('Failed to create call!');

			const startsAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString();
			const description = values.description || 'Instant meeting';

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			});

			setCallDetails(call);
			if (!values.description) {
				router.push(`/meeting/${call.id}`);
			}
			toast({
				variant: 'success',
				title: 'Meeting Created Successfully!',
			});
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Failed to create meeting room',
			});
		}
	};
	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
	const router = useRouter();

	return (
		<section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
			<MeetingCard
				Icon={PlusIcon}
				title='New Meeting'
				description='Start an instant meeting'
				bgColor='bg-[#0079FF]'
				handleClick={() => setMeetingState('isInstantMeeting')}
			/>
			<MeetingCard
				Icon={Calendar}
				title='Schedule Meeting'
				description='Plan your meeting'
				bgColor='bg-[#007F73]'
				handleClick={() => setMeetingState('isScheduleMeeting')}
			/>
			<MeetingCard
				Icon={Video}
				title='View Recordings'
				description='Check out your recordings'
				bgColor='bg-[#FAA300]'
				handleClick={() => {
					router.push('/recordings');
				}}
			/>
			<MeetingCard
				Icon={PlusIcon}
				title='Join Meeting'
				description='Via invitation link'
				bgColor='bg-[#FF0060]'
				handleClick={() => setMeetingState('isJoiningMeeting')}
			/>

			{!callDetails ? (
				<MeetingModel
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title='Create Meeting'
					className='text-left px-4'
					buttonText={`Create Meeting`}
					handleClick={createMeeting}>
					<div className='flex flex-col gap-2.5 px-4'>
						<label className='text-base text-normal leading-5 font-semibold text-sky-100/90'>
							Add a Description
						</label>
						<Textarea
							className='bg-slate-900 border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
							onChange={(e) =>
								setValues({
									...values,
									description: e.target.value,
								})
							}
						/>
					</div>
					<div className='flex w-full flex-col gap-2.5 px-4'>
						<label className='text-base text-normal leading-5 font-semibold text-sky-100/90'>
							Select Date & Time
						</label>
						<ReactDatePicker
							className='outline-none focus:outline-none focus:border-none bg-slate-900 px-3 py-3 w-full rounded-md'
							selected={values.dateTime}
							onChange={(date) => setValues({ ...values, dateTime: date! })}
							showTimeSelect
							timeFormat='HH:mm'
							timeIntervals={15}
							timeCaption='Time'
							dateFormat={'MMMM d, yyyy h:mm aa'}
						/>
					</div>
				</MeetingModel>
			) : (
				<MeetingModel
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title='Meeting Created!'
					className='text-center'
					buttonText='Copy Meeting Link'
					image='/success.svg'
					Icon={Clipboard}
					handleClick={() => {
						navigator.clipboard.writeText(meetingLink);
						toast({ title: 'Link Copied!' });
					}}
				/>
			)}
			<MeetingModel
				isOpen={meetingState === 'isInstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Start an Instant Meeting'
				className='text-center'
				buttonText='Start Meeting'
				handleClick={createMeeting}
				Icon={Video}
			/>

			<MeetingModel
				isOpen={meetingState === 'isJoiningMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Paste the link here!'
				className='text-center'
				buttonText='Join Meeting'
				handleClick={() => router.push(values.link)}
				Icon={Video}>
				<Input
					type='text'
					onChange={(e)=> setValues({...values, link:e.target.value})}
					placeholder='Meeting link'
					className='px-2 py-6 max-w-[420px] mx-auto bg-slate-700 border-none placeholder:text-slate-200/70 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
				/>
			</MeetingModel>
		</section>
	);
};

export default MeetingTypeList;
