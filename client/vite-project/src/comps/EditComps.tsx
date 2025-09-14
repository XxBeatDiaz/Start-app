type EditFunc = {
  edit: () => void;
}

export default function EditComps({edit}: EditFunc) {
  return (
    <div>
      <button onClick={edit}>
        <img src="../../public/edit.png" alt="edit" />
      </button>
    </div>
  )
}
