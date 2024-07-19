import styles from '../styles/Hashtag.module.css';
import { useState, useEffect } from 'react';
import { updateSearchHashtag } from '../reducers/users';
import { useDispatch, useSelector } from 'react-redux';

function Hashtag(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
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

    const searchTweetWithHashtag = () => {
        props.searchHash(props.hashtag)
    }

    return (
        <div className={styles.hashtag} onClick={() => searchTweetWithHashtag()}>
            <h2>{props.hashtag}</h2>
            {nmHash}
        </div>
    );
}

export default Hashtag;