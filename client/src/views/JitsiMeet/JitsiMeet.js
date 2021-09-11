import Jitsi from "react-jitsi";
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
      configOverwrite: { startWithAudioMuted: true },
      userInfo: { displayName: name },
    });
    setJitsi(_jitsi);
  };

  React.useEffect(() => {
    initializeJitsi();

    return () => jitsi?.dispose?.();
  }, []);

  return (
    <div id={jitsiContainerId} style={{ height: "100vh", width: "100%" }} />
  );
  //   return (
  //     <div id={jitsiContainerId} style={{ height: "100vh", width: "100%" }}>
  //       {/* <iframe
  //         src="https://meet.jit.si/scrum.io-meeting-613d0e571760dd4d189cef26"
  //         style={{ height: "100vh", width: "100%" }}
  //       ></iframe> */}
  //     </div>
  //   );
};

export default JitsiMeet;

// return (
//     //     <div className={styles.meetingContainer}>
//     //       {/* <h1>QUE ONDA VIEJA</h1> */}
//     //       {/* <Jitsi roomName={`scrum.io-meeting-${projectId}`} displayName={name} /> */}
//     //     </div>
