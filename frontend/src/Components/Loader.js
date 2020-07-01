import React, { Component } from 'react'
import styles from './loader.module.scss'

export default class Loader extends Component {
    render() {
        return (
            <div className={styles.loader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}
