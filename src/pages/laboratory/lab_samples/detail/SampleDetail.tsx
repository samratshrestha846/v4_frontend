/* eslint-disable react/no-danger */
import React, { FC } from 'react';
import { Card, Table } from 'react-bootstrap';
import { capitalizeFirstLetter, formattedShortDate } from '../../../../helpers';
import { LabSample } from '../../../../types/lab/labSampleList';

type Props = {
  labSample: LabSample | undefined;
};

const SampleDetail: FC<Props> = ({ labSample }) => {
  const formatNameUnit = (element: any) => {
    return element.unit
      ? `${element.name} (${element.unit})`
      : `${element.name}`;
  };

  return (
    <Card>
      <Card.Header as="h5" className="text-primary-color">
        Lab Sample Detail
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table className=" table table-sm mb-0">
            <tbody>
              <tr>
                <td className=" border-0">
                  <h6 className="font-14 m-0"> Customer Property</h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.customer_property?.name ?? '-'}
                  </p>
                </td>
                <td className=" border-0">
                  <h6 className="font-14 m-0">Site </h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.site?.name ?? '-'}
                  </p>
                </td>
                <td className=" border-0">
                  <h6 className="font-14 m-0"> Sample ID</h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.sample_id ?? '-'}
                  </p>
                </td>
                <td className=" border-0">
                  <h6 className="font-14 m-0">Sample Type </h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.lab_sample_type?.name ?? '-'}
                  </p>
                </td>
              </tr>

              <tr>
                <td className=" border-0">
                  <h6 className="font-14 m-0">Test Type </h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.lab_test_param?.test_type
                      ? capitalizeFirstLetter(
                          labSample?.lab_test_param?.test_type
                        )
                      : '-'}
                  </p>
                </td>
                <td className=" border-0">
                  <h6 className="font-14 m-0">Sample Kind </h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.sample_kind ?? '-'}
                  </p>
                </td>
                <td className=" border-0">
                  <h6 className="font-14 m-0">Sample Taken By</h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.sample_taken_by
                      ? `${labSample?.sample_taken_by?.first_name} ${labSample?.sample_taken_by?.last_name}`
                      : '-'}
                  </p>
                </td>
                <td className=" border-0">
                  <h6 className="font-14 m-0">Collected On </h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.collected_datetime
                      ? formattedShortDate(labSample?.collected_datetime)
                      : '-'}
                  </p>
                </td>
              </tr>

              <tr>
                <td className=" border-0">
                  <h6 className="font-14 m-0">Received On </h6>
                  <p className="text-sm lh-150 mb-0">
                    {formattedShortDate(labSample?.received_datetime)}
                  </p>
                </td>

                <td className=" border-0">
                  <h6 className="font-14 m-0">Location (Lat , Long) </h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.latitude && labSample?.longitude
                      ? `( ${labSample?.latitude} , ${labSample?.longitude} )`
                      : '-'}
                  </p>
                </td>
                <td className=" border-0">
                  <h6 className="font-14 m-0">File </h6>
                  {labSample?.file_url ? (
                    <p className="text-sm lh-150 mb-0">
                      <a
                        href={labSample?.file_url}
                        target="_blank"
                        rel="noreferrer">
                        <i className="bx bxs-file-pdf" />
                        View File
                      </a>
                    </p>
                  ) : (
                    <p className="text-sm lh-150 mb-0"> - </p>
                  )}
                </td>
              </tr>

              <tr>
                <td className=" border-0" colSpan={2}>
                  <h6 className="font-14 m-0">Grass Species </h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.grass_species ?? '-'}
                  </p>
                </td>
                <td className=" border-0" colSpan={2}>
                  <h6 className="font-14 m-0">Animal Specs </h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.animal_specs ?? '-'}
                  </p>
                </td>
              </tr>

              <tr>
                <td className=" border-0" colSpan={2}>
                  <h6 className="font-14 m-0">Paddock </h6>
                  <p className="text-sm lh-150 mb-0">
                    {labSample?.paddock ?? '-'}
                  </p>
                </td>
                <td className=" border-0" colSpan={2}>
                  <h6 className="font-14 m-0">Comments </h6>
                  {labSample?.comments ? (
                    <div
                      className="text-sm lh-150 mb-0"
                      dangerouslySetInnerHTML={{
                        __html: `${labSample.comments}`,
                      }}
                    />
                  ) : (
                    <p className="text-sm lh-150 mb-0">-</p>
                  )}
                </td>
              </tr>
              <tr>
                <td className=" border-0" colSpan={4}>
                  <h6 className="font-14 mt-0">Test Parameters</h6>
                  <ul className="nav horizontal-list">
                    {labSample &&
                      labSample.default_test_parameters !== null &&
                      labSample?.default_test_parameters.length > 0 &&
                      labSample.default_test_parameters.map((item) => (
                        <li key={item.name}>
                          {item.sub_params
                            ? item.sub_params?.map((subParamItem: any) =>
                                formatNameUnit(subParamItem)
                              )
                            : formatNameUnit(item)}
                        </li>
                      ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SampleDetail;
