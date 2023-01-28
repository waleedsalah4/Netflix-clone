import Image from 'next/image'
import React from 'react';
import { DocumentData } from 'firebase/firestore'
import { Movie } from '../typings'
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';

interface Props {
    //when using firebase
    movie: Movie | DocumentData
    // movie: Movie 
}

function Thumbnail({movie}: Props) {
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
    const [showModal, setShowModal] = useRecoilState(modalState)

    return (
        <div 
            onClick={() => {
                setCurrentMovie(movie)
                setShowModal(true)
            }}
        // className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
            className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
                }`}
                fill
                // sizes="7rem 180px,
                // (min-width: 768px) 9rem,
                // 260px"
                className="rounded-sm object-cover md:rounded"
                alt='movie thumbnail'
            />
        </div>
    )
}

export default Thumbnail