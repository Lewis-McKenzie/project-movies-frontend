import { useEffect, useRef } from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react'

export interface Review {
    body: string;
}
  
interface Movie {
    poster: string;
}

interface ReviewsProps {
    getMovieData: (movieId: string) => void;
    movie: Movie;
    reviews: Review[];
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

const Reviews = ({getMovieData, movie, reviews, setReviews}: ReviewsProps) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId as string;
    getMovieData(movieId);

    useEffect(() => {
        console.log("Here");
    }, [])

    const addReview = async (e: any) => {
        e.preventDefault();

        const rev: any = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", {reviewBody:rev.value, id: movieId});

            const updatedReviews = [...reviews, {body:rev.value}];

            rev.value = "";

            setReviews(updatedReviews);
        }
        catch(err) {
            console.log(err)
        }

    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <img src={movie.poster} alt=""/>
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText='Write a review'/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews.map((r: any) => {
                        return (
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
    </Container>
  )
}

export default Reviews