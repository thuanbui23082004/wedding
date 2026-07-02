import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import styles from './AlbumSection.module.css';

interface AlbumProps {
  data: any;
}

const AlbumSection: React.FC<AlbumProps> = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openLightbox = (src: string, index: number) => {
    setSelectedImage(src);
    setCurrentIndex(index);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % data.images.gallery.length;
    setSelectedImage(data.images.gallery[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + data.images.gallery.length) % data.images.gallery.length;
    setSelectedImage(data.images.gallery[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <section className="section-padding text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.headerDivider}>
          <h2 className={`${styles.sectionTitle} font-cursive`}>Album hình cưới</h2>
          <div className={styles.line}></div>
          <Heart size={12} color="#333" className={styles.heart} />
          <div className={styles.line}></div>
        </div>

        <div className={styles.albumGrid}>
          <div className={styles.columnLeft}>
            {data.images.gallery.map((src: string, i: number) => {
              if (i % 2 !== 0) return null;
              const delayIndex = Math.floor(i / 2);
              return (
                <motion.div 
                  key={`left-${i}`} 
                  className={styles.albumItem}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: delayIndex * 0.05 }}
                  onClick={() => openLightbox(src, i)}
                >
                  <img src={src} alt={`Wedding Gallery Left ${i + 1}`} loading="lazy" decoding="async" />
                </motion.div>
              );
            })}
          </div>
          
          <div className={styles.columnRight}>
            {data.images.gallery.map((src: string, i: number) => {
              if (i % 2 === 0) return null;
              const delayIndex = Math.floor(i / 2);
              return (
                <motion.div 
                  key={`right-${i}`} 
                  className={styles.albumItem}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: delayIndex * 0.05 }}
                  onClick={() => openLightbox(src, i)}
                >
                  <img src={src} alt={`Wedding Gallery Right ${i + 1}`} loading="lazy" decoding="async" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
              &times;
            </button>

            {/* Prev Button */}
            <button className={styles.prevBtn} onClick={showPrev}>
              &#10094;
            </button>

            {/* Main Image Container */}
            <motion.div 
              className={styles.imageContainer}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Wedding Preview" className={styles.lightboxImg} decoding="async" />
            </motion.div>

            {/* Next Button */}
            <button className={styles.nextBtn} onClick={showNext}>
              &#10095;
            </button>

            {/* Image Counter */}
            <div className={styles.counter}>
              {currentIndex + 1} / {data.images.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AlbumSection;
