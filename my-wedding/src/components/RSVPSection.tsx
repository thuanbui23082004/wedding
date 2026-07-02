import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './RSVPSection.module.css';
import traitim from '../assets/traitim.png';
import RSVPModal from './RSVPModal';

interface RSVPProps {
  data: any;
}

const RSVPSection: React.FC<RSVPProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles.rsvpSection}>
      {/* Background Image */}
      <div
        className={styles.rsvpBg}
        style={{
          backgroundImage: `url(${data.images.footerBg})`
        }}
      />

      {/* White gradient/overlay to fade the image as per design */}
      <div className={styles.rsvpOverlay} />

      <div className={styles.contentContainer}>
        <motion.p
          className={`${styles.thankYouCursive} font-cursive`}
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Thank You
        </motion.p>

        <motion.p
          className={styles.thankYouSub}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
        >
          Cảm ơn bạn đã luôn đồng hành và chia sẻ niềm vui <br />
          trong hành trình hạnh phúc của chúng mình.
        </motion.p>

        <motion.div
          className={styles.signatureLine}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <span className={styles.line}></span>
          <img src={traitim} alt="Heart" className={styles.beatingHeart} />
          <span className={styles.line}></span>
        </motion.div>

        <motion.p
          className={`${styles.coupleNames} font-cursive`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.45 }}
        >
          {data.couple.groom} & {data.couple.bride}
        </motion.p>

        <motion.p
          className={styles.weddingDate}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
        >
          {data.events.party.dateFull}
        </motion.p>

        <motion.button
          className={styles.rsvpButton}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.75 }}
          onClick={() => setIsModalOpen(true)}
        >
          Xác nhận tham dự
        </motion.button>
      </div>

      <RSVPModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default RSVPSection;

