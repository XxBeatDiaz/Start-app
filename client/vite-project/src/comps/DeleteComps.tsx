import '../stayles/delete.css'

type deleteBtn = {
  deleteFunc: () => void
}

export default function DeleteComps({deleteFunc}: deleteBtn) {
  return (
    <div>
      <button onClick={deleteFunc} className='btn-delete'>
      <img src="../../public/delete.png" alt="deleted" className='img-btn'/>
    </button>
    </div>
    
  )
}
