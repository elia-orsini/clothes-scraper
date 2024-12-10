import { useEffect, useState } from "react";

const Spinner: React.FC = () => {
  const [spinnerChar, setSpinnerChar] = useState("|"); // Current spinner character

  useEffect(() => {
    const spinnerChars = ["|", "/", "-", "\\"];
    let index = 0;

    const interval = setInterval(() => {
      setSpinnerChar(spinnerChars[index]);
      index = (index + 1) % spinnerChars.length;
    }, 150);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return <span className="mr-1">{spinnerChar}</span>;
};

export default Spinner;
