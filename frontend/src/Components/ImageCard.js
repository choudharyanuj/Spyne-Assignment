import React, { Component } from 'react'

import styles from './ImageCard.module.scss'
import {Link} from 'react-router-dom'

export default class ImageCard extends Component {
    render() {
        return (
            <Link to={`/review/${this.props.id}`}>
                <div className={styles.ImageCard}>
                    <img src={`http://127.0.0.1:5000/${this.props.image}`}/>                
                </div>
            </Link>
        )
    }
}
