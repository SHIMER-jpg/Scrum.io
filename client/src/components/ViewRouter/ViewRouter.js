import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRole } from "../../redux/ViewRouter/actions";
import ManagerView from "../../views/ManagerView/ManagerView.js";
import DeveloperView from "../../views/DeveloperView/DeveloperView.js";

const ViewRouter = () => {
  const route = useRouteMatch();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.viewRouter.userRole);
  const userId = useSelector((state) => state.app.loggedUser._id);
  const { projectId } = route.params;

  useEffect(() => {
    dispatch(getRole(userId, projectId));
  }, []);
  return (
    <>
      {role ? (
        role == "scrumMaster" ? (
          <ManagerView projectId={projectId} />
        ) : (
          <DeveloperView projectId={projectId} />
        )
      ) : (
        ""
      )}
    </>
  );
};

export default ViewRouter;
