import { React, useState } from "react";

import { BsQuestionCircle } from 'react-icons/bs';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';

import styles from "./PopperHelp.module.css";

export default function PopperHelp({content}) {

  // estado y funciones para controlar el Popper
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopperOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-Popper' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopperOpen}
        onMouseLeave={handlePopperClose}
      >
        <BsQuestionCircle className={styles.help} size={20}/>
      </Typography>
      <Popper
        id="mouse-over-Popper"
        className={styles.popper}
        open={open}
        anchorEl={anchorEl}
        placement={"bottom-end"}
        disablePortal={true}
      >
        <p>{content}</p>
      </Popper>
    </div>
  )
}
