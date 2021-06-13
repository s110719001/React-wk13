import { useContext } from "react";
import { Row, Col, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import ProductItem from "./ProductItem";
import { StoreContext } from "../store";


export default function ProductList() {
  const { state: { page: { products }, requestProducts: { loading } } } = useContext(StoreContext);
  const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;

  return (
    <>
    {loading
      ? (
        <div className="spinner-wrap">
          <Spin indicator={antIcon} className="spinner" />
        </div>
      ) : (
        <Row gutter={[40, 64]}>
          {products.map(product => (
            <Col
              key={product.id}
              sm={{ span: 24 }}
              xl={{ span: 8 }}
              xxl={{ span: 8 }}
            >
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )
    }
  </>
  );
}
