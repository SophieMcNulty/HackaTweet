import { useState } from 'react';
import styles from '../styles/Login.module.css';
import LoginModal from '../components/LoginModal';

function Login() {
    const [isSignin, setIsSignin] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(isSignin) {
        setIsSignin(isSignin)
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (

        <div className={styles.body}>
            <div className={styles.imageBg} >
                <img src='images/logo_twitter.png' alt='logo twitter' className={styles.logoLeft} />
            </div>
            <div className={styles.container}>
                <div className={styles.contentLogin}>
                    <img src='images/logo_twitter.png' alt='logo twitter' className={styles.smallLogo} />
                    <h1 className={styles.title1}><div>See what's </div><div>happening</div></h1>
                    <h2 className={styles.title2}>Join HackaTweet today.</h2>
                    <button className={styles.registerBtn} onClick={() => openModal(false)}>Sign up</button>
                    <p>Already have an account ?</p>
                    <button className={styles.signin} onClick={() => openModal(true)}>Sign in</button>
                    <LoginModal isSignin={isSignin} closeModal={closeModal} modalIsOpen={modalIsOpen} />
                </div>
            </div>
        </div>

    );
}

export default Login;