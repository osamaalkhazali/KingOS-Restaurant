import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate  } from 'react-router-dom';
import './tableCard.css'

function TableCard({tableNumber, tableCapacity,tableOrderLink , tableQR}) {
  const navigate = useNavigate ()
  return (
    <Card className="table-card shadow-sm border-0">
            <Card.Body className="p-4">
                <Card.Title className="text-center fs-4 fw-bold">Table {tableNumber}</Card.Title>
                <Card.Text className="text-center mb-4">Capacity: {tableCapacity}</Card.Text>
                {tableQR && (
                    <div className="text-center">
                        <img src={tableQR  || 'https://cdn-icons-png.flaticon.com/512/5247/5247756.png' } alt="QR Code" className="qr-image" />
                    </div>
                )}
                <div className="text-center">
                  <br/>
                    <Button 
                        onClick={() => navigate(tableOrderLink)} 
                        variant="primary"
                        className="w-100 rounded-pill py-2"
                    >
                        Order Now
                    </Button>
                </div>
            </Card.Body>
        </Card>
  );
}

export default TableCard;