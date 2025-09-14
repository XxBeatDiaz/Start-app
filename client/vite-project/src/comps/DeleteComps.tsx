type deleteBtn = {
  deleteFunc: () => void
}

export default function DeleteComps({deleteFunc}: deleteBtn) {
  return (
    <div>
      <button onClick={deleteFunc}>
      <img src="../../public/delete.png" alt="deleted" />
    </button>
    </div>
    
  )
}
