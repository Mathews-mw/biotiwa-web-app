'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

type FadeInProps = HTMLMotionProps<'div'> & {
	delay?: number;
	distance?: number;
};

export function FadeIn({ children, delay = 0, distance = 28, ...props }: FadeInProps) {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			initial={{
				opacity: 0,
				y: shouldReduceMotion ? 0 : distance,
			}}
			whileInView={{
				opacity: 1,
				y: 0,
			}}
			viewport={{
				once: true,
				amount: 0.2,
			}}
			transition={{
				duration: shouldReduceMotion ? 0.25 : 0.75,
				delay,
				ease: [0.22, 1, 0.36, 1],
			}}
			{...props}
		>
			{children}
		</motion.div>
	);
}
