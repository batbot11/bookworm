import React from "react";
import {connect} from "react-redux";
import {Message} from "semantic-ui-react";
import {validateToken, resetPassword} from "../actions/auth";
import ResetPasswordForm from "../forms/ResetPasswordForm";

class ResetPasswordPage extends React.Component {

    state = {
        loading: true,
        success: false
    }

    componentDidMount() {
        this.props.validateToken(this.props.match.params.token)
        .then(() => this.setState({loading: false, success: true}))
        .catch(() => this.setState({loading: false, success: false}))
    }

    submit = data => this.props.resetPassword(data).then(() => this.props.history.push("/login"));

    render() {
        const {loading, success} = this.state;
        return(
            <div>
                {loading && <Message>Loading</Message>}
                {!loading && success && <ResetPasswordForm submit = {this.submit} token = {this.props.match.params.token} />}
                {!loading && !success && <Message>Invalid Token</Message>}
            </div>
        )
    }
}

export default connect(null, {validateToken, resetPassword})(ResetPasswordPage);