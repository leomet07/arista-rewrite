
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "var(--color-primary-200)",
		"--on-success": "255 255 255",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #496FCF 
		"--color-primary-50": "228 233 248", // #e4e9f8
		"--color-primary-100": "219 226 245", // #dbe2f5
		"--color-primary-200": "210 219 243", // #d2dbf3
		"--color-primary-300": "182 197 236", // #b6c5ec
		"--color-primary-400": "128 154 221", // #809add
		"--color-primary-500": "73 111 207", // #496FCF
		"--color-primary-600": "66 100 186", // #4264ba
		"--color-primary-700": "55 83 155", // #37539b
		"--color-primary-800": "44 67 124", // #2c437c
		"--color-primary-900": "36 54 101", // #243665
		// secondary | #6AE7AF 
		"--color-secondary-50": "233 251 243", // #e9fbf3
		"--color-secondary-100": "225 250 239", // #e1faef
		"--color-secondary-200": "218 249 235", // #daf9eb
		"--color-secondary-300": "195 245 223", // #c3f5df
		"--color-secondary-400": "151 238 199", // #97eec7
		"--color-secondary-500": "106 231 175", // #6AE7AF
		"--color-secondary-600": "95 208 158", // #5fd09e
		"--color-secondary-700": "80 173 131", // #50ad83
		"--color-secondary-800": "64 139 105", // #408b69
		"--color-secondary-900": "52 113 86", // #347156
		// tertiary | #460872 
		"--color-tertiary-50": "227 218 234", // #e3daea
		"--color-tertiary-100": "218 206 227", // #dacee3
		"--color-tertiary-200": "209 193 220", // #d1c1dc
		"--color-tertiary-300": "181 156 199", // #b59cc7
		"--color-tertiary-400": "126 82 156", // #7e529c
		"--color-tertiary-500": "70 8 114", // #460872
		"--color-tertiary-600": "63 7 103", // #3f0767
		"--color-tertiary-700": "53 6 86", // #350656
		"--color-tertiary-800": "42 5 68", // #2a0544
		"--color-tertiary-900": "34 4 56", // #220438
		// success | #3506A3 
		"--color-success-50": "225 218 241", // #e1daf1
		"--color-success-100": "215 205 237", // #d7cded
		"--color-success-200": "205 193 232", // #cdc1e8
		"--color-success-300": "174 155 218", // #ae9bda
		"--color-success-400": "114 81 191", // #7251bf
		"--color-success-500": "53 6 163", // #3506A3
		"--color-success-600": "48 5 147", // #300593
		"--color-success-700": "40 5 122", // #28057a
		"--color-success-800": "32 4 98", // #200462
		"--color-success-900": "26 3 80", // #1a0350
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #D41976 
		"--color-error-50": "249 221 234", // #f9ddea
		"--color-error-100": "246 209 228", // #f6d1e4
		"--color-error-200": "244 198 221", // #f4c6dd
		"--color-error-300": "238 163 200", // #eea3c8
		"--color-error-400": "225 94 159", // #e15e9f
		"--color-error-500": "212 25 118", // #D41976
		"--color-error-600": "191 23 106", // #bf176a
		"--color-error-700": "159 19 89", // #9f1359
		"--color-error-800": "127 15 71", // #7f0f47
		"--color-error-900": "104 12 58", // #680c3a
		// surface | #496FCF 
		"--color-surface-50": "228 233 248", // #e4e9f8
		"--color-surface-100": "219 226 245", // #dbe2f5
		"--color-surface-200": "210 219 243", // #d2dbf3
		"--color-surface-300": "182 197 236", // #b6c5ec
		"--color-surface-400": "128 154 221", // #809add
		"--color-surface-500": "73 111 207", // #496FCF
		"--color-surface-600": "66 100 186", // #4264ba
		"--color-surface-700": "55 83 155", // #37539b
		"--color-surface-800": "44 67 124", // #2c437c
		"--color-surface-900": "36 54 101", // #243665
		
	}
}