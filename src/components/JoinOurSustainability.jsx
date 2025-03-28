import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./JoinOurSustainability.module.css";
import axios from "axios";

const JoinOurSustainability = ({ videos, data }) => {
  const [selectedVideo, setSelectedVideo] = useState();
  const [videoTitle, setVideoTitle] = useState("");

  // Filter out videos with invalid links
  const validVideos = videos.filter(video => video.value && video.value.trim() !== "");

  useEffect(() => {
    if (selectedVideo) {
      const videoId = extractVideoId(selectedVideo.value);
      if (videoId) {
        fetchVideoTitle(videoId).then((title) => {
          if (title) {
            setVideoTitle(title);
          } else {
            setVideoTitle("Title not available");
          }
        });
      } else {
        setVideoTitle("Invalid YouTube URL");
      }
    }
  }, [selectedVideo]);

  const extractVideoId = (link) => {
    const match = link.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const fetchVideoTitle = async (videoId) => {
    try {
      const response = await axios.get(
        `https://www.youtube.com/watch?v=${videoId}`
      );
      const html = response.data;
      const titleMatch = html.match(/<title.*?>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : "Video Title Not Found";
      return title;
    } catch (error) {
      console.error("Error fetching video title:", error);
      return "Video Title Not Found";
    }
  };

  const openPopup = (video) => {
    setSelectedVideo(video);
  };

  const closePopup = () => {
    setSelectedVideo(null);
  };

  return (
    <section className={styles.joinOurSustainability}>
      <div className={styles.recipesParent}>
        <b className={styles.recipes} style={{ margin: "5px", color: data.headingcolor }}>
          Know more
        </b>
        <br />
        <br />
        <div className={styles.frameGroupRecipes}>
          {validVideos.map((v, index) => (
            <div key={index} className={styles.frameHowToMake} onClick={() => openPopup(v)}>
              <iframe
                src={`https://www.youtube.com/embed/${extractVideoId(v.value)}`}
                className={styles.frameHowToMakeChild}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="video"
              />
              <div className={styles.howToMake}>{videoTitle}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <Modal
          isOpen={!!selectedVideo}
          onRequestClose={closePopup}
          contentLabel="Video Modal"
          className={styles.popup}
          overlayClassName={styles.overlay}
        >
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={closePopup}>
              <span>&times;</span>
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${extractVideoId(selectedVideo.value)}`}
              className={styles.popupVideo}
              allow="autoplay; encrypted-media"
              title="video"
            />
            <div className={styles.howToMake} style={{ color: "white", margin: "5px", fontFamily: "Arial, Helvetica, sans-serif" }}>
              {videoTitle}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default JoinOurSustainability;
