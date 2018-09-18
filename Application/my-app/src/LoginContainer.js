import { connect } from "react-redux";
import { setUser  } from "./redux/actions";
import Login from './login';

const mapStateToProps = ({ user }) => ({
  user: user,
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => dispatch(setUser(user))
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
