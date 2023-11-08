import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchNewsList, removeNews } from '../Redux/Action';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const ListNews = (props) => {
    useEffect(() => {
        props.loadnews()
        console.log(props.news.newslist);
    }, []);

    const clickDelete = (id) => {
        const checkConfirm = window.confirm("Bạn có muốn xóa không?")
        if (checkConfirm == true) {
            props.deleltenews(id)
            props.loadnews()
            toast.success("Xóa thành công")
        }
    }

    return (
        <div className='container mt-5'>
            <div>
                <h1>DANH SÁCH BÀI VIẾT</h1>
            </div>
            <div>
                <Link className='float-right p-2 btn btn-primary' to="/add">Thêm bài viết [+]</Link>
            </div>
            {props.news.loading ? <h1>LOADING...</h1> : 
            <table className="table">
                <thead className="table-dark">
                    <tr className='text-center'>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Content</th>
                        <th scope="col">Image</th>
                        <th scope="col" colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.news.newslist && props.news.newslist.map((item) => {
                        return (
                            <tr key={item.id} className='text-center'>
                                <th scope="row">{item.id}</th>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.content}</td>
                                <td><img style={{ height: 70, width: 70 }} src={item.image} /></td>
                                <td><button onClick={() => clickDelete(item.id)} className='btn btn-danger' >Xóa</button></td>
                                <td><Link to={`/add/${item.id}`} className='btn btn-primary' >Sửa</Link></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>}
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
        loadnews: () => dispatch(fetchNewsList()),
        deleltenews: (id) => dispatch(removeNews(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListNews);