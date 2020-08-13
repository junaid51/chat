import React, { useState, useEffect } from "react";
import { Spinner as S, ProgressBar as P } from "react-bootstrap";

const Spinner = () => {
  return (
    <S animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </S>
  );
};

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 200);
    return () => {
      clearInterval(t);
    };
  }, []);

  return <P now={progress} />;
};

export { Spinner, ProgressBar };
