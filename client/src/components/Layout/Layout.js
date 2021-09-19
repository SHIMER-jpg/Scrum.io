/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { getUnreadNotificationsByUser } from "../../redux/App/actions"

const Layout = ({ children }) => {
  const { loggedUser, socket } = useSelector(({ app }) => app);
  const dispatch = useDispatch();
  const history = useHistory();

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
              // history.push(`/project/${projectId}`);
              history.push({
                pathname: `/project/${projectId}`,
                state: { projectId }
              })
            },
          });
        }
      });
    }
  }, [loggedUser]);

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
      </main>
    </>
  );
};

export default Layout;
