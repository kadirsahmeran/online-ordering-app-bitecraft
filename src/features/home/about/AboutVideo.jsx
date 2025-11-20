import { PlayCircle } from "lucide-react";
import Button from "../../../ui/Button";
import { useState } from "react";
import VideoModal from "../../../ui/VideoModal";
// ----------------------------------------------------------------------------
// Component: AboutVideo
// Description: Creates the video area with a large background image on the About page. // When the user clicks the button, the VideoModal opens.
// -----------------------------------------------------------------------------

export default function AboutVideo() {
  // Manages video modal open/closed state
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <div
      className="relative w-full h-[600px] bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('aboutVideoImagejpg.jpg')",
      }}
    >
      {/* Dark overlay – to make the text and button more readable */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Main content (logo + button)*/}
      <div className="relative z-10 text-center">
        <img
          loading="lazy"
          className="w-full max-w-[800px] mx-auto mb-8 px-8"
          src="aboutExperienceImage.png"
          alt="Experience Bitecraft"
        />

        {/* Video Button */}
        <Button
          onClick={() => setIsVideoOpen(true)}
          className="flex items-center gap-3 mx-auto"
          animated={true}
          rounded="full"
        >
          <PlayCircle className="w-6 h-6" />
          Watch intro
        </Button>
      </div>
      {/* Video modal – opens when the button is clicked */}
      {isVideoOpen && (
        <VideoModal
          videoSrc="aboutVideo.mp4"
          onClose={() => setIsVideoOpen(false)}
        />
      )}
    </div>
  );
}
