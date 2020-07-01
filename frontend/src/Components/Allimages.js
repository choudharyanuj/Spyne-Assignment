import React, { Component } from 'react'

import axios from 'axios'

import ImageCard from './ImageCard'
import styles from './ImageCard.module.scss'

export default class Allimages extends Component {
    constructor(props){
        super(props)
        this.state={
            Allimages:[]
        }
    }
    componentDidMount = () => {
        axios.get("http://localhost:5000/allimages")
        .then((res) => {
            this.setState({
                Allimages:res.data
            })
        })
        .catch((err) => alert(err))
    }
    render() {
        return (
            <>
            <h2>Please Select an Image to review</h2>
                <div className={styles.allimages}>
                    {   this.state.Allimages.map((e) => {
                        return(
                            <ImageCard image={e.image} id={e.id}/>
                        )
                        })
                    }
                </div>
            </>
        )
    }
}
