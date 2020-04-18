import React, { FC } from 'react'

interface UploadPreviewProps {
  files: string[],
  errors: string[],
  isLoading: boolean
}

export const UploadPreview: FC<UploadPreviewProps> = ({ isLoading, files, errors }) => {
  if (isLoading) {
    return (
      <div className="spinner-border mt-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>      
    )
  }
  
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12 p-0">
          <p>Preview</p>
        </div>
        {files.map((file, index) => {
          return <img className="img-fluid rounded" src={file} key={index} alt="..." />
        })}
        {errors.map((error, index) => {
          return (
            <div className="alert alert-primary" role="alert" key={index}>
              {error}
            </div>
          )
        })}        
      </div>
    </div>
  )
} 