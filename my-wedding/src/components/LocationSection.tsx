import React from 'react';
import { motion } from 'framer-motion';
import styles from './LocationSection.module.css';
import traitimbay from '../assets/traitimbay.png';

interface LocationProps {
  data: any;
}

const LocationSection: React.FC<LocationProps> = ({ data }) => {
  return (
    <section className="section-padding text-center">
      <div style={{ width: '100%' }}>
        {/* Decorative Divider & Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className={styles.decorativeDivider}>
            <img src={traitimbay} alt="Divider" className={styles.decorativeImage} />
          </div>
          <h2 className={`${styles.sectionTitle} font-cursive`}>Địa điểm tổ chức</h2>
        </motion.div>

        {/* Location Card */}
        <motion.div 
          className={styles.locationCard}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          <h3 className={styles.placeName}>{data.location.name}</h3>
          <p className={styles.placeAddress}>{data.location.address}</p>

          <div className={styles.mapContainer}>
            <iframe 
              src={data.location.mapUrl} 
              width="100%" 
              height="250" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </div>

          <a href={data.location.mapLink} target="_blank" rel="noreferrer" className={styles.mapButton}>
            XEM TRÊN GOOGLE MAP
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;
