'use client';
import styles from './style.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import Nav from './nav';

export default function Index() { // Capitalized function name for consistency
    const [isActive, setIsActive] = useState(false);

    // Function to close the navigation
    const closeNav = () => setIsActive(false);

    return (
        <div className={styles.header}>
            <div className={styles.bar}>
                <Link href="/">IAS</Link>
                <div onClick={() => {setIsActive(!isActive)}} className={styles.el}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                    <div className={styles.label}>
                        <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
                        <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
                    </div>
                </div>
                <motion.div variants={opacity} animate={!isActive ? "open" : "closed"} className={styles.shopContainer}>
                    <p className={styles.shop}>IRCO</p>
                    <div className={styles.el}>
                        <p>IRCO</p>
                    </div>
                </motion.div>
            </div>
            <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}></motion.div>
            <AnimatePresence mode="wait">
                {isActive && <Nav closeNav={closeNav} />}
            </AnimatePresence>
        </div>
    );
}