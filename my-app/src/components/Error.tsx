import { useRouteError } from "react-router-dom";

const ErrorComponent = () => {
  const err = useRouteError() as { status: number; statusText: string };
  console.log(err.status, err.statusText);
  console.log(err);
  return (
    <div>
      <h1>oops! something went wrong</h1>
      <p>{err.status + " : " + err.statusText}</p>
    </div>
  );
};

export default ErrorComponent;
