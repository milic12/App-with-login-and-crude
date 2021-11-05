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

import axios from "axios";

const Home = () => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("https://www.breakingbadapi.com/api/characters").then((res) => {
      setImages(res.data);
      console.log(res.data);
    });
  }, []);

  const [selected, setSelected] = useState(null);

  const showImgModal = (e) => {
    setSelected(e.target.src);
    console.log(selected);
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
            placeholder="Search showcase..."
            className={styles["input-field-mobile"]}
          ></input>
        </div>
        {images.map((img, index) => (
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
                onClick={showImgModal}
              >
                REVIEW <ButtonArrow className={styles["button-arrow"]} />
              </button>
            </div>
          </>
        ))}
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
          <div>Name</div>
          <div>
            <DropDownIcon />
          </div>
        </div>
      </div>

      <div className={styles["body-container"]}>
        <div className={styles["display-image-container"]}>
          <img
            src={DisplayImage}
            className={styles["display-image"]}
            alt="display "
          />
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
              placeholder="Search showcase..."
              className={styles["input-field"]}
            ></input>
          </div>
          {images.map((img, index) => (
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
