import { connect } from "react-redux";
import { setUser } from "./redux/actions";
import Home from "./Home";

const mapStateToProps = ({ user }) => ({
  user: user
});

const HomeContainer = connect(mapStateToProps, null)(Home);

export default HomeContainer;
