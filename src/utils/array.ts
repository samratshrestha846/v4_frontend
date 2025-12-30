// @flow
const groupByFields = (array: Array<any>, f: any): Array<any> => {
  /*
    params description :
        f : function which returnf the array of fields 
        e.g. :  (item) => {
            return [itemField1, itemField2];
        }
        array : array of data to group e.g. : [{...}, {...}]       
    */
  const groups: { [key: string]: Array<any> } = {};
  array.forEach((o) => {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map((group) => {
    return groups[group];
  });
};

// eslint-disable-next-line import/prefer-default-export
export { groupByFields };
