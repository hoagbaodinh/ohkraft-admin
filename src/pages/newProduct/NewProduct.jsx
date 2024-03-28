import { useEffect, useState } from 'react';
import './newProduct.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const NewProduct = ({ edit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [info, setInfo] = useState({});

  // Nếu edit thì get data theo Id
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/products/get-product/${id}`
      );
      const { img1, img2, img3, img4, ...other } = res.data;
      setInfo(other);
      setAddedPhotos([img1, img2, img3, img4]);
    };
    if (edit) {
      fetchProduct();
    } else {
      setInfo({});
      setAddedPhotos([]);
    }
  }, [edit, id]);

  // Handle Change Input
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiem tra co du 4 hinh anh
    if (addedPhotos.length !== 4) {
      window.alert('Please choose 4 photos of product');
      return;
    } else {
      const productData = {
        ...info,
        img1: addedPhotos[0],
        img2: addedPhotos[1],
        img3: addedPhotos[2],
        img4: addedPhotos[3],
      };
      console.log(productData);
      try {
        // edit mode
        if (edit) {
          await axios.put(
            `${process.env.REACT_APP_API}/api/products/edit-product/${id}`,
            productData,
            {
              withCredentials: true,
            }
          );
          window.alert('Product edited successfully');
        }
        // new mode
        else {
          await axios.post(
            `${process.env.REACT_APP_API}/api/products/add-product`,
            productData,
            {
              withCredentials: true,
            }
          );
          window.alert('Product added successfully');
        }
        return navigate('/products');
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    }
  };

  // Upload Photo Fn
  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    setAddedPhotos([]);
    try {
      const { data: filenames } = await axios.post(
        `${process.env.REACT_APP_API}/api/products/upload-image`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      setAddedPhotos((prev) => [...prev, ...filenames]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="productTitle">
        <h1>{edit ? 'Edit' : 'Add New'} Product</h1>
      </div>
      <div className="productInputs">
        <form onSubmit={handleSubmit}>
          {/* Input */}

          <div className="formInput">
            <label>Product Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Product Name"
              value={info.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formInput">
            <label>Category</label>
            <input
              id="category"
              type="text"
              placeholder="Enter Category"
              onChange={handleChange}
              value={info.category || ''}
              required
            />
          </div>
          <div className="formInput">
            <label>Short Description</label>
            <textarea
              id="short_desc"
              type="text"
              placeholder="Enter Short Description"
              className="shortDescription"
              value={info.short_desc || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formInput">
            <label>Long Description</label>
            <textarea
              id="long_desc"
              type="text"
              className="longDescription"
              placeholder="Enter Long Description"
              value={info.long_desc || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formInput">
            <label>Price</label>
            <input
              id="price"
              type="number"
              placeholder="Enter Price"
              value={info.price || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formInput">
            <label>Stock</label>
            <input
              id="stock"
              type="number"
              placeholder="Product in Stock"
              value={info.stock || ''}
              onChange={handleChange}
              required
            />
          </div>

          {/* IsAdmin */}
          <div className="formInput">
            <label>Upload image (4 images)</label>
            <div className="images">
              {addedPhotos.length > 0 &&
                addedPhotos.map((photo, i) => (
                  <img
                    src={`${
                      photo && photo?.includes('http')
                        ? photo
                        : `${process.env.REACT_APP_API}/images/${photo}`
                    }`}
                    alt=""
                    key={i}
                  />
                ))}
            </div>
            <input
              type="file"
              id="file"
              multiple
              onChange={uploadPhoto}
              className="files"
              accept="image/png, image/jpg, image/jpeg"
              // style={{ display: 'none' }}
            />
          </div>
          {/* Submit */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default NewProduct;
