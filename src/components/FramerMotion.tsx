import { motion, MotionStyle } from "framer-motion";
import React from "react";

const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -0, y: 20 },
};
const FramerMotion = ({
    children,
    style,
}: {
    children: React.ReactNode;
    style: MotionStyle | undefined;
}) => {
    return (
        <motion.article
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, type: "easeInOut" }}
            style={style}
        >
            {children}
        </motion.article>
    );
};
export default FramerMotion;