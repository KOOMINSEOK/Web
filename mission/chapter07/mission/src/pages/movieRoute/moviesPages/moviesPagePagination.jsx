import MoviePoster from "../../../components/moviePoster/moviePoster.jsx";
import { Link } from "react-router-dom";
import MovieFrameList from "../../../components/movieFrame/movieFrameList.jsx";
import { useGetMovies } from "../../../hooks/queries/useGetMovies.js";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useGetInfiniteMovies } from "../../../hooks/queries/useGetInfiniteMovies.js";
import * as S from "./styled/styled.js";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { axiosInstance } from "../../../apis/axios-instance.js";
import Pagination from "../../../components/pagination/Pagination.jsx";

const APIurl = {
    "now-playing": "now_playing",
    "popular" : "popular",
    "top-rated": "top_rated",
    "up-coming": "upcoming",
};

const MoviesPagePagination = (props) => {
    const { category } = props;
    const categoryURL = APIurl[category];
    const [page, setPage] = useState(1);
    const {
        data: movies,
        isPending,
        isError,
        error,
        isFetching,
        isPlaceholderData,
    } = useQuery({
        queryKey: ["movies", APIurl[category], page],
        queryFn: () =>
        axiosInstance.get(
            `/movie/${APIurl[category]}?language=ko-KR&page=${page}`
        ),
        placeholderData: keepPreviousData,
    });
    return (
        <>
            {(isPending ||isFetching) && <MovieFrameList number={20}/>}
            <S.Container>
                <S.MoviePosterList>
                    {movies?.data?.results?.map((movie) => (
                    <Link to={`../movies/${movie.id}`}>
                        <MoviePoster
                        poster_path={movie.poster_path}
                        title={movie.title}
                        release_date={movie.release_date}
                        />
                    </Link>
                    ))}
                </S.MoviePosterList>
                <Pagination page = {page}
                    previousClick = {() => setPage((old) => Math.max(old - 1, 0))}
                    nextClick = {() => setPage((old) => old + 1)} isdisabled = {page === 1}
                />
            </S.Container>
        </>
    );
};

export default MoviesPagePagination;
