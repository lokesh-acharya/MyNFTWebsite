import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveFile3 } from '../actions/bagActions';
import MintRequestSteps from '../components/MintRequestSteps';

import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'


export default function FileOneScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const bag = useSelector((state) => state.bag);
  const { file3 } = bag;

  if (!userInfo) {
    props.history.push('/signin');
  }

  const [name, setName] = useState(file3.name);
  const [desc, setDesc] = useState(file3.desc);
  const [file, setFile] = useState([])
  // const random = Math.floor(Math.random()*1000000000)
  
  const _random = Math.floor(Math.random()*1000000000);
  const [random, setRandom] = useState(_random);
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    var filename = file[0].filename;
    var extension = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
    dispatch(saveFile3({
      name: name,
      desc: desc,
      file: `${random}.${extension}`
    }));
    props.history.push('/placemint');
  };

  return (
    <div>
      <MintRequestSteps step1 step2 step3 step4></MintRequestSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>File 3</h1>
        </div>
        <div>
          <label htmlFor="File Name">File Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter file name"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="File Description">File Description</label>
          <input
            type="text"
            id="desc"
            placeholder="Enter file description"
            value={desc || ''}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></input>
        </div>
        <FilePond
          files={file}
          onupdatefiles={setFile}
          allowMultiple={false} 
          server=
          {
            {
              url: `http://localhost:5000/api/upload/${userInfo._id}/${random}`,
              process: {
                headers: {
                  'Authorization': `Bearer ${userInfo.token}`
                },
              }
            }
          }
          name="file"
          labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
        />
        {/* <div>
          <label htmlFor="File">File</label>
          <input
            type="file"
            id="file"
            placeholder="Choose file"
            ref={file}
            required
          ></input>
        </div> */}
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}