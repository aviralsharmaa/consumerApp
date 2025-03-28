// VideoModal.tsx
import React from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoLink: string;
  videoTitle: string;
}

Modal.setAppElement("#root"); // Set the root element for accessibility

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoLink, videoTitle }) => {
  const extractVideoId = (link: string) => {
    const match = link.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(videoLink);
  console.log(videoLink)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Video Modal"
    >
      {videoId ? (
        <>
          <YouTube
            videoId={videoId}
            opts={{ width: 560, height: 315, playerVars: { autoplay: 1 } }}
          />
          <div style={{color:"white"}}>{videoTitle}</div>
          <button onClick={onClose}>Close</button>
        </>
      ) : (
        <p>Invalid YouTube Video ID</p>
      )}
    </Modal>
  );
};

export default VideoModal;
