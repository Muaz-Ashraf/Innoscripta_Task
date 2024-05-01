import React from "react";
import { motion } from "framer-motion";

const Animation = ({ children }) => {
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
