import useFetch from '../../hooks/useFetch';
import './transaction.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import formatPrice from '../../util/format-price';

const TransactionPage = ({ pSize, title }) => {
  // Get data
  const { data, loading } = useFetch(`order/all-orders`, {
    withCredentials: true,
  });

  // Row DataGrid
  const rows = data.map((item) => ({
    id: item._id,
    name: item.fullname,
    phone: item.phone,
    address: item.address,
    total: item.total_price,
    delivery: item.delivery,
    status: item.status,
  }));

  return (
    <div className="transaction">
      <div className="transactionTitle">{title}</div>
      {loading ? (
        'Loading...'
      ) : data.length === 0 ? (
        'No Transaction Found'
      ) : (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">ID User</TableCell>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Phone</TableCell>
                <TableCell className="tableCell">Address</TableCell>
                <TableCell className="tableCell">Total</TableCell>
                <TableCell className="tableCell">Delivery</TableCell>
                <TableCell className="tableCell">Status</TableCell>
                <TableCell className="tableCell">Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tableCell">{row.id}</TableCell>
                  <TableCell className="tableCell">{row.name}</TableCell>
                  <TableCell className="tableCell">{row.phone}</TableCell>
                  <TableCell className="tableCell">{row.address}</TableCell>
                  <TableCell className="tableCell">
                    {formatPrice(row.total)}
                  </TableCell>
                  <TableCell className="tableCell">{row.delivery}</TableCell>
                  <TableCell className="tableCell">{row.status}</TableCell>
                  <TableCell className="tableCell">
                    <button className="tableBtn">View</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default TransactionPage;
