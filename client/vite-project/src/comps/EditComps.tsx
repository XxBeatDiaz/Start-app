import '../stayles/edit.css'

type EditFunc = {
  edit: () => void;
}

export default function EditComps({edit}: EditFunc) {
  return (
    <div>
      <button onClick={edit} className='btn-edit'>
        <img src="../../public/edit.png" alt="edit" className='img-btn'/>
      </button>
    </div>
  )
}
