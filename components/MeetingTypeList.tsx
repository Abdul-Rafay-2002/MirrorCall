'use client';

import React, { useState } from 'react';
import MeetingCard from './MeetingCard';
import { Calendar, PlusIcon, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import MeetingModel from './MeetingModel';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from '@/components/ui/use-toast';

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

			<MeetingModel
				isOpen={meetingState === 'isInstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='Start an Instant Meeting'
				className='text-center'
				buttonText='Start Meeting'
				handleClick={createMeeting}
				Icon={Video}
			/>
		</section>
	);
};

export default MeetingTypeList;
