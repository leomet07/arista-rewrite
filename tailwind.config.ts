import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			borderRadius: {
				'DEFAULT': '12px',
				'sm': '8px',
				'md': '12px',
				'lg': '16px',
				'xl': '20px',
				'2xl': '24px',
				'3xl': '32px',
			}
		},
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				preset: [
					{
						name: 'wintry'
					},
				],
			},
		}),
	],
} satisfies Config;
