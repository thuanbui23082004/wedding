import React from 'react';
import { motion } from 'framer-motion';
import styles from './EventDetails.module.css';

interface EventProps {
  data: any;
}

const EventDetails: React.FC<EventProps> = ({ data }) => {
  return (
    <section className={`${styles.eventSection} section-padding text-center`}>
      {/* 2 Photos */}
      <div className={styles.twoPhotos}>
        <motion.img 
          src={data.images.cdcr[0]} 
          alt="Couple 1" 
          className={styles.photo}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.img 
          src={data.images.cdcr[1]} 
          alt="Couple 2" 
          className={styles.photo}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        />
      </div>

      {/* Thu Moi Text */}
      <div className={styles.invitationHeader}>
        <motion.div 
          className={styles.headerDivider}
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className={styles.line}></div>
          <h2 className={`${styles.cursiveTitle} font-cursive`}>Thư Mời</h2>
          <div className={styles.line}></div>
        </motion.div>
        <motion.p 
          className={styles.subTitle}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
        >
          THAM DỰ LỄ CƯỚI {data.couple.groom.toUpperCase()} & {data.couple.bride.toUpperCase()}
        </motion.p>
      </div>

      {/* 3 Photos Staggered */}
      <div className={styles.threePhotos}>
        <motion.div 
          className={styles.sidePhotoWrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={data.images.thumoi[0]} alt="Couple 3" className={styles.sidePhoto} />
        </motion.div>
        
        <motion.div 
          className={styles.centerPhotoWrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <img src={data.images.thumoi[1]} alt="Couple 4" className={styles.centerPhoto} />
        </motion.div>
        
        <motion.div 
          className={styles.sidePhotoWrapper}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <img src={data.images.thumoi[2]} alt="Couple 5" className={styles.sidePhoto} />
        </motion.div>
      </div>

      {/* Ceremony Details */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={styles.ceremonyContainer}
      >
        <h3 className={styles.eventTitle}>{data.events.ceremony.title}</h3>
        <p className={styles.eventSubtitle}>Vào Lúc</p>
        
        <div className={styles.dateTimeLayout}>
          <div className={styles.timeBlock}>{data.events.ceremony.time}</div>
          <div className={styles.dateBlock}>
            <span className={styles.dayOfWeek}>{data.events.ceremony.dayOfWeek}</span>
            <span className={styles.largeDate}>{data.events.ceremony.date}</span>
            <span className={styles.month}>Tháng {data.events.ceremony.month}</span>
          </div>
          <div className={styles.yearBlock}>Năm {data.events.ceremony.year}</div>
        </div>
        
        <p className={styles.lunarDate}>({data.events.ceremony.lunarDate})</p>
        <p className={styles.location}>{data.events.ceremony.location}</p>
      </motion.div>

      {/* Party Details */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={styles.partyContainer}
      >
        <h3 className={styles.eventTitle}>{data.events.party.title}</h3>
        <p className={styles.partyTime}>{data.events.party.time}</p>
        <p className={styles.partyDateFull}>{data.events.party.dateFull}</p>
        <p className={styles.lunarDate}>({data.events.party.lunarDate})</p>
        <p className={styles.location}>{data.events.party.location}</p>
      </motion.div>

    </section>
  );
};

export default EventDetails;
