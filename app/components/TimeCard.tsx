"use client";

import { motion } from "framer-motion";

export default function TimeCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 w-24 text-center">
        <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold"
      >
        {value}
      </motion.div>

      <div className="text-sm text-gray-300 mt-2">{label}</div>
    </div>
  );
}