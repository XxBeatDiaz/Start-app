import { Link } from 'react-router'
import '../stayles/update.css'

type Update = {
  path: string
  children: React.ReactNode
}


export default function UpdateComps({path, children}: Update) {
  return (
    <div>
      <Link to={path}>{children}</Link>
    </div>
  )
}
