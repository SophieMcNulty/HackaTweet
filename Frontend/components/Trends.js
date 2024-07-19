import Tweet from './Tweet';
import styles from '../styles/LastTweets.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Trends(props) {
    const user = useSelector((state) => state.user.value);
    const [tweetsList, setTweetsList] = useState([])
    const [searchTweetInput, setSearchTweetInput] = useState('')
    const [goodSearch, setGoodSearch] = useState(true)

    useEffect(() => {
        fetchTweetsHash(props.hashtag)
    }, [])

    const fetchTweetsHash = async (hash) => {
        const fetchHashtag = await fetch('http://localhost:3000/tweets/hashtag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hashtag: hash })
        })
        const res = await fetchHashtag.json()
        setSearchTweetInput(hash)
        if (res.result) {
            setTweetsList(res.tweets)
            setGoodSearch(true)
        } else {
            setGoodSearch(false)
        }
    }

    let allTweets

    if (goodSearch) {
        allTweets = tweetsList.map((data, i) => {
            return <Tweet {...data} />
        })
    }

    const searchTweetWithHash = () => {
        if (user.isConnected) {
            fetchTweetsHash(searchTweetInput)
        } else {
            alert("please Log in")
        }
    }
    return (
        <div>
            <div className={styles.header}>
                <div>Hashtag</div>
                <input className={styles.inputTweet}
                    type="text"
                    onChange={(e) => setSearchTweetInput(e.target.value)}
                    value={searchTweetInput} />
                <div className={styles.btnContainer}>
                    <button onClick={() => searchTweetWithHash()} className={styles.tweetBtn}>Search</button>
                </div>
            </div>
            <div className={styles.allTweets}>
                {allTweets}
            </div>
        </div>
    );
}

export default Trends;