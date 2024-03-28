import './widget.scss';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import useFetch from '../../hooks/useFetch';
import formatPrice from '../../util/format-price';

const Widget = ({ type }) => {
  let dataWidget;

  // Dựa vào type truyền vào để xác định loại Widget
  switch (type) {
    case 'user':
      dataWidget = {
        title: 'Clients',
        isMoney: false,
        url: 'users/num-of-users',
        icon: <PersonAddOutlinedIcon className="icon" />,
      };
      break;
    case 'order':
      dataWidget = {
        title: 'New Order',
        isMoney: false,
        url: 'order/num-of-orders',
        icon: <NoteAddOutlinedIcon className="icon" />,
      };
      break;
    case 'earning':
      dataWidget = {
        title: 'Earings of Month',
        isMoney: true,
        url: 'order/total-earning',
        icon: <AttachMoneyIcon className="icon" />,
      };
      break;

    default:
      break;
  }
  const { data, loading } = useFetch(dataWidget.url, {
    withCredentials: true,
  });

  return (
    <div className="widget">
      <div className="left">
        <span className="counter">
          {loading ? (
            'Loading..'
          ) : (
            <>
              {dataWidget.isMoney ? (
                <p>
                  {formatPrice(data)}
                  <sup>VND</sup>
                </p>
              ) : (
                <p>{data}</p>
              )}
            </>
          )}
        </span>
        <span className="title">{dataWidget.title}</span>
      </div>
      <div className="right">{dataWidget.icon}</div>
    </div>
  );
};

export default Widget;
