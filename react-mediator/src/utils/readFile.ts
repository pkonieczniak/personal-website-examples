interface ReadFile {
  (
    fileList: FileList, 
    onStart: Function, 
    onDone: (errors: string[], files: string[]) => void,
  ): Promise<any>
}

export const readFile: ReadFile = async (fileList, onStart, onDone ) => {
  const files: File[] = Array.from(fileList)
  const errors: string[] = []
  const base64Files: string[] = []
  
  onStart()

  await Promise.all(files.map(file => {
    const reader = new FileReader()
    return new Promise(resolve => {
      reader.onloadend = (() => {
        base64Files.push(reader.result as string)
        resolve()
      })
      reader.onerror = (() => {
        errors.push(`Cannot preview ${file.name}: ${reader.error}`)
        resolve()
      })
      reader.readAsDataURL(file)
    })
  }))

  onDone(errors, base64Files)
}