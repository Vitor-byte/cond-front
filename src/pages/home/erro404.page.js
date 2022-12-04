import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';

class ErrorPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            redirectTo: null
        }
    }   

    componentDidMount(){

    }
    render() {
        if(this.state.redirectTo){
            return(
                <Redirect to={this.state.redirectTo}/>
            )
        }
        return (
            <div className="container">
                <PageTop title={"404"} desc={"Página não encontrada."}/>
            </div>
        )
    }

}

export default ErrorPage;