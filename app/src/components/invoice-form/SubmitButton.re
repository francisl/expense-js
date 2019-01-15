let component = ReasonReact.statelessComponent("SubmitButton");

let make = (~text, ~onClick, _children) => {
  let click = (event, _) => {
    onClick(event);
  };
  {
    ...component,
    render: (self) =>
      MaterialUi.(<Button onClick={self.handle(click)} variant=`Contained color=`Primary>
        {ReasonReact.string(text)}
      </Button>), 
  }
};

[@bs.deriving abstract]
type jsProps = {
  text: string,
  onClick: ReactEvent.Mouse.t => unit
};

let jsSubmitButton =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~text=jsProps->textGet,
      ~onClick=jsProps->onClickGet,
      [||],
    )
  );