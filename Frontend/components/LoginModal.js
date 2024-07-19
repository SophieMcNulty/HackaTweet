import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from '../styles/LoginModal.module.css';
import { useState } from 'react';
import { login } from '../reducers/users';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'




function LoginModal(props) {
    const dispatch = useDispatch();
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpFirstName, setSignUFirstName] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');


    //fetch signup
    const handleRegister = () => {
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: signUpFirstName, username: signUpUsername, password: signUpPassword })
        })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: signUpUsername, token: data.token, firstname: signUpFirstName }));
                    setSignUpUsername('');
                    setSignUFirstName('');
                    setSignUpPassword('');

                }
            });
    };
    //fetch signin
    const handleSignIn = () => {
        fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signUpUsername, password: signUpPassword })
        })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    console.log('user')
                    dispatch(login({ username: signUpUsername, token: data.token, firstname: data.firstname }));
                    setSignUpUsername('');
                    setSignUpPassword('');
                }
            });
    };



    //Cas de signin
    if (props.isSignin) {
        return (
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={props.closeModal}
                className={styles.modalContainer}
                contentLabel="Example Modal"
            >
                <div className={styles.content}>
                    <div>
                        <img src='images/logo_twitter.png' alt='logo twitter' className={styles.smallLogo} />
                        <FontAwesomeIcon onClick={props.closeModal} icon={faXmark} />
                    </div>
                    <h2 >Create your HackaTweet account</h2>
                    <input
                        placeholder='Username'
                        className={styles.input}
                        type="text"
                        onChange={(e) => setSignUpUsername(e.target.value)}
                        value={signUpUsername}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className={styles.input}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        value={signUpPassword}
                    />
                    <button className={styles.signBtn} onClick={() => handleSignIn()}>Sign-In</button></div>
            </Modal>
        );
    }
    // Cas de signUp
    return (
        <Modal
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
            className={styles.modalContainer}
            contentLabel="Example Modal"
        >
            <div className={styles.content}>
                <div>
                    <img src='images/logo_twitter.png' alt='logo twitter' className={styles.smallLogo} />
                    <FontAwesomeIcon onClick={props.closeModal} icon={faXmark} />
                </div>
                <h2 >Create your HackaTweet account</h2>
                <input
                    placeholder='Firstname'
                    className={styles.input}
                    type="text"
                    onChange={(e) => setSignUFirstName(e.target.value)}
                    value={signUpFirstName}
                />

                <input
                    placeholder='Username'
                    className={styles.input}
                    type="text"
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    value={signUpUsername}
                />
                <input
                    type="password"
                    placeholder='Password'
                    className={styles.input}

                    onChange={(e) => setSignUpPassword(e.target.value)}
                    value={signUpPassword}
                />

                <button className={styles.signBtn} onClick={() => handleRegister()}>Sign-up</button></div>
        </Modal>
    );
}

export default LoginModal;