import React from "react";
// Button Component
interface AlgorithmButtonProps {
  algorithm: string;
  onClick: (algorithm: string) => void;
}

export const AlgorithmButton: React.FC<AlgorithmButtonProps> = ({
  algorithm,
  onClick,
}) => (
  <button className="btn btn-primary mr-2" onClick={() => onClick(algorithm)}>
    {algorithm}
  </button>
);
