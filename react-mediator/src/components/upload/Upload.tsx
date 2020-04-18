import React, { FC, useState } from 'react'
import { UploadInput } from './UploadInput'
import { UploadPreview } from './UploadPreview'

interface UploadState {
  errors: string[],
  files: string[],
  isLoading: boolean
}

export const Upload: FC = () => {
  const [uploadState, setUploadState] = useState<UploadState>({ 
    errors: [], 
    files: [],
    isLoading: false 
  })
  
  const onUploadStart = () => {
    setUploadState({ ...uploadState, isLoading: true })
  }

  const onUploadDone = (errors: string[], files: string[]) => {
    setUploadState({ 
      errors, 
      files,
      isLoading: false 
    })
  }

  return (
    <React.Fragment>
      <UploadInput 
        onUploadStart={onUploadStart} 
        onUploadDone={onUploadDone} 
      />
      <UploadPreview 
        isLoading={uploadState.isLoading} 
        files={uploadState.files} 
        errors={uploadState.errors}
      />
    </React.Fragment>
  )
} 