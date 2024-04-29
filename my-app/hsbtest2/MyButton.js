function MyButton(props) {
    const [isClicked, setIsclicked] = React.useState(false);

    return React.createElement(
        'buuton',
        { onClick: () => setIsclicked(true) },
        isClicked ? 'Clicked!' : 'Click here!'
    )
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(myButton));