import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import axios from "axios";
import Spinner from "../../components/Spinner";

const FilmDetails = () => {
    const [film, setFilm] = useState({})
    const [actors, setActors] = useState([])
    const params = useParams()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setFilm(data)

            })
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActors(data.cast)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${film.poster_path}`} alt={film.title}
                     className="w-100"/>
            </div>
            <div className="col-md-6">
                <h2>Название:{film.title}</h2>
                <p>Описание:{film.overview}</p>
                <p>Рейтинг:{film.vote_average}</p>
                <p>Бюджет:{film.budget.toLocaleString()}$</p>
                <h4>Производитель:</h4>
                {
                    film.production_companies.map(company =>
                        <div key={company.id}>{company.name}</div>)
                }
                <h4>Страна:</h4>
                {
                    film.production_countries.map(country =>
                        <div key={country.id}>{country.name}</div>
                    )
                }
                {
                    actors.map(actor =>
                        <>
                            <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`} alt=""/>)
                            <div>{actor.name}</div>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default FilmDetails