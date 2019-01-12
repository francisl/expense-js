let component = ReasonReact.statelessComponent("Filter");
let handleClick = (_event, _self) => Js.log("clicked!");

/* 
   Which desugars to
   `ReasonReact.element(Component1.make(~message="hello", [||]))` */
let make = (~message, _children) => {
  ...component,
  render: _ =>
    MaterialUi.(<Button variant=`Contained color=`Primary>
      {ReasonReact.string(message)}
    </Button>),
};

[@bs.deriving abstract]
type jsProps = {
  message: string
};

let jsFilter =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~message=jsProps->messageGet,
      [||],
    )
  );