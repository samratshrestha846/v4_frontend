import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from '../../../types/user/user';
import { capitalizeFirstLetter, prepareDynamicUrl } from '../../../helpers';
import { PROPERTY_VIEW } from '../../../constants/path';
import { can } from '../../../helpers/checkPermission';
import { READ_CUSTOMER_PROPERTY } from '../../../constants/permissions';

type Props = {
  user: User | undefined;
  isTitleInsideCard?: boolean;
};

const UserProperties: React.FC<Props> = ({ user, isTitleInsideCard }) => {
  const canReadProperty = can(READ_CUSTOMER_PROPERTY);
  return (
    <div>
      {!isTitleInsideCard && (
        <h5 className="mt-0 mb-2 text-primary-color">Assigned Properties</h5>
      )}

      {user?.customer_properties && user?.customer_properties?.length > 0 && (
        <Card className="tilebox-one">
          <Card.Body>
            {isTitleInsideCard && (
              <h5 className="mb-2 text-primary-color">Assigned Properties</h5>
            )}
            <div>
              {user?.customer_properties?.map((property) => (
                <span key={property.id} className="me-1 mb-2 separator">
                  {canReadProperty ? (
                    <Link
                      to={prepareDynamicUrl(PROPERTY_VIEW, property.id)}
                      target="_blank">
                      {capitalizeFirstLetter(property.name)}
                    </Link>
                  ) : (
                    capitalizeFirstLetter(property.name)
                  )}
                </span>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default UserProperties;
