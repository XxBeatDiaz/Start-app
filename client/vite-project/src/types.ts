export type Project = {
  _id?: string,
  name: string,
  description: string,
  createdAt: number,
  updatedAt?: number,
  filePaths?: string[], //ids of filePaths
  webLinks?: string[], //ids of webLinks
  type?: string[]
}
export type webLinks = {
  _id?: string,
  workspaceId?: string,
  name: string,
  url: string,
  createdAt: number
}

export type filePaths = {
  _id?: string,
  workspaceId?: string,
  name: string,
  path: string,
  createdAt: number
}
