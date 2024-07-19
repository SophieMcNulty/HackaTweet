import styles from '../styles/Tweet.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { format, formatDistanceToNow } from 'date-fns';


function Tweet(props) {

    const user = useSelector((state) => state.user.value)
    const [creatorOrNot, setCreatorOrNot] = useState(false)
    const [likedOrNot, setLikedOrNot] = useState(false)

    useEffect(() => {
        fetchUserInDb()
    }, [])

    const fetchUserInDb = async () => {
        const fetchUser = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token }),
        })
        const res = await fetchUser.json()
        const usernameOfUser = res.user.username
        if (usernameOfUser === props.username) {
            setCreatorOrNot(true)
        }
    }


    const handleLikeTweet = async () => {
        const fetchUserLike = await fetch(`http://localhost:3000/users/updateTweetLikes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: user.token, id: props._id }),
        })
        const res = await fetchUserLike.json()
        res.result ? setLikedOrNot(true) : setLikedOrNot(false)
        props.refresh()
    };

    //like tweet
    let likeColor = {};

    if (likedOrNot) {
        likeColor = { 'color': 'red' }
    }
    //Delete tweet
    const handleDelete = async () => {
        const fetchDelete = await fetch(`http://localhost:3000/tweets/deleteTweet/${props._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        const res = await fetchDelete.json()
        props.refresh()
    }

    let trash

    if (creatorOrNot) {
        trash = <FontAwesomeIcon onClick={() => handleDelete()} icon={faTrash} />
    }

    return (
        <div>
            <div className={styles.tweetContainer}>
                <div className={styles.tweetProfil}>
                    <img src='images/avatar.png' alt='logo utilisateur' className={styles.logoUtilisateur} />
                    <p className={styles.firstname}> {props.firstname} </p>
                    <p className={styles.usename}> @ {props.username}  </p>
                    <span className={styles.tweetTimePassed}>{formatDistanceToNow(new Date(props.createdAt), { addSuffix: true })}</span>
                </div>
                <div className={styles.tweetContent}>
                    {props.textContent}
                </div>
                <div className={styles.tweetPicture}>
                    <span> <FontAwesomeIcon onClick={() => handleLikeTweet()} icon={faHeart} style={likeColor} /> {props.nbrOfLikes} </span>
                    <span>{trash}</span>
                </div>
            </div>
        </div>
    );
}

export default Tweet;