"use client";

import TimeCard from "./TimeCard";
import { useState, useEffect } from "react";

export default function CountdownClock() {
  const [targetDate, setTargetDate] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 🔹 Default = tomorrow (midnight)
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const formatted = today.toISOString().split("T")[0];
    setTargetDate(formatted);
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    let interval: number; // ✅ browser-friendly

    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate + "T23:59:59").getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (interval) window.clearInterval(interval); // ✅ stop interval
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown(); // run immediately
    interval = window.setInterval(updateCountdown, 1000); // ✅ browser-safe

    return () => window.clearInterval(interval); // cleanup on unmount
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-8">Select A Date:</h1>

      {/* DATE PICKER */}
      <input
        type="date"
        value={targetDate}
        onChange={(e) => setTargetDate(e.target.value)}
        className="mb-8 px-4 py-2 rounded text-white bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Countdown Glass Container */}
      <div className="flex gap-6 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <TimeCard label="Days" value={timeLeft.days} />
        <TimeCard label="Hours" value={timeLeft.hours} />
        <TimeCard label="Minutes" value={timeLeft.minutes} />
        <TimeCard label="Seconds" value={timeLeft.seconds} />
      </div>

      {/* Time's up message */}
      {timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds === 0 && (
        <div className="text-xl font-bold text-green-400 mt-4">
          Time's up!
        </div>
      )}
    </div>
  );
}