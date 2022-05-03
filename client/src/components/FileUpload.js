import React, {Fragment} from 'react';

const FileUpload = () => {
  return(
    <Fragment>
      <form>
        <div className='custom-file mb-4'>
          <input className="form-control" type="file" id="formFileMultiple" multiple />
        </div>
        <input type='submit' value='Upload' className='btn btn-primary mt-4 form-control' />
      </form>
    </Fragment>
  )
}

export default FileUpload;
