import { motion, useReducedMotion } from "framer-motion";

export default function FadeIn({ children, delay = 0, y = 40, duration = 0.7 }) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}