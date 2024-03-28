import './userTable.scss';
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

const UserTable = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  // State
  const [list, setList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Get Data
  const { data, loading } = useFetch(`${path}/all-${path}`, {
    withCredentials: true,
  });

  useEffect(() => {
    if (searchInput) {
      const searchData = data.filter(
        (item) =>
          item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
          item._id.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.fullname.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.phone.toLowerCase().includes(searchInput.toLowerCase())
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
        await axios.delete(`${process.env.REACT_APP_API}/${path}/${id}`, {
          withCredentials: true,
        });
        setList((prev) => prev.filter((item) => item._id !== id));
      } else return;
    } catch (error) {
      window.alert(error.response.data);
    }
  };
  // Row
  const rows = list.map((item) => ({
    id: item._id,
    fullname: item.fullname,
    email: item.email,
    phone: item.phone,
    isConsultant: item.isConsultant,
    isAdmin: item.isAdmin,
  }));

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Users
        <br />
        <input
          type="text"
          placeholder="Enter Search"
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
                    <TableCell className="tableCell">Email</TableCell>
                    <TableCell className="tableCell">Phone</TableCell>
                    <TableCell className="tableCell">Role</TableCell>
                    <TableCell className="tableCell">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">{row.id}</TableCell>
                      <TableCell className="tableCell">
                        {row.fullname}
                      </TableCell>
                      <TableCell className="tableCell">{row.email}</TableCell>
                      <TableCell className="tableCell">{row.phone}</TableCell>

                      <TableCell className="tableCell">
                        {row.isAdmin
                          ? 'Admin'
                          : row.isConsultant
                          ? 'Consultant'
                          : 'Client'}
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

export default UserTable;
