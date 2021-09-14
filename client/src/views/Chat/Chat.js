import { React, useEffect } from "react";
import { useSelector } from "react-redux";

export function Chat() {
  return (
    <div>
      <ul>
        <li>Hola soy ro envio un mensaje</li>
      </ul>
      <div>
        <form>
          <input />
          <button type="submit ">Send</button>
        </form>
      </div>
    </div>
  );
}
