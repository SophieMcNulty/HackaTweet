import Tweet from './Tweet';
import styles from '../styles/LastTweets.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


function LastTweets() {
    const user = useSelector((state) => state.user.value);
    const [tweetsList, setTweetsList] = useState([])
    const [tweetInput, setTweetInput] = useState('')

    useEffect(() => {
        fetchAllTweets()
    }, [])

    const fetchAllTweets = () => {
        fetch('http://localhost:3000/tweets')
            .then(response => response.json())
            .then(allTweets => {
                setTweetsList(allTweets.tweets)
            })
    }

    const allTweets = tweetsList.slice().reverse().map((data, i) => {
        return <Tweet key={i} {...data} refresh={fetchAllTweets} />;
    });

    const findHashtag = (text) => {
        const hashtagRegex = /#\w+/gi;
        const resultRegex = text.match(hashtagRegex) || [''];
        return resultRegex
    };

    const postTweet = () => {
        if (user.isConnected) {

            const hashtags = findHashtag(tweetInput);
            fetch('http://localhost:3000/tweets/postTweet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ textContent: tweetInput, username: user.username, firstname: user.firstname, hashtags: hashtags }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        setTweetsList([...tweetsList, data.tweet]);
                        setTweetInput('')
                    }
                });
        } else {
            alert("please Log in")
        }
    }



    return (

        <div className={styles.container}>
            <div className={styles.header}>
                <div>HOME</div>
                <input className={styles.inputTweet}
                    type="text"
                    placeholder="What's up"
                    maxLength={280}
                    onChange={(e) => setTweetInput(e.target.value)}
                    value={tweetInput} />
                <div className={styles.btnContainer}>
                    <span className={styles.nbrOfCaracters}>{tweetInput.length}/280</span><button onClick={() => postTweet()} className={styles.tweetBtn}>Tweet</button>
                </div>
            </div>
            <div className={styles.allTweets}>
                {allTweets}
            </div>

        </div>
    );
}

export default LastTweets;