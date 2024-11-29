import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { BsBag } from "react-icons/bs";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const CardItem = ({ perfume, addToBag, showDetails }) => {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/products/${perfume.id}`);
  };

  return (
    <Card
      hoverable
      style={{
        width: 300,
        margin: "20px",
      }}
      cover={
        <img
          alt={perfume.name}
          src={perfume.image}
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />
      }
      actions={[
        <Button
          type="primary"
          icon={<BsBag />}
          style={{backgroundColor: "#d4af37",color:"black"}}
          onClick={() => addToBag(perfume.id)}
        >
          Add to Bag
        </Button>,
        !showDetails && (
          <Button
            type="default"
            icon={<InfoCircleOutlined />}
            onClick={handleShowDetails}
          >
            More Details
          </Button>
        ),
      ]}
    >
      <Meta
        title={perfume.name}
        description={
          <>
            <span>{perfume.price} $</span>
            {showDetails && (
              <>
                <div>
                  <strong>Size:</strong> {perfume.size}
                </div>
                <div>
                  <strong>Scent:</strong> {perfume.scent}
                </div>
                <div>
                  <strong>Description:</strong> {perfume.description}
                </div>
              </>
            )}
          </>
        }
      />
    </Card>
  );
};

export default CardItem;
