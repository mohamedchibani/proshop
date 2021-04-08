import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    return (
        <>
            <h1>Lastest Products</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>
            )}
            
        </>
    )
}

export default HomeScreen;