import React from "react";

function Error({ msg }: { msg: string }) {
  return <p>An error occured. Error: {msg}</p>;
}

export default Error;
