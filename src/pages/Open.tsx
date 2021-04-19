import { motion } from "framer-motion";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

export default function Open() {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: {
      width: "90%",
      backgroundColor: "rgb(255,255,255)",
      color: "rgb(0,0,0)",
      transform: "scale(3)"
    },
    closed: { width: "20%", transform: "scale(1)" }
  };

  return (
    <main>
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1
        }}
        className="defaultStyle"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiX
          style={{ position: "absolute", left: "0.25rem", top: "0.35rem" }}
          size={12}
        />
        <p>Open</p>
      </motion.div>
    </main>
  );
}
