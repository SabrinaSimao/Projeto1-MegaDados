import { connect } from "react-redux";
import HomePage from "./HomePage";
import {setUser} from './redux/actions';

const mapStateToProps = ({ user }, ownProps) => ({
  user: user.user,
});


const mapDispatchToProps = dispatch => ({
  setUser: (payload) => dispatch(setUser(payload))
});



const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomeContainer;
