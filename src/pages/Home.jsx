import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  filterProductsCategoryThunk,
  filterProductsThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [productsSearch, setProductsSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories/")
      .then((res) => setCategories(res.data));
  }, []);

  //console.log(categories);

  return (
    <div>
      <Row>
        <Col lg={3}>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => dispatch(filterProductsCategoryThunk(category.id))}   
                style={{cursor: 'pointer'}}            
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col lg={9}>
          <h1>Home</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={productsSearch}
              onChange={(e) => setProductsSearch(e.target.value)}
            />
            <Button
            //   onClick={() => dispatch(filterNewsHeadlineThunk(newsSearch))} */}
              onClick={() => dispatch(filterProductsThunk(productsSearch))}
              variant="outline-secondary"
              id="button-addon2"
            >
              Button
            </Button>
          </InputGroup>
          {/* Products */}
          <Row xs={1} md={2} lg={3} className="g-4">
            {productsList.map((products) => (
              <Col key={products.id}>
                <Card>
                  <Link to={`/products/${products.id}`} style={{textDecoration:"none"}}>
                    <Card.Img
                      variant="top"
                      src={products.images[0].url}
                      style={{ height: 200, objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{products.title}</Card.Title>
                      {/* <Card.Text>{products.lead}</Card.Text> */}
                      <Card.Text>{products.lead}</Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>      
        </Col>
      </Row>
    </div>
  );
};

export default Home;