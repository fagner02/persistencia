import React, { Component } from "react";
import { Link } from "react-router-dom";
import PersonFetch from "./PersonFetch";
import TransactionFetch from "./TransactionFetch";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 1,
      posx: -25,
      opacity: 0,
      people: 0,
      transactions: 0,
      balances: [0, 0, 0],
      height: 0,
      showHeight: 0,
    };
  }

  componentDidMount() {
    PersonFetch.getAll().then((data) => {
      this.setState({
        people: data.people.length,
        balances: [data.totalBalance, data.totalRevenue, data.totalExpenses],
      });
    });
    TransactionFetch.getCount().then((data) => {
      this.setState({ transactions: data.count });
    });
    var table = document.querySelector(".main");
    var showTable = document.querySelector(".main-container>:nth-child(6)");
    table.style.height = table.clientHeight + "px";
    showTable.style.height = showTable.clientHeight + "px";
    this.setState({
      height: table.clientHeight,
      showHeight: showTable.clientHeight,
    });
  }

  async setAnimation() {
    var table = document.querySelector(".main");
    table.style.overflow = "hidden";
    table.style.height = "0px";

    setTimeout(() => {
      var showTable = document.querySelector(
        ".main-container>:nth-child(6)>div"
      );
      console.log(showTable);
      showTable.style.top = "0px";
      setTimeout(() => {
        this.setState({ posx: 0, opacity: 1 });
      }, 400);
    }, 400);
  }

  render() {
    return (
      <div className="main-container">
        <h1>Home</h1>
        <h2>This is a test page</h2>
        <p>Here you can edit and access the test database</p>
        <div style={{ display: "flex" }}>
          <button
            className="space-v"
            onClick={() => {
              this.setAnimation();
            }}>
            <b>try it</b>
          </button>
        </div>
        <div
          className="main"
          style={{
            display: "flex",
            isolation: "isolate",
            transition: "height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}>
          <div
            className="table-container"
            style={{
              transform: `scale(${this.state.size})`,
              width: "10vw",
              background: "white",
              zIndex: "1",
            }}>
            <div>
              <p className="cell title-label full-w">database</p>
            </div>
            <div>
              <div className="cell full-w">create</div>
            </div>
            <div>
              <div
                className="cell full-w"
                style={{ display: "flex", justifyContent: "end" }}>
                <div style={{ margin: "0 10px" }}>update</div>
                <div>delete</div>
              </div>
            </div>
            <div>
              <div className="cell full-w">retrieve</div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            overflow: "hidden",
            height: "100%",
          }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              flexWrap: "wrap",
              gap: "10px",
              top: "-250px",
              height: "250px",
              transition: "top 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}>
            <div
              style={{
                width: "200px",
                border: "solid 1px black",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "white",
              }}>
              <div>People: {this.state.people}</div>
              <div>Transactions: {this.state.transactions}</div>
              <div
                style={{
                  border: "solid 1px black",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}>
                <div className="cell">
                  Total Balance: {this.state.balances[0]}$
                </div>
                <div className="cell">Revenue: {this.state.balances[1]}$ </div>
                <div className="cell">Expense: {this.state.balances[2]}$</div>
              </div>
            </div>
            <div className="link-buttons">
              <button>
                <Link className="tab-link" to="/People">
                  People &gt;
                </Link>
              </button>
              <button>
                <Link className="tab-link" to="/Transactions">
                  Transactions &gt;
                </Link>
              </button>
              <h3
                style={{
                  transition: "all 0.5s ease",
                  opacity: this.state.opacity,
                  zIndex: -1,
                  transform: `translateX(${this.state.posx}vw)`,
                  margin: "0px",
                }}>
                explore the pages <br />
                and see what you can do
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
