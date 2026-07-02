import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import styles from './CalendarSection.module.css';

interface CalendarProps {
  data: any;
}

const CalendarSection: React.FC<CalendarProps> = ({ data }) => {
  const year = parseInt(data.events.ceremony.year);
  const month = parseInt(data.events.ceremony.month);
  const targetDate = parseInt(data.events.ceremony.date);

  // Calculate days in month and start day
  const daysInMonth = new Date(year, month, 0).getDate();
  let startDay = new Date(year, month - 1, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  startDay = startDay === 0 ? 6 : startDay - 1;

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyCells = Array.from({ length: startDay }, () => null);

  const allCells = [...emptyCells, ...daysArray];
  // Pad the end to make complete rows
  while (allCells.length % 7 !== 0) {
    allCells.push(null);
  }

  return (
    <section className="section-padding text-center">
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <motion.div
          className={styles.calendarHeader}
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className={`${styles.monthText} font-cursive`}>Tháng {month}</span>
          <span className={styles.yearText}>{year}</span>
        </motion.div>

        <motion.div
          className={styles.calendarGrid}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        >
          {/* Header Row */}
          {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => (
            <div key={day} className={styles.dayHeader}>{day}</div>
          ))}

          {/* Days */}
          {allCells.map((day, index) => {
            const isSunday = index % 7 === 6;
            return (
              <div key={index} className={styles.dayCell}>
                {day === targetDate ? (
                  <div className={styles.highlightDate}>
                    <Heart className={styles.heartIconPulse} size={44} color="#a80000" strokeWidth={1.5} />
                    <Heart className={styles.heartIcon} size={44} color="#a80000" strokeWidth={1.5} />
                    <span className={`${styles.dateNumber} ${styles.sundayText} ${styles.highlightedText}`}>{day}</span>
                  </div>
                ) : (
                  day && (
                    <span className={`${styles.dateNumber} ${isSunday ? styles.sundayText : ''}`}>
                      {day}
                    </span>
                  )
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CalendarSection;
