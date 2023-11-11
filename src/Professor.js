import "./Professor.css"

const Professor = ({info}) => {
  console.log(info);

  return (
    <div className="Tile">
      <h2>{info?.node?.firstName} {info?.node?.lastName} </h2>
    </div>
  )
}

export default Professor;
