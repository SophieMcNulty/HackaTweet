import styles from '../styles/Home.module.css';
import Hashtag from '../components/Hashtag';
import Trends from '../components/Trends';
import LastTweets from '../components/LastTweets';
import { logout } from '../reducers/users';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Home() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [hashtags, setHashtags] = useState([])



    useEffect(() => {
        getAllHashtag()
    }, [])

    const getAllHashtag = async () => {
        const fetchAllTweets = await fetch('http://localhost:3000/tweets')
        const res = await fetchAllTweets.json()
        const allTweets = res.tweets
        const hashT = []
        allTweets.forEach(e => {
            if (e.hashtag) {
                !hashT.some(el => el === e.hashtag) && hashT.push(e.hashtag)
            }
        })
        setHashtags(hashT)
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    const allHashtag = hashtags.map(hash => {
        return <Hashtag hashtag={hash} />
    })

    return (
        <div className={styles.container}>
            <div className={styles.contentLeft}>
                <img src='images/logo_twitter.png' alt='logo twitter' className={styles.logoHome} />
                <div>
                    <div className={styles.userInfo}>
                        <img src='images/avatar.png' alt='avatar' className={styles.avatar} />
                        <div className={styles.nameUser}>
                            <p>{user.firstname}</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                    <button className={styles.logoutBtn} onClick={() => handleLogout()}>Logout</button>
                </div>
            </div>
            <div className={styles.contentCenter}>
                <LastTweets />
            </div>
            <div className={styles.contentRight}>
                <h2>Trends</h2>
                <div className={styles.allHashtag}>
                    {allHashtag}
                </div>
            </div>
        </div>
    );
}

export default Home;