import styles from '../styles/Hashtag.module.css';
import { useState, useEffect } from 'react';

function Hashtag(props) {
    const [numberHashtag, setNumberHashtag] = useState(0)

    useEffect(() => {
        getNumberOfHashtag()

    }, [])

    const getNumberOfHashtag = async () => {
        const hashtagLength = 0
        const fetchHashtag = await fetch('http://localhost:3000/tweets/hashtag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hashtag: props.hashtag })
        })
        const res = await fetchHashtag.json()
        hashtagLength = res.tweets.length
        setNumberHashtag(hashtagLength)
    }

    let nmHash = <p>{numberHashtag} Tweets</p>
    if (numberHashtag === 1) {
        nmHash = <p>{numberHashtag} Tweet</p>
    }

    return (
        <div className={styles.hashtag}>
            <h2>#{props.hashtag}</h2>
            {nmHash}
        </div>
    );
}

export default Hashtag;