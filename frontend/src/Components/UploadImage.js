import React, { Component } from 'react'

import axios from 'axios'
import {Link} from 'react-router-dom'

import styles from './UploadImage.module.scss'


export default class UploadImage extends Component {
    constructor(props){
        super(props)
        this.state = {
            placeholder_image:"https://via.placeholder.com/150C/",
            image:'',
            new_image:false
        }
    }

    componentDidMount = () => {

    }

    handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('new_image', this.state.image)
        axios.post("http://localhost:5000/addimage",formData)
        .then(res => {
            this.setState({
                new_image:true,
                placeholder_image:res.data.image
            })
            console.log(res)
        })
        .catch(err => alert(err))
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            image:e.target.files[0]
        })
    }
    
    render() {
        return (
            <div className={styles.main}>
                <div className={styles.UploadImageWrapper}>
                    <h1>Want to Upload New Image?</h1>
                    <div className={styles.Preview}>
                        {
                            !this.state.new_image ? <img src={this.state.placeholder_image}/> :
                            <img src={`http://127.0.0.1:5000/${this.state.placeholder_image}`} />
                        }
                    </div>
                    <form onSubmit = {this.handleSubmit} className={styles.form}>
                        <input type="file" name="image" onChange={this.handleChange} required/>
                        <button type="submit" >Submit</button>
                    </form>
                </div>
                <Link to="/allimages"><button>Next/Skip</button></Link>
            </div>
        )
    }
}
