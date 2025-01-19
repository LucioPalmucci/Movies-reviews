import React from 'react';
import { Carousel } from 'react-bootstrap';
import Comment from './Comment';

export default function SliderComments() {
    const comments = [
        { nombre: "Ana", comentario: "The personalized recommendations are fantastic. I always discover hidden gems thanks to this site.", pfp: "https://randomuser.me/api/portraits/women/12.jpg" },
        { nombre: "Pablo", comentario: "I love the variety of reviews and recommendations they offer. I always find something new to watch.", pfp: "https://randomuser.me/api/portraits/men/1.jpg" },
        { nombre: "Pedro", comentario: "The site design is very intuitive and easy to navigate. I find everything I need quickly.", pfp: "https://randomuser.me/api/portraits/men/8.jpg" },
        { nombre: "María", comentario: "The reviews are very complete and detailed. They always help me decide what to watch.", pfp: "https://randomuser.me/api/portraits/women/11.jpg" },
        { nombre: "Juan", comentario: "I love this site! I always find the best movies and TV shows to watch.", pfp: "https://randomuser.me/api/portraits/men/12.jpg" },
        { nombre: "Sofía", comentario: "The recommendations are very accurate. I always find something I like.", pfp: "https://randomuser.me/api/portraits/women/15.jpg" },
        { nombre: "Luis", comentario: "The site is very useful and practical. I always recommend it to my friends.", pfp: "https://randomuser.me/api/portraits/men/4.jpg" },
        { nombre: "Elena", comentario: "The reviews are very professional and well-written. I always learn something new.", pfp: "https://randomuser.me/api/portraits/women/5.jpg" },
        { nombre: "Carlos", comentario: "I love the community of movie lovers on this site. I always find great recommendations.", pfp: "https://randomuser.me/api/portraits/men/6.jpg" },
    ];

    const chunkSize = 3;
    const comChunks = [];
    for (let i = 0; i < comments.length; i += chunkSize) {
        comChunks.push(comments.slice(i, i + chunkSize));
    }

    return (
        <div className='p-4 font-Rubik mt-16'>
            <h1>Comments</h1>
            <Carousel className='my-6'>
                {comChunks.map((commentGroup, index) => {
                    return (
                        <Carousel.Item key={index}>
                            <div className='flex h-52'>
                                {commentGroup.map((comment, idx) => (
                                    <Comment
                                        key={idx}
                                        nombre={comment.nombre}
                                        comentario={comment.comentario}
                                        pfp={comment.pfp}
                                    />
                                ))}
                            </div>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    );
}