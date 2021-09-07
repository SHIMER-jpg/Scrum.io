import styles from "./Configuration.module.css";


export function configuration (){

    



    return (

        <select name="voting"  className={styles.select} onChange={() => handlechange()}>
            <option hidden>Voting system</option>
            <option >fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?)</option>
            <option >modefi fibonacci (0, 1/2, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?)</option>
            <option >T-shirts(xxs, xs, m, l, xl, xxl, ?)</option>
            <option >power of 2 (0, 1, 2, 4, 8, 16, 32, 64, ?)</option>
        </select>
    )
}