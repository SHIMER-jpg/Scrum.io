/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRole, clearRole } from "../../redux/ViewRouter/actions";
import ManagerView from "../../views/ManagerView/ManagerView.js";
import DeveloperView from "../../views/DeveloperView/DeveloperView.js";

const ViewRouter = () => {
  const route = useRouteMatch();
  const dispatch = useDispatch();

  const role = useSelector((state) => state.viewRouter.userRole);
  const loggedUser = useSelector((state) => state.app.loggedUser);

  const { projectId } = route.params;

  useEffect(() => {
    dispatch(getRole(loggedUser._id, projectId));

    return function clerRole() {
      dispatch(clearRole());
    };
  }, [loggedUser]);

  return (
    <>
      {role &&
        (role === "scrumMaster" ? (
          <ManagerView projectId={projectId} />
        ) : (
          <DeveloperView projectId={projectId} />
        ))}
    </>
  );
};

export default ViewRouter;
