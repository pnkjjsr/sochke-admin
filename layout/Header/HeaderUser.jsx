import React, { Fragment, Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import layoutActions from "../actions";

import UserImage from "components/UserImage";
import Drawer from "components/Drawer";
import AccountNav from "components/Nav/Account";
import UserNav from "components/Nav/User";
import Photo from "components/Photo";
import Button from "components/Form/Button";

import "./style.scss";

class HeaderUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      accountDrawer: "",
      userDrawer: "",
      classSearch: "",
      classResult: "",
      usersData: [],
      ministersData: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { searchView, searchMinisters, searchUsers } = props.layout;
    let usersLen = searchUsers.length;
    let ministersLen = searchMinisters.length;
    if (usersLen || ministersLen) {
      return {
        classResult: "search_form__result__show",
        usersData: searchUsers,
        ministersData: searchMinisters
      };
    } else if (searchView) {
      return {
        classSearch: "search_form__top__active"
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchView } = prevProps.layout;
    const { layout } = this.props;

    if (searchView != layout.searchView) {
      this.setState({
        search: "",
        classSearch: "",
        classResult: "",
        usersData: [],
        ministersData: []
      });
    }
  }

  handleOpen = e => {
    let name = `${e}Drawer`;
    this.setState({
      [name]: "open"
    });
  };

  handleClose = e => {
    let name = `${e}Drawer`;
    this.setState({
      [name]: ""
    });
  };

  handleClick = () => {
    const { showSearch } = this.props;
    showSearch();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { getSearchData } = this.props;
    const { search } = this.state;
    getSearchData(search);
  };

  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  renderLoopUsers = () => {
    const { usersData } = this.state;
    let usersLen = usersData.length;
    if (!usersLen) {
      return (
        <ul>
          <li>
            <span>No user(s) found</span>
          </li>
        </ul>
      );
    }

    let users = usersData.map(user => {
      return (
        <li key={user.id}>
          <a href={`/profile/${user.userName}`}>
            <Photo src={user.photoURL} />
            {user.displayName}
          </a>
        </li>
      );
    });
    return (
      <ul>
        <li>
          <span>Users</span>
        </li>
        {users}
      </ul>
    );
  };

  renderLoopMinisters = () => {
    const { ministersData } = this.state;
    let ministersLen = ministersData.length;
    if (!ministersLen) {
      return (
        <ul>
          <li>
            <span>No minister(s) found</span>
          </li>
        </ul>
      );
    }
    let ministers = ministersData.map(minister => {
      return (
        <li key={minister.id}>
          <a href={`/minister/${minister.userName}`}>
            <Photo src={minister.photoURL} />
            {minister.name}
          </a>
        </li>
      );
    });

    return (
      <ul>
        <li>
          <span>Ministers</span>
        </li>
        {ministers}
      </ul>
    );
  };

  render() {
    const mainClass = "search_form";
    const {
      search,
      accountDrawer,
      userDrawer,
      classSearch,
      classResult
    } = this.state;

    return (
      <Fragment>
        <div className="header bg" role="main">
          <div className="container">
            <div className="row">
              <div className="col-5 col-sm-3 col-lg-2 pl-0 pr-0 d-flex flex-row">
                <div className="menu d-inline-block d-lg-none d-flex align-items-center">
                  <i
                    className="material-icons"
                    onClick={e => this.handleOpen("account")}
                  >
                    menu
                  </i>
                  <Drawer
                    side="left"
                    open={accountDrawer}
                    action={e => this.handleClose("account")}
                  >
                    <AccountNav />
                  </Drawer>
                </div>

                <div className="logo">
                  <Link href="/">
                    <a>{process.env.domain}</a>
                  </Link>
                  <span>Alpha</span>
                </div>
              </div>

              <div className="col-6 col-sm-8 col-lg-7 d-flex align-items-center">
                <form className="w-100" onSubmit={this.handleSubmit}>
                  <div
                    className={`${mainClass} d-flex justify-content-end`}
                    onClick={this.handleClick}
                  >
                    <div className={`${mainClass}__top ${classSearch}`}>
                      <i className="material-icons">search</i>
                      <input
                        className={`${mainClass}__top__control`}
                        name="search"
                        type="text"
                        value={search}
                        placeholder="Search"
                        autoComplete="off"
                        onChange={this.handleChange}
                      />
                      <button className="btn btn-default btn-sm" type="submit">
                        Enter
                      </button>
                    </div>

                    <div className={`${mainClass}__result ${classResult}`}>
                      {this.renderLoopUsers()}
                      {this.renderLoopMinisters()}
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-1 col-sm-1 col-lg-3 pr-0 pl-0 text-right d-flex justify-content-end align-items-center">
                <div className="nav-user">
                  <div onClick={e => this.handleOpen("user")}>
                    <UserImage />
                  </div>

                  <div className="drop-box">
                    <UserNav />
                  </div>

                  <Drawer
                    side="right"
                    open={userDrawer}
                    action={e => this.handleClose("user")}
                  >
                    <UserNav />
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state, layoutActions)(HeaderUser);
