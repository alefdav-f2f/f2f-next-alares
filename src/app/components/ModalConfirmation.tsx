import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface ModalProps {
  buttons: React.ReactNode
  text: string
  fields: React.ReactNode
}

const ModalConfirmation: React.FC<ModalProps> = ({ buttons, text, fields }: ModalProps) => {
  return (
    <div className='flex items-center bg-gray-500 justify-center fixed top-0 left-0 w-screen h-screen z-50 bg-opacity-25'>
      <AnimatePresence mode="popLayout">
        <motion.div key="1" className="" initial={{ opacity: 0, marginTop: 20 }} animate={{ opacity: 1, marginTop: 0 }}>
          <div className='w-full min-h-[500px] sm:w-[500px] sm:min-h-[200px] rounded-md shadow-lg p-4 bg-white flex flex-col justify-between'>
            <div className='flex items-center justify-center'>
              <span className='font-bold'>{text}</span>
            </div>
            <div>
              { fields }
            </div>
            <div className='flex justify-end'>
              {buttons}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  )
}

export default ModalConfirmation;
