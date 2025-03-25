import styles from './style.module.scss';
import { translate } from '../../anim';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <ul>
                <motion.li 
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <span>Made by:</span>IAS Tech X IAS Design
                </motion.li>
            </ul>
            <ul>
                <motion.li  
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <span>Typography:</span> Google Fonts
                </motion.li>
            </ul>
            {/* Social media links replacing the Images section */}
            <ul>
                <motion.li 
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </motion.li>
                <motion.li 
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </motion.li>
            </ul>
            <ul>
                <motion.li
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    Privacy Policy
                </motion.li>
                <motion.li 
                    custom={[0.3, 0]} 
                    variants={translate} 
                    initial="initial" 
                    animate="enter" 
                    exit="exit">
                    Terms & Conditions
                </motion.li>
            </ul>
        </div>
    );
}