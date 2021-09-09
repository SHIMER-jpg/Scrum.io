import { useDispatch, useSelector } from "react-redux";
import { change } from "../../redux/PokerPlanning/actions";
import styles from "./Configuration.module.css";

export function Configuration() {
  const dispatch = useDispatch();

  function handlechange(e) {
    dispatch(change(e.target.value));
  }

  const userRole = useSelector((state) => state.viewRouter.userRole);

  return (
    <div className={styles.conteiner}>
      <header className={styles.header}>
        <h1>User Configs</h1>
        {/* <button onClick={() => setIsModalOpen(true)}>
          <BsPlus size={20} /> Create project
        </button> */}
      </header>
      {userRole == "scrumMaster" && (
        <>
          <header className={styles.header}>
            <h1>Project Config</h1>
            {/* <button onClick={() => setIsModalOpen(true)}>
          <BsPlus size={20} /> Create project
        </button> */}
          </header>
          <select
            name="voting"
            className={styles.select}
            onChange={(e) => handlechange(e)}
          >
            <option hidden>Voting system</option>
            <option value="0,1,2,3,5,8,13,21,34,55,89,?">
              fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?)
            </option>
            <option value="0,1/2,1,2,3,5,8,13,20,40,100,?">
              modefi fibonacci (0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?)
            </option>
            <option value="xxs,xs,m,l,xl,xxl,?">
              T-shirts (xxs, xs, m, l, xl, xxl, ?)
            </option>
            <option value="0,1,2,4,8,16,32,64,?">
              power of 2 (0, 1, 2, 4, 8, 16, 32, 64, ?)
            </option>
          </select>
        </>
      )}
    </div>
  );
  // <h1>visualizacion de developer</h1>
}
