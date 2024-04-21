import { Metadata } from 'next';

import AppConfig from '@/static/app.config';

export const metadata: Metadata = {
	title: `Dashboard | ${AppConfig.name} `,
};

export default function AccLayout({ children }: any) {
	return children;
}