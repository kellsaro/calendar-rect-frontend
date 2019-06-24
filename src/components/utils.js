import moment from 'moment';

export const formatedDate = (d) => {
  return d ? moment(d).format('MMMM DD YYYY, h:mm:ss a ') : '';
}
