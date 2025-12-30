import { ProfilePic } from '../../../assets/images';
import { Card } from 'react-bootstrap';

const CustomerProfileDetails = ({ customer }: { customer: any }) => {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex flex-column gap-0 justify-content-center profile-card">
          <div className="d-flex gap-1 align-items-center">
            <img
              src={ProfilePic}
              className="rounded-circle border-1 border-primary"
              width="32"
              height="32"
              alt="Profile"
            />
            <div className="d-flex flex-column align-content-center justify-content-center ">
              <h5 className="p-0 m-0">{customer?.business_name}</h5>
              <p className="text-black-50 mb-0 font-12">{customer?.email} </p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomerProfileDetails;
