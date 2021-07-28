import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from "antd";


const FileUpload = ({ values, setValues, setLoading }) => {

    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadAndResize = (e) => {

        setLoading(true);
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if (files) {

            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (uri) => {
                    //  console.log(uri);

                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri },
                        {
                            headers: {
                                authtoken: user ? user.token : "",
                            },
                        })
                        .then((res) => {
                            console.log('Image uploaded RES DATA', res);
                            allUploadedFiles.push(res.data);
                            setValues({ ...values, images: allUploadedFiles });
                            setLoading(false);
                        })
                        .catch(err => {
                            console.log("Cloudinary Upload Error", err);
                            setLoading(false);
                        });


                }, "base64");
            }


        }

    }

    const handleImageRemove = (public_id) => {

        setLoading(true);
        // console.log(id);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, { public_id }, {
            headers: {
                authtoken: user ? user.token : ""
            }
        })
            .then((res) => {
                setLoading(false);
                const { images } = values;
                let filteredimages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setValues({ ...values, images: filteredimages });

            })
            .catch(err => {
                setLoading(false);
                console.log(err);

            })

    }

    return (
        <>

            <div className="row">
                {values.images && values.images.map((image) => (
                    <Badge count="X"
                        key={image.public_id} style={{ cursor: "pointer" }}
                        onClick={() => handleImageRemove(image.public_id)}>
                        <Avatar src={image.url}
                            size={100} className="ml-3"
                            shape="square"
                        />
                    </Badge>
                ))}
            </div>
            <br />
            <div className="row">
                <label className="btn btn-primary btn-raised">Choose File
                    <input type="file" multiple accept="images/*" hidden onChange={fileUploadAndResize} />
                </label>
            </div>
        </>
    );
}

export default FileUpload;