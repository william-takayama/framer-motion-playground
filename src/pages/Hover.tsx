import { motion } from "framer-motion";

export default function Hover() {
  return (
    <div>
      <motion.div
        className="defaultStyle"
        whileHover={{
          scale: [1, 1.5, 2, 1.5, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["1rem", "3rem", "50%", "3rem", "1rem"]
        }}
        transition={{ duration: 1 }}
      >
        <p>Hover</p>
      </motion.div>
    </div>
  );
}
