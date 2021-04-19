import { AnimatePresence, motion } from "framer-motion";
import classes from "./Carousel.module.css";
import { useCarousel } from "./useCarousel";

const images = [
  "https://wallpaperaccess.com/full/1115179.jpg",
  "https://wallpaperaccess.com/full/1666777.jpg",
  "https://1.bp.blogspot.com/-pfnT6hpcDj8/XzqYQTNRs0I/AAAAAAAAHcM/iY5CGNb-qpwqSl7XDFAXuqFtMRaDtQ6KgCPcBGAsYHg/s700/Black%2BPanther%2BWallpaper%2B2880x1800_22.jpg",
  "https://4.bp.blogspot.com/-uwSlczkhepw/XMmyWB42tLI/AAAAAAAACGI/QQU-_q3fCeECeLIl4KS4vPx9Dl5NOts2wCKgBGAs/w1920-h1080-c/doctor-strange-uhdpaper.com-4K-211.jpg"
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0
    };
  }
};

export default function Carousel() {
  const {
    next,
    previous,
    index,
    direction,
    hasLeftSlide,
    hasRightSlide
  } = useCarousel({
    images,
    options: { autoSlide: false }
  });

  return (
    <div className={classes.carouselContainer}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 200, damping: 40 },
            opacity: { duration: 0.5 }
          }}
          alt=""
        />
      </AnimatePresence>
      <motion.button
        id="left-control"
        onClick={previous}
        disabled={!hasLeftSlide}
        whileHover={{ filter: "invert(1.0)", scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={classes.previous}
      >
        {"<"}
      </motion.button>
      <motion.button
        id="right-control"
        onClick={next}
        disabled={!hasRightSlide}
        whileHover={{ filter: "invert(1.0)", scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={classes.next}
      >
        {">"}
      </motion.button>
    </div>
  );
}
