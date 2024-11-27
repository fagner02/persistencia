import React, { Component } from "react";
import TransactionFetch from "./TransactionFetch";
import RefreshIcon from "./Icons/RefreshIcon";
import PersonFetch from "./PersonFetch";

export class TransactionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [{ id: " - ", name: " - " }],
      children: [],
    };
    this.willUnmount = false;
  }

  refresh() {
    TransactionFetch.getAll().then((res) => {
      if (!this.willUnmount) {
        this.setState({ transactions: res });
      }
    });
  }

  componentDidMount() {
    this.willUnmount = false;
    this.refresh();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this.willUnmount = true;
  }

  openAddTransaction() {
    const detailMenu = document.querySelector(".container :nth-child(1)");
    const addMenu = document.querySelectorAll(".container")[1];
    const container = document.querySelector(".container");

    if (container.style.flexGrow === "0") {
      return;
    }

    container.style.height = "0px";
    container.style.flexGrow = "0";

    setTimeout(() => {
      detailMenu.style.opacity = "0";
    }, 300);

    setTimeout(() => {
      addMenu.style.height = "100%";
      addMenu.style.padding = "0px";
      addMenu.style.opacity = "1";
    }, 400);
  }

  closeAddTransaction() {
    const addMenu = document.getElementsByClassName("container")[1];
    const container = document.querySelector(".container");
    const detailMenu = document.querySelector(".container :nth-child(1)");
    if (addMenu.style.height === "0px") {
      return;
    }
    addMenu.style.height = "0px";
    addMenu.style.padding = "0px 0px";
    setTimeout(() => {
      addMenu.style.opacity = "0";
    }, 300);
    setTimeout(() => {
      detailMenu.style.opacity = "1";
      container.style.flexGrow = "1";
      container.style.height = "100%";
      this.refresh();
    }, 400);
  }

  toggleDetails(id) {
    const info = document.getElementById(id);
    if (info.style.height === "0px") {
      info.style.height = `${info.scrollHeight}px`;
      info.style.padding = "10px";
      info.style.opacity = "1";
      return;
    }
    info.style.height = "0px";
    info.style.padding = "0px 10px";
  }

  render() {
    return (
      <div className="main-container">
        <h1>Hello</h1>
        <h3>This is the home page</h3>
        <div className="actions">
          <div
            style={{ display: "flex", marginTop: "2px", alignItems: "center" }}>
            <button
              style={{ display: "flex", height: "33px" }}
              onClick={(e) => {
                this.refresh();
              }}>
              <RefreshIcon size="20px" color="white"></RefreshIcon>
            </button>
            <button
              id="add-transaction"
              style={{ margin: "0 10px" }}
              onClick={() => this.openAddTransaction()}>
              Add Transaction
            </button>
          </div>
        </div>
        <div className="container" style={{ transition: "all 0.3s ease-out" }}>
          <div
            style={{
              transition: "all 0.4s ease",
              opacity: "1",
            }}>
            {/* ITEM ROW ---------------------------------- */}
            {this.state.transactions.map((item) => (
              <div
                className="row"
                id={"row" + item.id}
                key={item.id}
                style={{
                  display: "grid",
                  height: "auto",
                  gridTemplate: "1fr / 1fr",
                }}>
                {/* ITEM ROW CONTENT ------------------------------*/}
                <div
                  id={"row-content" + item.id}
                  style={{
                    zIndex: "1",
                    display: "flex",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    overflow: "hidden",
                    gridColumn: "1 / 1",
                    gridRow: "1 / 1",
                  }}
                  /*TOGGLE DETAIL VIEW -------------------------------------*/
                  onClick={(e) => {
                    this.toggleDetails(item.id);
                  }}>
                  {/*ITEM ROW INNER CONTENT --------------------------------*/}
                  <div style={{ display: "flex", width: "100%" }}>
                    <p className="cell title-label" style={{}}>
                      {item.id}
                      <sup style={{ fontSize: "12px", fontWeight: "500" }}>
                        id
                      </sup>
                    </p>
                    <div className="row-right">
                      <div className="property">
                        <h6>Type:</h6>
                        <p> {item.type}</p>
                      </div>
                      <div className="property">
                        <h6>Value:</h6>
                        <p> {item.value}</p>
                      </div>
                      <div className="property">
                        <h6>PersonId:</h6>
                        <p> {item.personId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ITEM DETAILS CONTAINER --------------------------------- */}
                <div>
                  <div
                    id={item.id}
                    style={{
                      padding: "0px",
                      height: "0px",
                      overflow: "hidden",
                      transition: "all 0.4s ease",
                    }}>
                    <div
                      style={{
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}>
                      {/* DETAIL ROWS --------------------------------- */}
                      <p>Description: {item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ADD ITEM CONTAINER ------------------------------------- */}
        <div
          className="container"
          style={{
            display: "flex",
            borderRadius: "10px",
            flexGrow: "0",
            height: "0px",
            opacity: "0",
            gap: "10px",
            marginTop: "-50px",
            transition: "all 0.4s ease",
          }}>
          {/*INPUT ROW -----------------------------------------------*/}
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Type</p>
            <select id="select-type">
              <option value="Revenue">Revenue</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Value</p>
            <input type="text" name="value" />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">Description</p>
            <input type="text" name="description" />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <p className="cell title-label input-label">PersonId</p>
            <input type="number" name="person-id" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}>
            <button
              onClick={() => {
                this.closeAddTransaction();
              }}>
              Cancel
            </button>
            <button
              onClick={async () => {
                var type = document.querySelector("#select-type").value;
                var value = document.querySelector("input[name=value]").value;
                var description = document.querySelector(
                  "input[name=description]"
                ).value;
                var personId = document.querySelector(
                  "input[name=person-id]"
                ).value;

                var person = await PersonFetch.getById(personId);

                if (person === null) {
                  window.alert("Person not found for id: " + personId);
                  return;
                }

                if (person.age < 18 && type === "Revenue") {
                  window.alert("Person is not old enough for revenue");
                  return;
                }

                if (value === "" || personId === "") {
                  window.alert("Value, PersonId and Type are required");
                  return;
                }

                TransactionFetch.post({
                  type: type,
                  value: parseFloat(value),
                  description: description,
                  personId: parseInt(personId),
                }).then(() => {
                  this.refresh();
                });
                this.closeAddTransaction();
              }}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionPage;
