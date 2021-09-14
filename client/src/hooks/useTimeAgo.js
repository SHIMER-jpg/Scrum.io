/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

/* Cantidad de segundos que hay en un dia, hora, minuto, segundo */
const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  // Diferencia de tiempo desde publicado y hasta ahora, dividido por 1000 para quitar los milisegundos
  const elapsed = (timestamp - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.floor(elapsed / secondsInUnit);

      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp, style = "long") {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp));

  useEffect(() => {
    // Cada 5 segs va a actualizar el timestamp de los segundos, hasta que hayan pasado mas de 60s.
    if (timeAgo.unit === "second") {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp);
        setTimeAgo(newTimeAgo);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [timestamp]);

  // Lucero: en vez de sar en-US también se puede usar `navigator.language` para que saque automaticamente el idioma del navegador.
  const rtf = new Intl.RelativeTimeFormat("en", {
    // style short:  hace 11 min || hace  10 h
    // style long: hace 11 minutos || hace 10 horas
    style: style,
  });

  const { value, unit } = timeAgo;

  return rtf.format(value, unit);
}
