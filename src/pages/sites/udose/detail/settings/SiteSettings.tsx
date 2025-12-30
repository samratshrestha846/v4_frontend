import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import initialStoreState from '../../../../../types/redux/store-type';
import CustomLoader from '../../../../../components/CustomLoader';
import {
  capitalizeFirstLetter,
  convertToSentence,
} from '../../../../../helpers';

const SiteSettings: React.FC = () => {
  const stateSite = useSelector((state: initialStoreState) => state.Site);
  const { siteDetail: udoseDetail, loading } = stateSite;

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Site Settings
      </Card.Header>
      <Card.Body>
        <Table responsive striped hover>
          <tbody>
            {udoseDetail?.site_settings?.map((item: any) => (
              <tr key={item.key}>
                <td>{convertToSentence(item.key)}</td>
                <td>{capitalizeFirstLetter(item.value)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
export default SiteSettings;
