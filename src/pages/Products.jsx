import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { filterProductsCategoryThunk } from "../store/slices/products.slice";

const Products = () => {
  const { id } = useParams();
//   const [news, setNews] = useState({});
     const [products, setProducts] = useState({});
     const allProducts = useSelector((state) => state.products);

  //console.log(news.id);
  //console.log(id);

  const productsFiltered = allProducts.filter((products) => products.id !== Number(id));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // axios.get(`https://news-app-api.academlo.tech/news/${id}/`).then((res) => {
       axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/categories/${id}/`).then((res) => {
      setProducts(res.data);
    //   dispatch(filterNewsCategoryThunk(res.data.category.id));
      dispatch(filterProductsCategoryThunk(res.data.category.id));
    });
  }, [id]);

//   const newsList = useSelector(state => state.news);
     const productsList = useSelector(state => state.products);
//   const newsFound = newsList.find(newsItem => newsItem.id === Number(id));
     const productsFound = productsList.find(productsItem => productsItem.id === Number(id));
//  const relatedNews= newsList.filter(newsItem => newsItem.category.id === newsFound.category.id && 
     const relatedProducts= productsList.filter(productsItem => productsItem.category.id === productsFound.category.id && 
     productsItem.id !==productsFound.id
  )
  console.log(productsFound);

  return (
    <div>
      <h1>{products.title}</h1>
     
      <Row>
        {/* Descripcion del producto */}
        <Col lg={9}>
          <img src={products.image} alt="" className="img-fluid" />
           <p className="text-muted">
           {productsFound?.image_description}
           </p>
           {productsFound?.body.map(p => (
            <p key={p.id}>
             {p.paragrap}
            </p>
           ))} 
        </Col>
        {/* Productos  relacionados */}
        <Col lg={3}>
          <h1>Related Products</h1>
          <p>{news.lead}</p>
          <ListGroup variant="flush">
            {productsFiltered.map((productsItem) => (
              <ListGroup.Item key={products.id}>
                <li
                  key={productsItem.id}
                  onClick={() => navigate(`/products/${products.id}`)}
                >
                  <Link to={`/products/${productsItem.id}`}>
                    <img src={productsItem.image} alt="" className="img-fluid"/>
                    {productsItem.headline}
                  </Link>
                </li>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default Products;
