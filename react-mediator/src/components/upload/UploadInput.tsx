import React, { FC, ChangeEvent } from 'react'
import { readFile } from '../../utils'

export const UploadInput: FC<any> = ({ onUploadStart, onUploadDone }) => {
  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    await readFile(
      event.target.files,
      onUploadStart,
      onUploadDone 
    )
  }
  
  return (
    <div className="custom-file">
      <label htmlFor="file-upload" className="custom-file-label">Select files</label>
      <input 
        id="file-upload" 
        className="custom-file-input"
        name="file-upload" 
        type="file" 
        accept="image/*" 
        multiple
        onChange={onChange}
      >
      </input>
    </div>
  )
} 