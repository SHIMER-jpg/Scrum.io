/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Chat } from "../../views/Chat/Chat";
import { BsChatDots } from "react-icons/bs";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  const { loggedUser, socket } = useSelector(({ app }) => app);
  const role = useSelector((state) => state.viewRouter.userRole);
  const history = useHistory();

  const [buttonOpen, setButtonOpen] = useState(false);

  console.log(role);

  useEffect(() => {
    if (socket.on && loggedUser) {
      socket.on("newTaskAssigned", ({ userId, projectId }) => {
        if (loggedUser._id === userId) {
          toast.info("You have a new task assigned.", {
            position: "bottom-right",
            autoClose: 3000,
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

  return (
    <>
      <Header />
      <main style={{ display: "flex", minHeight: "calc(100vh - 70px)" }}>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
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
            <button onClick={() => setButtonOpen(!buttonOpen)}>
              <BsChatDots size={30} />
            </button>
          )}
        </div>
      </main>
      <div>
        {buttonOpen && (
          <Chat buttonOpen={buttonOpen} setButtonOpen={setButtonOpen} />
        )}{" "}
      </div>
      {/* <div>{userRole && <Chat />}</div> */}
    </>
  );
};

export default Layout;
