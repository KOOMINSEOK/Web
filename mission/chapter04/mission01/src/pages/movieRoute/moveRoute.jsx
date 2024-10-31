import { useParams} from 'react-router-dom';
import MoviesPage from './moviesPages/moviesPage';
import DetailPage from './detailPage/detailPage';

const MovieRoute = ()=>{
    const {categoryOrMovieId} = useParams();
    const isNumber = /^\d+$/.test(categoryOrMovieId);
    return isNumber ? <DetailPage movieId ={categoryOrMovieId} />
                    : <MoviesPage category ={categoryOrMovieId}/>
}

export default MovieRoute;