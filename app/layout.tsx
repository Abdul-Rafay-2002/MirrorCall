import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';	

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Mirror Call - Video Calling App',
	description: 'Video Calling App Created By Abdul Rafay',
	// icons: {
	// 	icon: ''
	// }
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				layout: {
					socialButtonsPlacement: 'top',
					socialButtonsVariant: 'auto',
				},
				variables: {
					colorText: '#ffff',
					colorPrimary: '#eeee',
					colorBackground: '#0f172a',
					colorInputBackground: '#1f2937',
					colorInputText: '#fff',
				},
				elements: {
					formButtonPrimary: 'bg-dark-2 hover:bg-dark-2/90 text-sm normal-case',
					headerTitle: `text-3xl font-bold text-center mb-2`,
					headerSubtitle: `text-base text-center`,
				},
			}}>
			<html lang='en'>
				<body className={`${inter.className} bg-dark-2`}>
					{children} <Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
