import { useEffect, useState } from "react";
import Image from "next/image";
import { Movie } from "../typings"
import { baseUrl } from "../constants/movie";
import {FaPlay} from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from 'recoil';
import { modalState, movieState } from "../atoms/modalAtom"; 

interface Props {
    netflixOriginals: Movie[]
}

function Banner({netflixOriginals} :Props) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [showModal,setShowModal] = useRecoilState(modalState);
    const [currentMovie,setCurrentMovie] = useRecoilState(movieState);
    

    useEffect(()=>{
        //generate rondom index to get rondom movie
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    },[])

    
    return (
        <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
            <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
                <Image 
                    src={`${baseUrl}${movie?.backdrop_path || movie?.popularity}`}
                    alt='banar img' 
                    fill
                    priority
                    className="object-cover"
                    // style={{
                    //     objectFit: 'cover'
                    // }}
                />
            </div>
            <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
                {movie?.name || movie?.title || movie?.original_name}
            </h1>
            <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">{movie?.overview}</p>
            <div className="flex space-x-3">
                <button className="bannerButton bg-white text-black">
                    <FaPlay className="h-4 w-4 text-black md:h-6 md:w-6" /> Play
                </button>
                <button 
                    onClick={()=>{
                        setCurrentMovie(movie)
                        setShowModal(true)
                    }}
                    className="bannerButton bg-[gray]/70"
                >
                    <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
                </button>
            </div>
        </div>
    )
}
//add shadow to paragraph

export default Banner