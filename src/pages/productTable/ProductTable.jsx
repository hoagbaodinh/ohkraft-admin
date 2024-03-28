import './productTable.scss';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import formatPrice from '../../util/format-price';

const ProductTable = ({ title }) => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  // State
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Get Data
  const { data, loading } = useFetch(`${path}/all-${path}`);

  // Search
  useEffect(() => {
    if (searchInput) {
      const searchData = data.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setList(searchData);
    } else {
      setList(data);
    }
  }, [data, searchInput]);

  // Delete Handler
  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete')) {
        await axios.delete(`${process.env.REACT_APP_API}/api/${path}/${id}`, {
          withCredentials: true,
        });
        setList((prev) => prev.filter((item) => item._id !== id));
      } else return;
    } catch (error) {
      if (error.response) {
        window.alert('Something went wrong!');
        return;
      }
    }
  };
  // Row
  const rows = list.map((item) => ({
    id: item._id,
    name: item.name,
    price: formatPrice(item.price),
    image: item.img1,
    category: item.category,
  }));

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Products
        <br />
        <input
          type="text"
          placeholder="Product name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {loading
        ? 'Loading...'
        : list && (
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">ID </TableCell>
                    <TableCell className="tableCell">Name</TableCell>
                    <TableCell className="tableCell">Price</TableCell>
                    <TableCell className="tableCell">Image</TableCell>
                    <TableCell className="tableCell">Category</TableCell>
                    <TableCell className="tableCell">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">{row.id}</TableCell>
                      <TableCell className="tableCell">{row.name}</TableCell>
                      <TableCell className="tableCell">{row.price}</TableCell>
                      <TableCell className="tableCell">
                        <img
                          src={`${
                            row.image.includes('http')
                              ? row.image
                              : `${process.env.REACT_APP_API}/images/${row.image}`
                          }`}
                          alt=""
                          style={{ width: '50px' }}
                        />
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.category}
                      </TableCell>
                      <TableCell className="tableCell">
                        <div className="cellAction">
                          <Link
                            to={`/${path}/edit/${row.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <div className="editButton">Update</div>
                          </Link>
                          <button
                            className="deleteButton"
                            onClick={() => handleDelete(row.id)}
                          >
                            Delete
                          </button>
                        </div>
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

export default ProductTable;
