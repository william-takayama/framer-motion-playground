import {
  AnimatePresence,
  AnimationProps,
  motion,
  Variant
} from "framer-motion";
import React, { useCallback, useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

interface Props {
  onClick: () => void;
  isOpen?: boolean;
}

const links = [
  { redirect: "/", text: "Home", color: "#FF008C" },
  { redirect: "/hover", text: "Hover", color: "#D309E1" },
  { redirect: "/open", text: "Open", color: "#9C1AFF" },
  { redirect: "/carousel", text: "Carousel", color: "#7700FF" }
];

function Toggle({ onClick, isOpen }: Props) {
  return (
    <div className={classes.button} onClick={onClick}>
      <AnimatePresence initial={false} custom={isOpen} exitBeforeEnter={true}>
        <motion.div
          key={String(isOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={16} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Items({ onClick }: Props) {
  return (
    <ol>
      {links.map((item) => (
        <Link key={item.redirect} to={item.redirect}>
          <motion.li
            onClick={onClick}
            whileHover={{ scale: 1.1, filter: "hue()" }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: item.color }}
          >
            <p>{item.text}</p>
          </motion.li>
        </Link>
      ))}
    </ol>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    close: { opacity: 0, x: "-100%" }
  };

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <header className={classes.header}>
      <Toggle onClick={toggle} isOpen={isOpen} />
      <motion.nav animate={isOpen ? "open" : "close"} variants={variants}>
        <Items onClick={toggle} />
      </motion.nav>
    </header>
  );
}
