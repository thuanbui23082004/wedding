import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

interface HeroProps {
  data: any;
}

const HeroSection: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className={styles.heroSection}>
      {/* Background Image */}
      <div
        className={styles.heroBg}
        style={{
          backgroundImage: `url(${data.images.cover})`
        }}
      />

      {/* Light gradient overlay for text readability */}
      <div className={styles.heroOverlay} />

      {/* Top Names */}
      <div className={styles.heroTop}>
        <motion.h1
          className={`${styles.heroTitle} font-cursive`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {data.couple.bride} & {data.couple.groom}
        </motion.h1>
      </div>

      {/* Bottom Invitation Box */}
      <div className={styles.heroBottom}>
        <motion.div
          className={styles.heroBox}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
        >
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Thư mời tiệc cưới
          </motion.p>
          <motion.p
            className={styles.heroTime}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
          >
            {data.events.party.time}
          </motion.p>
          <motion.p
            className={styles.heroDate}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            {data.events.party.dateFull}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
