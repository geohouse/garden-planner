export default function Button(props) {
  return (
    <button className="ui-button" type={props.type} disabled={props.disabled}>
      {props.children}
    </button>
  );
}
