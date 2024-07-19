import styles from '../styles/Home.module.css';
import Hashtag from '../components/Hashtag';
import Trends from '../components/Trends';
import LastTweets from '../components/LastTweets';
import { logout, updateSearchHashtag } from '../reducers/users';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function Home() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [hashtags, setHashtags] = useState([])
    const [searchH, setSearchH] = useState('')

    useEffect(() => {
        getAllHashtag()
    }, [])

    const getAllHashtag = async () => {
        const fetchAllTweets = await fetch('http://localhost:3000/tweets')
        const res = await fetchAllTweets.json()
        const allTweets = res.tweets
        const hashT = []
        allTweets.forEach(e => {
            if (e.hashtags) {
                e.hashtags.forEach(elem => {
                    if (elem) {
                        if (!hashT.some(el => el === elem)) {
                            hashT.push(elem)
                        }
                    }
                })
            }
        })
        setHashtags(hashT)
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    const goHome = () => {
        if (user.searchHashtag) {
            dispatch(updateSearchHashtag())
        }
    }

    let tweetsToDisplay
    let hashLastTweets = <Trends hashtag={searchH} />

    const searchHash = (hashToSearch) => {
        if (!user.searchHashtag) {
            dispatch(updateSearchHashtag())
        }
        setSearchH(hashToSearch)
    }

    if (!user.searchHashtag) {
        tweetsToDisplay = <LastTweets />
    } else {
        tweetsToDisplay = hashLastTweets
    }


    const allHashtag = hashtags.map(hash => {
        return <Hashtag hashtag={hash} searchHash={searchHash} />
    })



    return (
        <div className={styles.container}>
            <div className={styles.contentLeft}>
                <img src='images/logo_twitter.png' alt='logo twitter' className={styles.logoHome} onClick={() => goHome()} />
                <div>
                    <div className={styles.userInfo}>
                        <img src='images/avatar.png' alt='avatar' className={styles.avatar} />
                        <div className={styles.nameUser}>
                            <p className={styles.firstname}>{user.firstname}</p>
                            <p className={styles.username}> @ {user.username}</p>
                        </div>
                        <button className={styles.logoutBtn} onClick={() => handleLogout()}>Logout</button>
                    </div>
                </div>
            </div>
            <div className={styles.contentCenter}>
                {tweetsToDisplay}
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