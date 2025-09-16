export type Project = {
  _id?: string,
  name: string,
  description: string,
  createdAt: number,
  updatedAt?: number,
  filePaths?: filePaths[], 
  webLinks?: webLinks[], 
  type?: string[]
}
export type webLinks = {
 
  name: string,
  url: string,
  createdAt: number
}

export type filePaths = {
  name: string,
  path: string,
  createdAt: number
}
