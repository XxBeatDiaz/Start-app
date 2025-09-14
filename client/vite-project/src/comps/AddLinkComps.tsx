type addFunc = {
  addLink: () => void;
}


export default function AddLinkComps({addLink}: addFunc) {
  return (
    <div>
      <button onClick={ addLink}>
        Add link +
      </button>
    </div>
  )
}
