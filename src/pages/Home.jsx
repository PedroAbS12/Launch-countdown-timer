import { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import DefaultLayout from "../layouts/DefaultLayout";

const TARGET_DATE = new Date("2026-12-31T23:59:59");

function getTimeRemaining(target) {
  const total = target - new Date();
  const totalInSec = Math.max(0, Math.floor(total / 1000));

  const seconds = totalInSec % 60;
  const minutes = Math.floor(totalInSec / 60) % 60;
  const hours = Math.floor(totalInSec / 3600) % 24;
  const days = Math.floor(totalInSec / 86400);

  return { totalInSec, days, hours, minutes, seconds };
}

function Home() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(TARGET_DATE));
  const [prevTime, setPrevTime] = useState(timeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getTimeRemaining(TARGET_DATE);
      setPrevTime(timeLeft);
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const format = (num) => num.toString().padStart(2, "0");

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center min-h-screen text-center gap-20">
        <Header title="WE'RE LAUNCHING SOON" />
        <div className="flex gap-6">
          <Card
            value={format(prevTime.days)}
            nextValue={format(timeLeft.days)}
            footer="Days"
            trigger={`days-${timeLeft.days}`}
          />
          <Card
            value={format(prevTime.hours)}
            nextValue={format(timeLeft.hours)}
            footer="Hours"
            trigger={`hours-${timeLeft.hours}`}
          />
          <Card
            value={format(prevTime.minutes)}
            nextValue={format(timeLeft.minutes)}
            footer="Minutes"
            trigger={`minutes-${timeLeft.minutes}`}
          />
          <Card
            value={format(prevTime.seconds)}
            nextValue={format(timeLeft.seconds)}
            footer="Seconds"
            trigger={`seconds-${timeLeft.seconds}`}
          />
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Home;
