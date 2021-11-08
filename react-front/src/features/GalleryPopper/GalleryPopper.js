import React, { useState } from "react";

import Popper from "@material-ui/core/Popper";
import { ReactComponent as ChatButton } from "../../assets/Contact.svg";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import { ReactComponent as SendButton } from "../../assets/send-button.svg";
import deleteButton from "../../assets/delete-button.png";
import editButton from "../../assets/edit-button.png";
import styles from "./GalleryPopper.module.scss";
import classNames from "classnames";

const GalleryPopper = ({ addMessage, userId, removeMessage, editMessage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const closeMenu = () => setOpen(!open);

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const [state, setState] = useState({
    text: "",
  });

  const add = (e) => {
    e.preventDefault();

    const { text, value } = e.target;
    setState({
      ...state,
      [text]: value,
    });
    addMessage(state);

    setTimeout(window.location.reload(), 700);
  };

  const deleteMessage = (id) => {
    removeMessage(id);
    setTimeout(window.location.reload(), 700);
  };

  const updateMessage = (e) => {
    e.preventDefault();
  };

  const filterText = ({ text }) => {
    if (text !== undefined) {
      return text;
    } else {
      return null;
    }
  };

  const renderUserData = userId.filter(filterText).map((userData) => {
    const { text, id } = userData;
    /* console.log({ id }); */

    return (
      <div className={styles["chat-text-container"]}>
        <p className={styles["chat-text"]}>{text}</p>
        <div className={styles["hidden"]}>
          <div className={styles["hidden-buttons-flex"]}>
            <div>
              <img
                src={editButton}
                alt="edit button"
                className={styles["hidden-buttons"]}
              />
            </div>
            <div onClick={() => deleteMessage(id)}>
              <img
                src={deleteButton}
                alt="delete button"
                className={styles["hidden-buttons"]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        <div>
          <div className={styles["chat-header"]}>
            <div onClick={closeMenu} className={styles["chat-header-title"]}>
              <div>
                <ArrowLeft />
              </div>
              <div>Nice circle</div>
            </div>
            <div className={styles["chat-content"]}>
              <p>The content of the Popper.</p>
              <div className={styles["chat-flex"]}>
                <div className={styles["chat-width"]}>{renderUserData}</div>
              </div>
              <div>
                <form onSubmit={add} className={styles["form"]}>
                  <input
                    type="text"
                    text="text"
                    placeholder="LEAVE COMMENT"
                    value={state.text}
                    onChange={(e) => setState({ text: e.target.value })}
                    className={styles["input-comment"]}
                  ></input>
                  <div className={styles["send-button"]}>
                    <SendButton />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Popper>
      <div onClick={handleClick("top-start")}>
        <ChatButton
          className={classNames("button-margin", {
            [styles["close-chat-logo"]]: open,
          })}
        />
        <img
          src={deleteButton}
          alt="chat close button"
          className={classNames("close-button", {
            [styles["shown-close-logo"]]: !open,
          })}
        />
      </div>
    </>
  );
};

export default GalleryPopper;
