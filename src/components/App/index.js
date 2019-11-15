import React from 'react'

import Home from '../Home'

class App extends React.Component {

    constructor(props) {

        super(props);
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     return null;
    // }

    componentDidMount() {

        this.queryList();
    }

    queryList = () => {

        console.log(1);
    }


    render() {

        return (

            <div className='App-view'>
                <Home/>
            </div>

        )

    }

}

export default App;