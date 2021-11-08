import React, { useState, useEffect } from "react";

import { ReactComponent as HomeLogo } from "../../assets/home-logo.svg";
import { ReactComponent as UserIcon } from "../../assets/user-icon.svg";
import { ReactComponent as DropDownIcon } from "../../assets/dropdown-icon.svg";
import { ReactComponent as MenuIcon } from "../../assets/menu-icon.svg";
import { ReactComponent as BackIcon } from "../../assets/back-icon.svg";
import { ReactComponent as ButtonArrow } from "../../assets/button-arrow.svg";
import DisplayImage from "../../assets/display-image.png";
import searchIcon from "../../assets/magnifier-icon.png";
import styles from "./Home.module.scss";

import MobileLeftMenuSlider from "@material-ui/core/Drawer";
import { IconButton } from "@material-ui/core";
import GalleryPopper from "../../features/GalleryPopper/GalleryPopper";

import api from "../../api/users";
import users from "../../api/users";

const Home = () => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  const retrieveUser = async () => {
    const response = await api.get("/users");
    return response.data;
  };

  const [userId, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUser();
      if (allUsers) setAllUsers(allUsers);
    };
    getAllUsers();
  }, []);

  const addMessage = async (user) => {
    console.log(user);
    const request = {
      ...user,
    };
    const response = await api.post("/users", request);
    /* console.log(response); */
    setAllUsers([users, response.data]);
  };

  const removeMessage = async (id) => {
    await api.delete(`/users/${id}`);
    console.log(users);
    const userArray = Object.keys(users);
    const newUserList = userArray.filter((user) => {
      return user.id !== id;
    });
    console.log(newUserList);
    setAllUsers(newUserList);
  };

  const editMessage = async (user) => {
    const response = await api.put(`/users/${user.id}`, user);
    const { id, text } = response.data;
    setAllUsers(
      users.map((user) => {
        return user.id === id ? { ...response } : user;
      })
    );
  };

  const [userHeader, setUserHeader] = useState([]);

  useEffect(() => {
    const storage = localStorage.getItem("login");
    const obj = JSON.parse(storage);
    setUserHeader(obj.userMail);
  }, []);

  const [selected, setSelected] = useState(null);

  const showImgModal = (e) => {
    setSelected(e.target.src);
  };

  const [searchValue, setSearchValue] = useState("");

  const filterNames = ({ name }) => {
    if (name !== undefined) {
      return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    } else {
      return null;
    }
  };

  const [info, setInfo] = useState([]);
  const reviewInformation = (information) => {
    const selectedImage = information;
    setInfo(selectedImage);
  };

  const sideList = (slider) => (
    <div className={styles["mobile-menu-content"]}>
      <div
        onClick={toggleSlider("left", false)}
        className={styles["mobile-backicon"]}
      >
        <BackIcon onClick={toggleSlider("left", false)} />
      </div>
      <div className={styles["image-gallery-container-mobile"]}>
        <div className={styles["image-gallery-text"]}>
          <p>Image Gallery</p>
        </div>
        <div className={styles["input-search"]}>
          <img
            src={searchIcon}
            className={styles["input-img"]}
            alt="search icon"
          />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="Search showcase..."
            className={styles["input-field-mobile"]}
          ></input>
          <div>
            {userId.filter(filterNames).map((img, index) => {
              return (
                <>
                  <div className={styles["images-cards-mobile"]} key={index}>
                    <div>
                      <img
                        src={img.img}
                        loading="lazy"
                        className={styles["images-mobile"]}
                        alt={img.name}
                      />
                    </div>
                    <div>
                      <p>{img.name}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      className={styles["review-button"]}
                      onClick={() =>
                        reviewInformation({ image: img.img, name: img.name })
                      }
                    >
                      REVIEW <ButtonArrow className={styles["button-arrow"]} />
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles["header-container"]}>
        <div className={styles["mobile-menu"]}>
          <MobileLeftMenuSlider
            anchor="left"
            open={state.left}
            onClose={toggleSlider("left", false)}
          >
            {sideList("left")}
          </MobileLeftMenuSlider>

          <IconButton onClick={toggleSlider("left", true)}>
            <MenuIcon />
          </IconButton>
        </div>
        <div className={styles["home-logo"]}>
          <HomeLogo />
        </div>
        <div className={styles["user-container"]}>
          <div>
            <UserIcon />
          </div>
          <div>{userHeader}</div>
          <div>
            <DropDownIcon />
          </div>
        </div>
      </div>

      <div className={styles["body-container"]}>
        <div className={styles["display-image-container"]}>
          <img
            src={info.image ? info.image : DisplayImage}
            className={styles["display-image"]}
            alt="display"
          />
          <p>{info.name}</p>
          <div className={styles["gallery-popper"]}>
            <GalleryPopper
              addMessage={addMessage}
              userId={userId}
              removeMessage={removeMessage}
              editMessage={editMessage}
            />
          </div>
        </div>

        <div className={styles["image-gallery-container"]}>
          <div>
            <p className={styles["image-gallery-text"]}>Image Gallery</p>
          </div>
          <div className={styles["input-search"]}>
            <img
              src={searchIcon}
              className={styles["input-img"]}
              alt="search icon"
            />
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder="Search showcase..."
              className={styles["input-field"]}
            ></input>
          </div>
          {userId.filter(filterNames).map((img, index) => (
            <>
              <div className={styles["images-cards"]} key={index}>
                <div>
                  <img
                    src={img.img}
                    loading="lazy"
                    className={styles["images"]}
                    alt={img.name}
                  />
                </div>
                <div>
                  <p>{img.name}</p>
                </div>
              </div>
              <div>
                <button
                  className={styles["review-button"]}
                  onClick={showImgModal}
                  onClick={() =>
                    reviewInformation({ image: img.img, name: img.name })
                  }
                >
                  REVIEW <ButtonArrow className={styles["button-arrow"]} />
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
