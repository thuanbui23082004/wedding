import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import musicFile from '../assets/wedding-music.mp3';
import styles from './MusicPlayer.module.css';

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasInitializedTime = useRef(false);
  const hasInteractedRef = useRef(false);

  // Helper to remove interaction listeners globally
  const removeInteractionListeners = () => {
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
    document.removeEventListener('scroll', handleFirstInteraction);
  };

  const handleFirstInteraction = () => {
    if (hasInteractedRef.current) return;
    hasInteractedRef.current = true;
    removeInteractionListeners();

    if (audioRef.current) {
      if (!hasInitializedTime.current) {
        audioRef.current.currentTime = 60; // Start at 60s
        hasInitializedTime.current = true;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Auto-play blocked by browser:", err);
        // Reset interaction ref if blocked so user can click manual play button
        hasInteractedRef.current = false;
        setIsPlaying(false);
      });
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to document

    // If user clicks the button, clear global auto-play listeners immediately
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      removeInteractionListeners();
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!hasInitializedTime.current) {
        audioRef.current.currentTime = 60;
        hasInitializedTime.current = true;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Play failed:", err);
      });
    }
  };

  useEffect(() => {
    // Attempt automatic playback immediately on component mount
    if (audioRef.current) {
      audioRef.current.currentTime = 60;
      hasInitializedTime.current = true;
      audioRef.current.play().then(() => {
        // Autoplay succeeded
        setIsPlaying(true);
        hasInteractedRef.current = true;
      }).catch(() => {
        // Autoplay blocked. Fallback to interaction listeners.
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
        document.addEventListener('scroll', handleFirstInteraction, { passive: true });
      });
    }

    return () => {
      removeInteractionListeners();
    };
  }, []);

  return (
    <div className={styles.musicContainer}>
      <audio ref={audioRef} src={musicFile} loop />
      <button
        onClick={(e) => togglePlay(e)}
        className={`${styles.musicButton} ${isPlaying ? styles.isPlaying : ''}`}
        aria-label="Toggle Wedding Music"
      >
        {isPlaying ? (
          <Volume2 size={24} className={styles.icon} />
        ) : (
          <VolumeX size={24} className={styles.icon} />
        )}

        {/* Soft ripple visual effect when playing */}
        {isPlaying && (
          <>
            <span className={styles.ripple}></span>
            <span className={`${styles.ripple} ${styles.ripple2}`}></span>
          </>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
