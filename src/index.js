import React from 'react'

import Home from './components/Home'

class Layout extends React.Component {

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

            <div className='layout-home'>
                <Home/>
            </div>

        )

    }

}

export default Layout;