type UpdateFunc = {
  update: () => void;
}


export default function UpdateComps({update}: UpdateFunc) {
  return (
    <div>
      <button onClick={update}>update</button>
    </div>
  )
}
