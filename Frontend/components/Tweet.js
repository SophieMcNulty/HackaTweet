import styles from '../styles/Tweet.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'


function Tweet(props) {
    const user = useSelector((state) => state.user.value)
    const [date, setDate] = useState('2050-11-22T23:59:59');
    const [likeCount, setLikeCount] = useState(0);
    useEffect(() => {
        setDate(new Date())
    }, [])


    //like tweet
    let likeColor = { 'cursor': 'pointer' };
    const handleLikeTweet = () => {
        setLikeCount(likeCount + 1)
    };
    if (likeCount > 0) {
        likeColor = { 'color': 'red', 'cursor': 'pointer' }
    }

    //Delete tweet
    const handleDelete = () => { }


    return (
        <div>
            <div className={styles.tweetContainer}>

                <div className={styles.tweetProfil}>
                    <img src='images/avatar.png' alt='logo utilisateur' className={styles.logoUtilisateur} />
                    <p> {props.firstname}, {props.username}  </p>
                </div>

                <div className={styles.tweetContent}>
                    {props.textContent}
                </div>

                <div className={styles.tweetPicture}>
                    <span><FontAwesomeIcon onClick={() => handleLikeTweet()} icon={faHeart} style={likeColor} /> {likeCount} </span>
                    <span><FontAwesomeIcon onClick={() => handleDelete()} icon={faTrash} /></span>
                </div>


            </div>
        </div>
    );
}

export default Tweet;