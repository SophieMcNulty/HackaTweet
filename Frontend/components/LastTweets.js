import Tweet from './Tweet';
import styles from '../styles/LastTweets.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


function LastTweets() {
    const user = useSelector((state) => state.user.value);
    const [tweetsList, setTweetsList] = useState([])
    const [tweetInput, setTweetInput] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/tweets')
            .then(response => response.json())
            .then(allTweets => {
                setTweetsList(allTweets.tweets)
            })
    }, [])
    console.log("user from LastTweets: ", user)

    // console.log(tweetsList)

    const allTweets = tweetsList.map((data, i) => {
        // console.log(data)
        return <Tweet {...data} />
    })
    // console.log("all tweets : ", allTweets)

    const postTweet = () => {
        if (user.isConnected) {

            fetch('http://localhost:3000/tweets/postTweet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ textContent: tweetInput, username: user.username, firstname: user.firstname, }),
            }).then(response => response.json())
                .then(data => {
                    if (data.result) {
                        tweetsList.push(data)
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
                    onChange={(e) => setTweetInput(e.target.value)} />
                <div className={styles.btnContainer}>
                    <span>{tweetInput.length}/280</span><button onClick={() => postTweet()} className={styles.tweetBtn}>Tweet</button>
                </div>
            </div>
            <div className={styles.allTweets}>

                {allTweets}

            </div>

        </div>
    );
}

export default LastTweets;