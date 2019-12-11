import React, { Component } from 'react';
import CommentInput from './CommentInput'
import CommentList from './CommentList'
class CommentApp extends Component {
    constructor() {
        super()
        this.state = {
            comments: []
        }
    }
    UNSAFE_componentWillMount() {
        this._loadComments()
    }
    render() {

        return (
            <div className='wrapper'>
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                />
            </div>
        );
    }
    handleSubmitComment(comment) {
        let arr = this.state.comments
        arr.push(comment)
        this.setState({
            comments: arr
        })
        this._saveComments(arr)
    }
    _loadComments() {
        let comments = localStorage.getItem('comments')
        if (comments) {
            comments = JSON.parse(comments)
            this.setState({ comments })
        }
    }

    _saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments))
    }
    handleDeleteComment(index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this._saveComments(comments)
    }
}

export default CommentApp;