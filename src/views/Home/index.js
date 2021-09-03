import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";

const Home = () => {
    const [page, setPage] = useState(1)
    const [films, setFilms] = useState([])
    const handlePage = (num) => {
        setPage(num)
    }
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setFilms(data.results))
    }, [page])

    return (
        <div className="my-5">
            {
                [...Array(6).keys()].map(item =>
                    <button key={item} type="button"
                    className={`btn btn-primary mx-1 ${page === item + 1 && "btn-success"}`} onClick={() => handlePage(item +1)}
                    >{item +1}</button>
                )
            }
            <div className="row">
                {
                    films.map(film =>
                        <div className="col-md-3 col-sm-6 mb-3" key={film.id}>
                           <Link to={`/film/${film.id}`}>
                               <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${film.backdrop_path}`} alt={film.title} className="w-100"/>
                               <h4 className="mt-4">{film.original_title}</h4>

                           </Link>
                        </div>)
                }
            </div>
        </div>
    );
};
export default Home