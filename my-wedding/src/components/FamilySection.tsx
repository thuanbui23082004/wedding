import React from 'react';
import { motion } from 'framer-motion';
import styles from './FamilySection.module.css';

interface FamilyProps {
  data: any;
}

const FamilySection: React.FC<FamilyProps> = ({ data }) => {
  const cleanName = (name: string, prefix: string) => {
    if (!name) return "";
    const regex = new RegExp(`^${prefix}\\s+`, 'i');
    return name.replace(regex, "");
  };

  return (
    <section className={`${styles.familySection} section-padding text-center`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={styles.familyContainer}
      >
        {/* Top Parents Block */}
        <div className={styles.parentsBlock}>
          {/* Nhà Trai */}
          <div className={styles.parentsColumn}>
            <h3 className={styles.columnTitle}>NHÀ TRAI</h3>
            <p className={styles.parentName}>Ông: {cleanName(data.family.bride.father, "ông")}</p>
            <p className={styles.parentName}>Bà: {cleanName(data.family.bride.mother, "bà")}</p>
            <p className={styles.parentAddress}>{data.family.bride.address}</p>
          </div>

          {/* Vertical Divider Line */}
          <div className={styles.verticalLine}></div>

          {/* Nhà Gái */}
          <div className={styles.parentsColumn}>
            <h3 className={styles.columnTitle}>NHÀ GÁI</h3>
            <p className={styles.parentName}>Ông: {cleanName(data.family.groom.father, "ông")}</p>
            <p className={styles.parentName}>Bà: {cleanName(data.family.groom.mother, "bà")}</p>
            <p className={styles.parentAddress}>{data.family.groom.address}</p>
          </div>
        </div>

        {/* Bottom Couple Block */}
        <div className={styles.coupleBlock}>
          {/* Groom */}
          <div className={styles.personContainer}>
            <motion.h2
              className={`${styles.cursiveName} font-cursive`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            >
              {data.couple.groomFull}
            </motion.h2>
            {data.couple.groomRelation && (
              <motion.p
                className={styles.relationText}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                {data.couple.groomRelation}
              </motion.p>
            )}
          </div>

          {/* Ampersand Divider */}
          <motion.div
            className={styles.ampersand}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            &
          </motion.div>

          {/* Bride */}
          <div className={styles.personContainer}>
            <motion.h2
              className={`${styles.cursiveName} font-cursive`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
            >
              {data.couple.brideFull}
            </motion.h2>
            {data.couple.brideRelation && (
              <motion.p
                className={styles.relationText}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, delay: 0.9 }}
              >
                {data.couple.brideRelation}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FamilySection;
