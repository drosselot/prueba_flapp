import { motion } from "motion/react";

const CustomButton = ({secondary, onClick, text, disabled, type}: CustomButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={disabled ? (()=>{}):(onClick)}
      className={"p-2 px-5 rounded-full shadow-md " + (secondary ? "bg-flapp-blue text-white shadow-flapp-blue/20" : "bg-white text-flapp-blue border") + (disabled ? " opacity-50" : " hover:shadow-xl")}
      whileHover={disabled ? undefined : ({
        scale: 1.03,
        transition: { duration: 0.05 },
      })}
      whileTap={{ scale: 0.95 }}
    >
      <p>{text}</p>
    </motion.button>
  )
}

type CustomButtonProps = {
  secondary?: boolean,
  onClick?: ()=>void,
  text: string,
  disabled?: boolean,
  type?: "submit" | "reset" | "button" | undefined,
}

export default CustomButton;