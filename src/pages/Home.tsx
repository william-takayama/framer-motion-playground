import { motion } from "framer-motion";
import React from "react";

export default function Home() {
  return (
    <motion.div
      className="defaultStyle"
      animate={{ scale: 2 }}
      transition={{ duration: 1 }}
    >
      <p>Entry</p>
    </motion.div>
  );
}
