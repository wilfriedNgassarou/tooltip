import { AnimatePresence, motion } from "motion/react";
import { MouseEvent, useRef, useState } from "react"
import { users } from "./constants/users";
import { Credits } from "./components/credits";

function App() {
  const prevX = useRef(0);
  const currentX = useRef(1);

  function handleMouseMove(e: MouseEvent) {
    prevX.current = currentX.current ;
    currentX.current = e.clientX
  }

  const [activeIndex, setActiveIndex] = useState<null | number>(null)
  
  return (
    <section 
      onMouseMove={handleMouseMove}
      className="w-full h-dvh flex justify-center items-center bg-gray-100"
    >
      <Credits />
      {users.map((item, index) => (
        <motion.div
          key={`user-${index}`}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          initial={{ x: index * -16 }}
          animate={{ zIndex: activeIndex == index ? 50 : (index + 1) }}
          className="w-14 h-14 flex justify-center relative"
        >
          <img 
            className="w-full h-full rounded-full border-2 border-white"
            src={item.image} 
            alt="Avatar" 
          />
          <AnimatePresence>
            {
              activeIndex == index && (
                <motion.div 
                  key={`tooltip-${index}`}
                  initial={{ scale: .5, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    rotate: prevX.current > currentX.current ? -10 : 10 
                  }}
                  exit={{ scale: .5, opacity: 0 }}
                  transition={{ type: 'spring', duration: .7, bounce: .5 }}
                  className="absolute -top-[120%] py-3 px-4 flex flex-col gap-2 justify-center items-center bg-black text-white rounded-lg"
                >
                  <span className="leading-none text-nowrap font-medium">
                    {item.name}
                  </span>
                  <span className="leading-none text-nowrap text-xs font-light">
                    {item.jobTitle}
                  </span>
                </motion.div>
              )
            }

          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  )
}

export default App
