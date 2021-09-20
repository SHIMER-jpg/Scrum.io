/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Chat } from "../../views/Chat/Chat";
import { BsChatDots } from "react-icons/bs";
import styles from "./Layout.module.css";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { getUnreadNotificationsByUser } from "../../redux/App/actions"

const Layout = ({ children }) => {
  const { loggedUser, socket } = useSelector(({ app }) => app);
  const role = useSelector((state) => state.viewRouter.userRole);
  const dispatch = useDispatch();
  const history = useHistory();

  const [buttonOpen, setButtonOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (socket.on && loggedUser) {
      socket.on("newTaskAssigned", ({ userId, projectId }) => {
        if (loggedUser._id === userId) {
          dispatch(getUnreadNotificationsByUser(loggedUser._id))

          toast.info("You have a new task assigned.", {
            position: "bottom-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClick: () => {
              history.push(`/project/${projectId}`);
            },
          });
        }
      });
    }
  }, [loggedUser]);

  function toggleChat() {
    if (!buttonOpen) {
      setAlert(false);
    }
    setButtonOpen(!buttonOpen);
  }

  return (
    <>
      <Header />
      <main style={{ display: "flex", minHeight: "calc(100vh - 70px)" }}>
        <ToastContainer
          position="bottom-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          limit={3}
        />
        <Sidebar />
        {children}
        <div>
          {role && (
            <div className={styles.buttonMessage}>
              {alert ? (
                <div>
                  <button
                    className={styles.alertButton}
                    onClick={() => toggleChat()}
                  >
                    <div className={styles.dot}></div>
                    <BsChatDots size={30} />
                  </button>
                </div>
              ) : (
                <button className={styles.button} onClick={() => toggleChat()}>
                  <BsChatDots size={30} />
                </button>
              )}
            </div>
          )}
        </div>
        <div className={buttonOpen ? styles.show : styles.hidden}>
          {role && (
            <Chat
              setAlert={setAlert}
              buttonOpen={buttonOpen}
              setButtonOpen={setButtonOpen}
            />
          )}
        </div>
      </main>
      {/* <div>{userRole && <Chat />}</div> */}
    </>
  );
};

export default Layout;
