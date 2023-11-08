import React, { useEffect, useState } from 'react';
import { editNews, getNewsById, postNews } from '../Redux/Action';
import { useNavigate, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';

const AddNews = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [responseBody, setResponseBody] = useState({
        id: "",
        title: "",
        author: "",
        content: "",
        image: ""
    })
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate();

    const getNewsById = () => {
        if (id != null) {
            props.getnewsbyid(id);
        }
    };
    
    useEffect(() => {
        getNewsById()
        if (props.news.newsobj) {
            setTitle(props.news.newsobj.title);
            setAuthor(props.news.newsobj.author)
            setContent(props.news.newsobj.content)
            setImage(props.news.newsobj.image)
        }
        if (id != null) {
            setType("Sửa")

        } else {
            setType("Thêm")
        }
    }, [props.news.newsobj.title])

    function submitNews(event) {
        event.preventDefault();

        responseBody.title = title
        responseBody.author = author
        responseBody.content = content
        responseBody.image = image

        if (id != null) {
            dispatch(editNews(responseBody, id))
            toast.success("Sửa thành công")
            navigate("/")
        } else {
            responseBody.id = Math.floor(new Date().getTime() * 3.14)
            dispatch(postNews(responseBody))
            toast.success("Thêm thành công")
            navigate("/")
        }
    }

    function inputChangeHandler(setFunction, event) {
        const nameEvent = event.target.value
        setFunction(nameEvent)
    }

    function inputChangeHandlerFile(setFunction, event) {
        const file = event.target.files[0];
        const nameEvent = "/images/" + file.name;
        setFunction(nameEvent)
    }
    return (
        <div className='card mt-5'>
            <div className='card-header'>
                <h1>{type} bài viết</h1>
            </div>
            <div className='card-body'>
                <Form onSubmit={submitNews}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control onChange={(e) => inputChangeHandler(setTitle, e)} value={title} type="text" placeholder="Nhập tiêu đề..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control onChange={(e) => inputChangeHandler(setAuthor, e)} value={author} type="text" placeholder="Nhập tác giả..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} onChange={(e) => inputChangeHandler(setContent, e)} value={content} placeholder="Nhập nội dung..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control onChange={(e) => inputChangeHandlerFile(setImage, e)} type="file" placeholder="Nhập tiêu đề..." />
                        <Image className='mt-3' src={image} thumbnail />
                    </Form.Group>
                    <div className='d-flex'>
                        <Button variant="danger" type="reset">Reset</Button>
                        <Button variant="primary" type="submit">{type}[+]</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        news: state.news
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getnewsbyid: (id) => dispatch(getNewsById(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNews);