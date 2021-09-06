/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRole, clearRole } from "../../redux/ViewRouter/actions";
import ManagerView from "../../views/ManagerView/ManagerView.js";
import DeveloperView from "../../views/DeveloperView/DeveloperView.js";
import Loading from "../Loading/Loading";

const ViewRouter = () => {
  const route = useRouteMatch();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.viewRouter.userRole);
  const loggedUser = useSelector((state) => state.app.loggedUser);

  const { projectId } = route.params;

  useEffect(() => {
    loggedUser._id && dispatch(getRole(loggedUser._id, projectId));
  }, [loggedUser]);

  return (
    <>
      {role ? (
        role === "scrumMaster" ? (
          <ManagerView projectId={projectId} />
        ) : (
          <DeveloperView projectId={projectId} />
        )
      ) : (
        <div
          style={{ display: "grid", placeItems: "center", margin: "0 auto" }}
        >
          <Loading />
        </div>
      )}
    </>
  );
};

export default ViewRouter;
