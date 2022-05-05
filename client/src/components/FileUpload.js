import React, {Fragment, useState} from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  }

  const onSubmitForm = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try{
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100)/progressEvent.total)));
          setTimeout(()=>setUploadPercentage(0), 10000);
        }

      });



      const {fileName, filePath} = res.data;
      setUploadedFile({fileName, filePath});
      setMessage('File Uploaded');
    } catch(err) {
      if (err.response.status == 500) {
        setMessage('Problem with Server');
      } else {
        setMessage(err.response.data.msg);
      }
    }

  };

  return(
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmitForm}>
        <div className='custom-file mb-4'>
          <input className="form-control" type="file" id="formFileMultiple" multiple onChange={onChange} />
        </div>
        <Progress percentage = {uploadPercentage} />
        <input type='submit' value='Upload' className='btn btn-primary mt-4 form-control' />
      </form>
      {
        uploadedFile ?
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{width: '100%'}} src={uploadedFile.filePath} alt='' />
          </div>
        </div> : null
      }
    </Fragment>
  )
}

export default FileUpload;
