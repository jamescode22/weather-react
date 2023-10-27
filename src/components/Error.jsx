import react from "react";

const Error = (props) => {
  const { error } = props;
  return <div className="error-overlay">{error}</div>;
};

export default Error;
