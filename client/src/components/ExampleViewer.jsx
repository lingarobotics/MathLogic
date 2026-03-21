function ExampleViewer({ example }) {
  if (!example) return null;

  return (
    <div className="example-container">
      <h4>Example</h4>
      <p className="example-text">{example.content}</p>
    </div>
  );
}

export default ExampleViewer;