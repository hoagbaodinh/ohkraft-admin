import { useEffect, useState } from 'react';
import './newUser.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const NewUser = ({ edit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [info, setInfo] = useState({});

  // Nếu edit thì get data theo Id
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/users/get-user/${id}`,
        {
          withCredentials: true,
        }
      );
      setInfo(res.data);
    };
    if (edit) {
      fetchUser();
    } else {
      setInfo({});
    }
  }, [edit, id]);

  // Handle Change Input
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleChangeOption = (e) => {
    let value;
    if (e.target.value === 'true') {
      value = true;
    } else if (e.target.value === 'false') {
      value = false;
    } else {
      value = e.target.value;
    }
    setInfo((prev) => ({ ...prev, [e.target.id]: value }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!info.phone || !info.fullname) {
      window.alert('You must fill all required fields');
      return;
    }
    const userData = {
      ...info,
    };
    try {
      // Neu dang la edit mode
      if (edit) {
        await axios.put(
          `${process.env.REACT_APP_API}/api/users/edit-user/${id}`,
          userData,
          {
            withCredentials: true,
          }
        );
        window.alert('User edited successfully');
      } else {
        if (!info.email || !info.password) {
          window.alert('You must fill all required fields');
          return;
        } else if (info.password.length < 8) {
          window.alert('Password must be at least 8 characters');
          return;
        }
        await axios.post(
          `${process.env.REACT_APP_API}/api/auth/register`,
          userData
        );
        window.alert('User added successfully');
      }
      return navigate('/users');
    } catch (error) {
      if (error.response) {
        window.alert('Something went wrong!');
        console.log(error.response);
        return;
      }
    }
  };

  return (
    <>
      <div className="productTitle">
        <h1>{edit ? 'Edit' : 'Add New'} User</h1>
      </div>
      <div className="productInputs">
        <form onSubmit={handleSubmit}>
          {/* Input */}

          {/* Fullname */}
          <div className="formInput">
            <label>Full Name</label>
            <input
              id="fullname"
              type="text"
              placeholder="Enter Full Name"
              value={info.fullname || ''}
              onChange={handleChange}
              required
            />
          </div>

          {!edit && (
            <>
              {/* Email */}
              <div className="formInput">
                <label>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  value={info.email || ''}
                  required
                />
              </div>

              {/* Password */}
              <div className="formInput">
                <label>Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={info.password || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {/* Phone */}
          <div className="formInput">
            <label>Phone</label>
            <input
              id="phone"
              type="text"
              placeholder="Enter Phone Number"
              value={info.phone || ''}
              onChange={handleChange}
              required
            />
          </div>

          {/* is Consultant */}
          <div className="formInput">
            <label>Consultant</label>
            <select
              id="isConsultant"
              onChange={handleChangeOption}
              value={info.isConsultant}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          {/* is Admin */}
          <div className="formInput">
            <label>Admin </label>
            <select
              id="isAdmin"
              onChange={handleChangeOption}
              value={info.isAdmin}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          {/* Submit */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default NewUser;
