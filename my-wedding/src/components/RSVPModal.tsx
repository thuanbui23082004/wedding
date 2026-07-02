import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RSVPModal.module.css';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    side: 'Nhà Gái', // Default to bride's side, or can be empty
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // TODO: The user needs to replace this with their Google Apps Script Web App URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPsRrKYg2lhpMtN3ZFkQB9Jn93PR8u-sPoiYwFDyDz3USkwbE9jkwa4HJ5YJd9pCcrSw/exec';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!SCRIPT_URL) {
      alert("Vui lòng cập nhật SCRIPT_URL trong file RSVPModal.tsx");
      return;
    }

    setStatus('submitting');

    try {
      // Create a URLSearchParams object to send data as application/x-www-form-urlencoded
      // This is required for Google Apps Script's doPost to receive it properly via CORS
      const data = new URLSearchParams();
      data.append('Name', formData.name);
      data.append('Side', formData.side);
      data.append('Message', formData.message);

      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors' // Thêm dòng này để vượt qua lỗi CORS của trình duyệt
      });

      // Khi dùng 'no-cors', chúng ta không thể đọc được nội dung response trả về, 
      // nhưng nếu fetch không văng lỗi (không throw error) thì nghĩa là request đã được gửi đi.
      setStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
              &times;
            </button>

            {status === 'success' ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.modalTitle}>Cảm ơn bạn!</h3>
                <p className={styles.successText}>
                  Thông tin xác nhận tham dự và lời chúc của bạn đã được gửi tới cô dâu, chú rể.
                </p>
                <button
                  className={styles.submitButton}
                  onClick={onClose}
                  style={{ marginTop: '2rem' }}
                >
                  Đóng
                </button>
              </div>
            ) : (
              <>
                <h2 className={styles.modalTitle}>Xác Nhận Tham Dự</h2>
                <p className={styles.modalSubtitle}>Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi!</p>

                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">Họ và Tên *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={styles.input}
                      placeholder="Nhập tên của bạn"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Bạn là khách mời của</label>
                    <div className={styles.radioGroup}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="side"
                          value="Nhà Gái"
                          checked={formData.side === 'Nhà Gái'}
                          onChange={handleChange}
                        />
                        Nhà Gái
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="side"
                          value="Nhà Trai"
                          checked={formData.side === 'Nhà Trai'}
                          onChange={handleChange}
                        />
                        Nhà Trai
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="side"
                          value="Cả Hai"
                          checked={formData.side === 'Cả Hai'}
                          onChange={handleChange}
                        />
                        Cả Hai
                      </label>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="message">Lời Chúc</label>
                    <textarea
                      id="message"
                      name="message"
                      className={styles.textarea}
                      placeholder="Gửi lời chúc tốt đẹp nhất đến cô dâu, chú rể..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Đang gửi...' : 'Gửi Xác Nhận'}
                  </button>

                  {status === 'error' && (
                    <p className={styles.errorMessage}>
                      Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau!
                    </p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RSVPModal;
