export const PreviewReact = () => {
  const handleClick = async () => {
    const res = await fetch('http://localhost:3000')
    console.log({ res })
  }

  return (
    <div>
      React
      <button onClick={handleClick}>fetch</button>
    </div>
  )
}
