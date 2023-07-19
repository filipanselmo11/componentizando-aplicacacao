import { Star, Clock } from 'react-feather';

import '../styles/card-filme.scss';

interface PropsCardFilme {
    title: string;
    poster: string;
    rating: string;
    runtime: string;
}


export function CardFilme(props: PropsCardFilme) {
    return (
        <div className="movie-card">
            <img
                src={props.poster}
                alt={props.title}
            />
            <div>
                <div className="movie-info">
                    <span>
                        {props.title}
                    </span>
                    <div className="meta">
                        <div>
                            <Star/> {props.rating}
                        </div>
                        <div>
                            <Clock/> {props.runtime}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}