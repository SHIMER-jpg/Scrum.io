/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import React from "react";

const JitsiMeet = () => {
  const { projectId } = useRouteMatch().params;
  const name = useSelector((state) => state.app.loggedUser.name);
  const jitsiContainerId = "jitsi-container-id";
  const [jitsi, setJitsi] = React.useState({});

  const loadJitsiScript = () => {
    let resolveLoadJitsiScriptPromise = null;

    const loadJitsiScriptPromise = new Promise((resolve) => {
      resolveLoadJitsiScriptPromise = resolve;
    });

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = resolveLoadJitsiScriptPromise;
    document.body.appendChild(script);

    return loadJitsiScriptPromise;
  };

  const initializeJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si", {
      parentNode: document.getElementById(jitsiContainerId),
      roomName: `scrum.io-meeting-${projectId}`,
      configOverwrite: { startWithAudioMuted: true, startWithVideoMuted: true },
      userInfo: { displayName: name },
    });
    setJitsi(_jitsi);
  };

  React.useEffect(() => {
    initializeJitsi();

    return () => jitsi?.dispose?.();
  }, []);

  return (
    <div id={jitsiContainerId} style={{ height: "auto", width: "100%" }} />
  );
};

export default JitsiMeet;
