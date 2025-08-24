/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// 游戏主题色彩
				game: {
					success: "#10b981", // 绿色 - 收益
					warning: "#f59e0b", // 黄色 - 风险
					danger: "#ef4444",  // 红色 - 损失
					info: "#3b82f6",   // 蓝色 - 信息
					gold: "#fbbf24",   // 金色 - 黄金
					silver: "#9ca3af", // 银色 - 稳定币
					crypto: "#8b5cf6", // 紫色 - 加密
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"card-flip": {
					"0%": { transform: "rotateY(0deg)" },
					"100%": { transform: "rotateY(180deg)" },
				},
				"bounce-gentle": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" },
				},
				"pulse-glow": {
					"0%, 100%": { 
						boxShadow: "0 0 5px currentColor",
						opacity: "1"
					},
					"50%": { 
						boxShadow: "0 0 20px currentColor",
						opacity: "0.7"
					},
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"card-flip": "card-flip 0.6s ease-in-out",
				"bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
				"pulse-glow": "pulse-glow 2s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
