import React from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { BsBag } from "react-icons/bs";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useBag } from "../../context/BagContext"; // Import the BagContext

const { Meta } = Card;

const CardItem = ({ perfume, showDetails }) => {
  const navigate = useNavigate();
  const { addToBag } = useBag(); // Use addToBag directly from the context

  const handleShowDetails = () => {
    navigate(`/products/${perfume._id}`);
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
          style={{ backgroundColor: "#f8f7f1", color: "black" }}
          onClick={() => addToBag(perfume._id)} // Call addToBag from the context
        >
          Add to Bag
        </Button>,
        !showDetails && (
          <Button
                type="default"
                icon={<InfoCircleOutlined />}
              onClick={handleShowDetails}
                className="custom-button"
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
