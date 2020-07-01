import React, { Component } from 'react'
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import axios from 'axios'

import Loader from './Loader'
import styles from './Editing.module.scss'
import ImageCard from './ImageCard'

export default class Editing extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[],
            sample:'/sample.png',
            comment:'',
            editedImage:'',
            allComments:[]
        }
    }

    componentDidMount = () => {
        axios.get("http://127.0.0.1:5000/details",{
            headers:{
                image_id:this.props.match.params.id
            }
        })
        .then((res) => {
            this.setState({
                data:res.data[0]
            })
        })
        .catch(err => alert(err))
        axios.get("http://localhost:5000/allcomments/" + this.props.match.params.id)
        .then((res) => {
            this.setState({
                allComments:res.data
            })
            console.log(res)
        })
        .catch(err => alert(err))
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
       
    }
     addImage = (e) => {
        this.setState({
            editedImage:e.target.files[0]
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('image', this.state.editedImage)
        axios.post("http://localhost:5000/postcomment", formData,{
            headers:{
                comments:this.state.comment,
                image_id:this.props.match.params.id
            }
        })
        .then((res) => {
            alert(res.data)
            window.location.reload(false)
        })
        .catch(err => alert(err))
    }
    render() {
        let image_url = "http://127.0.0.1:5000/"+this.state.data.image
        console.log(this.state)
        return (
            <div className={styles.MainSection}>
                <div className={styles.Editor}>
                    {
                        this.state.data.image !== undefined ?
                            <ImageEditor
                            className = "overlap"
                            includeUI={{
                            loadImage: {
                                path: image_url,
                                name: 'SampleImage'
                            },
                            menu: ['text','draw','icon'],
                            uiSize: {
                                height: '700px'
                            },
                            menuBarPosition: 'bottom'
                            }}
                            cssMaxHeight={500}
                            cssMaxWidth={700}
                            selectionStyle={{
                            cornerSize: 20,
                            rotatingPointOffset: 70
                            }}
                            usageStatistics={true}
                            /> 
                        :   <Loader/>
                    }
                </div>
                <div className={styles.Comments}>
                    <h3><u>Add Review</u></h3>
                    <form>
                        <textarea name="comment" placeholder="Share your thought" onChange={this.handleChange}></textarea>
                        <div className={styles.SubmitReview}>
                            <input  type="file" name="editedImage" onChange={this.addImage} required/>
                            <button type="submit" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </form>
                    <div>
                        {
                            this.state.allComments.length > 0 ?
                            this.state.allComments.map((e) => {
                                return(
                                    <>
                                        <div className={styles.PrevComments}>
                                            <div className={styles.reviewer}>
                                                <p >John Doe</p>
                                                <p>{e.timestamp}</p>
                                            </div>
                                            <div>
                                                <img src={`http://127.0.0.1:5000/${e.image}`}/>
                                            </div>
                                            <div className={styles.details}>
                                                <p>{e.comments}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            :
                            <h3>Not Reviewed Yet</h3>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

