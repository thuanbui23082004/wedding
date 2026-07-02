import React from 'react';
import { motion } from 'framer-motion';
import styles from './QuoteSection.module.css';

const QuoteSection: React.FC = () => {
  return (
    <section className={`${styles.quoteSection} section-padding text-center`}>
      <motion.div
        initial={{ opacity: 0, y: -35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0 }}
      >
        <p className={styles.quoteText}>
          “Hôn nhân là chuyện cả đời, <br />
          Yêu người vừa ý, cưới người mình thương...”
        </p>
      </motion.div>
    </section>
  );
};

export default QuoteSection;
