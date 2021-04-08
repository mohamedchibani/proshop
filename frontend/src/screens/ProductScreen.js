import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, Card, Button, ListGroup, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({match, history}) => {

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))    
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    return (
        <>
        <Link to="/" className='btn btn-light my-3'>
            Go Back
        </Link>
        
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

            <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush' >
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Col>Price:</Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Col>Status:</Col>
                            <Col>
                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                            </Col>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x+1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}


                        <ListGroup.Item>
                            <Button 
                                onClick={addToCartHandler}
                                className='btn btn-block' 
                                type="button"
                                disabled={product.countInStock === 0 }>Add To Cart</Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>

        </Row>
         
        )}
        </>
        
    )
}

export default ProductScreen