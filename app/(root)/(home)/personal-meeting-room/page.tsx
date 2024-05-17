'use client';
import { Button } from '@/components/ui/button';
import { toast, useToast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';

const Table = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<div className='flex flex-col items-start gap-2 xl:flex-row'>
		<h1 className='text-lg font-bold'>{title}:</h1>
		<h1 className='text-lg text-slate-300/90 truncate'>{description}</h1>
	</div>
);

const PersonalMeetingRoom = () => {
	const { user } = useUser();
	const client = useStreamVideoClient();
	const meetingId = user?.id;
	const { toast } = useToast();
	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
	const { call } = useGetCallById(meetingId!);
	const router = useRouter();

	const startRoom = async () => {
		if (!client || !user) return;

		if (!call) {
			const newCall = client.call('default', meetingId!);
			await newCall.getOrCreate({
				data: {
					starts_at: new Date().toISOString(),
				},
			});
		}

		router.push(`/meeting/${meetingId}?personal=true`);
	};

	return (
		<section className='flex size-full flex-col gap-10 text-white'>
			<h1 className='text-4xl font-bold font-sedan'>Personal Meeting Room</h1>

			<div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
				<Table title='Topic' description={`${user?.username}'s Meeting Room`} />
				<Table title='Meeting ID' description={meetingId!} />
				<Table title='Invite Link' description={meetingLink} />
			</div>
			<div className='flex gap-5'>
				<Button className='bg-blue-700 hover:bg-blue-800' onClick={startRoom}>
					Start Meeting
				</Button>
				<Button
					className='bg-slate-800 hover:bg-slate-900'
					onClick={() => {
						navigator.clipboard.writeText(meetingLink);
						toast({
							title: 'Link Copied',
						});
					}}>
					Copy Invitation
				</Button>
			</div>
		</section>
	);
};

export default PersonalMeetingRoom;
