import React, { Component } from "react";
import BookFetch from "./BookFetch";
import TrashIcon from "./Icons/TrashIcon";
import EditIcon from "./Icons/EditIcon";
import RefreshIcon from "./Icons/RefreshIcon";
import CheckIcon from "./Icons/CheckIcon";

export class BookPage extends Component {
  constructor(/**@type {any}*/ props) {
    super(props);
    this.state = {
      books: /**@type {import("./types").Livro[]}*/ ([]),
      children: [],
      selected: /**@type {number[]}*/ ([]),
    };
    this.willUnmount = false;
  }
  properties = [
    { name: "id", type: "number" },
    { name: "titulo", type: "text" },
    { name: "autor", type: "text" },
    { name: "ano", type: "number" },
    { name: "genero", type: "text" },
    { name: "editora", type: "text" },
  ];
  refresh() {
    BookFetch.getAll().then((res) => {
      if (!this.willUnmount) {
        this.setState({ books: res });
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

  checkBox(/**@type {number}*/ id) {
    const box = /**@type {HTMLElement}*/ (
      document.querySelector(`.checkbox#check${id}`)
    );
    const icon = /**@type {HTMLElement}*/ (
      document.querySelector(`.checkbox>#check${id}`)
    );
    const path = /**@type {HTMLElement}*/ (
      document.querySelector(`.checkbox>#check${id}>path`)
    );
    const button = /**@type {NodeListOf<HTMLElement>}*/ (
      document.querySelectorAll(`#delete-selected,#uncheck`)
    );

    if (!box || !icon || !path || !button) return;
    icon.style.transformOrigin = "center";
    box.style.transition = "background-color 0.3s ease-in-out";
    icon.style.transition = "all 0.3s ease-in-out";
    path.style.transition = "all 0.3s ease-in-out";

    if (
      box.style.backgroundColor === "white" ||
      box.style.backgroundColor === ""
    ) {
      box.style.backgroundColor = "black";
      path.setAttribute("stroke", "white");
      icon.style.rotate = "0deg";
      if (this.state.selected.length === 0) {
        button.forEach((x) => {
          x.style.scale = "1";
          x.style.opacity = "1";
        });
      }
      this.state.selected.push(id);

      return;
    }
    box.style.backgroundColor = "white";
    path.setAttribute("stroke", "black");
    icon.style.rotate = "45deg";
    this.state.selected.splice(this.state.selected.indexOf(id), 1);
    if (this.state.selected.length === 0) {
      button.forEach((x) => {
        x.style.scale = "0";
        x.style.opacity = "0";
      });
    }
  }

  uncheckAll() {
    while (this.state.selected.length > 0) {
      this.checkBox(this.state.selected[0]);
    }
  }

  openAddBook() {
    const detailMenu = /**@type {HTMLElement}*/ (
      document.querySelector(".container :nth-child(1)")
    );
    const addMenu = /**@type {HTMLElement}*/ (
      document.querySelectorAll(".container")[1]
    );
    const container = /**@type {HTMLElement}*/ (
      document.querySelector(".container")
    );

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

  closeAddBook() {
    const addMenu = /**@type {HTMLElement}*/ (
      document.getElementsByClassName("container")[1]
    );
    const container = /**@type {HTMLElement}*/ (
      document.querySelector(".container")
    );
    const detailMenu = /**@type {HTMLElement}*/ (
      document.querySelector(".container :nth-child(1)")
    );
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

  openEdit(/**@type {number}*/ id) {
    const info = /**@type {HTMLElement}*/ (
      document.getElementById(`info${id}`)
    );
    const edit = /**@type {HTMLElement}*/ (
      document.querySelector(`#edit${id}`)
    );
    if (info.style.height === "0px") {
      return;
    }
    info.style.height = "0px";
    info.style.padding = "0px";
    info.style.opacity = "0";
    setTimeout(() => {
      edit.style.height = `${edit.scrollHeight}px`;
      edit.style.padding = "10px";
    }, 500);
  }

  closeEdit(/**@type {number}*/ id) {
    const info = /**@type {HTMLElement}*/ (
      document.getElementById(`info${id}`)
    );
    const edit = /**@type {HTMLElement}*/ (
      document.querySelector(`#edit${id}`)
    );
    if (edit.style.height === "0px") {
      return;
    }
    edit.style.height = "0px";
    edit.style.padding = "0px";
    setTimeout(() => {
      info.style.height = `${info.scrollHeight}px`;
      info.style.padding = "10px";
      info.style.opacity = "1";
    }, 500);
  }

  toggleDetails(/**@type {number}*/ id) {
    const info = /**@type {HTMLElement}*/ (
      document.getElementById(`info${id}`)
    );
    const edit = /**@type {HTMLElement}*/ (
      document.querySelector(`#edit${id}`)
    );
    const controls = /**@type {HTMLElement}*/ (
      document.querySelector(`#a${id}`)
    );
    const check = /**@type {HTMLElement}*/ (
      document.querySelector(`.checkbox#check${id}`)
    );
    if (info.style.height === "0px" && edit.style.height === "0px") {
      check.style.opacity = "0";
      check.style.scale = "0";
      check.style.width = "0px";
      info.style.height = `${info.scrollHeight}px`;
      info.style.padding = "10px";
      info.style.opacity = "1";
      controls.style.transform = "scale(1)";
      controls.style.opacity = "1";
      controls.style.width = "fit-content";
      return;
    }
    info.style.height = "0px";
    info.style.padding = "0px 10px";
    edit.style.height = "0px";
    edit.style.padding = "0px";
    controls.style.transform = "scale(0)";
    controls.style.opacity = "0";
    controls.style.width = "0px";
    check.style.opacity = "1";
    check.style.scale = "1";
    check.style.width = "fit-content";
  }

  openDeleteView(/**@type {number}*/ id) {
    const elem = /**@type {HTMLElement}*/ (
      document.querySelector(`#row-content${id}`)
    );
    const controls = /**@type {HTMLElement}*/ (
      document.querySelector(`#delete-options${id}`)
    );
    this.toggleDetails(id);
    controls.style.transform = "scale(1)";
    controls.style.padding = "10px";
    controls.style.opacity = "1";
    elem.style.opacity = "0";
    elem.style.height = "0px";
    elem.style.padding = "0px";
    elem.style.overflow = "hidden";
  }

  closeDeleteView(/**@type {number}*/ id) {
    const elem = /**@type {HTMLElement}*/ (
      document.querySelector(`#row-content${id}`)
    );
    const controls = /**@type {HTMLElement}*/ (
      document.querySelector(`#delete-options${id}`)
    );

    if (elem.style.height !== "0px") {
      return;
    }

    this.toggleDetails(id);
    controls.style.opacity = "0";
    controls.style.transform = "scale(0)";
    controls.style.padding = "0px";
    elem.style.opacity = "1";
    elem.style.height = `${elem.scrollHeight}px`;

    setTimeout(() => {
      elem.style.height = "auto";
    }, 500);
  }

  render() {
    return (
      <div className="main-container">
        <h1>Hello</h1>
        <h3>This is the home page</h3>
        <div className="actions">
          <div style={{ display: "flex" }}>
            <button
              onClick={(e) => {
                this.refresh();
              }}
              style={{ display: "flex", alignItems: "center" }}>
              <RefreshIcon size="20px" color="white"></RefreshIcon>
            </button>
            <button
              id="add-book"
              style={{ margin: "0 10px" }}
              onClick={() => this.openAddBook()}>
              Add Book
            </button>
            <button
              id="delete-selected"
              onClick={() => {
                BookFetch.delete(this.state.selected).then(() => {
                  this.refresh();
                  this.setState({ selected: [] });
                });
              }}>
              Delete
            </button>
          </div>
          <button
            id="uncheck"
            style={{
              backgroundColor: "white",
              border: "solid 1px black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
            }}
            onClick={() => {
              this.uncheckAll();
            }}>
            <CheckIcon size="20px" stroke="black"></CheckIcon>
          </button>
        </div>
        <div
          className="container"
          style={{ height: "100%", transition: "all 0.3s ease-out" }}>
          <div
            style={{
              transition: "all 0.4s ease",
              opacity: "1",
            }}>
            {/* ITEM ROW ---------------------------------- */}
            {this.state.books.map((item) => (
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
                      {Object.entries(item)
                        .slice(0, 3)
                        .map(([key, value]) => (
                          <div className="property" key={key}>
                            <h6>{key}:</h6>
                            <p>{value}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/*ITEM ROW CHECKBOX --------------------------------*/}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      this.checkBox(item.id);
                    }}
                    className="checkbox"
                    id={"check" + item.id}>
                    <CheckIcon
                      size="20px"
                      stroke="black"
                      id={"check" + item.id}></CheckIcon>
                  </button>

                  {/*ITEM ROW CONTROLS --------------------------------------*/}
                  <div className="item-controls" id={"a" + item.id}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        this.openDeleteView(item.id);
                      }}>
                      <TrashIcon size="20" color="white" />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        this.openEdit(item.id);
                      }}>
                      <EditIcon size="20" color="white" />
                    </div>
                  </div>
                </div>
                {/* ITEM DETAILS CONTAINER --------------------------------- */}
                <div>
                  <div
                    id={"info" + item.id}
                    style={{
                      padding: "0px",
                      height: "0px",
                      overflow: "hidden",
                      transition: "all 0.4s ease",
                    }}>
                    {Object.entries(item)
                      .slice(3)
                      .map((p) => (
                        <div className="detail-row" key={p[0]}>
                          {/* DETAIL ROWS --------------------------------- */}
                          <p>
                            {p[0]}: {p[1]}
                          </p>
                        </div>
                      ))}
                  </div>

                  {/*EDIT ITEM CONTAINER --------------------------------- */}
                  <div
                    style={{
                      height: "0px",
                      padding: "0px",
                      transition: "all 0.5s",
                      overflow: "hidden",
                    }}
                    id={"edit" + item.id}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}>
                      {/*EDIT INPUT ROWS ----------------------------------------------------*/}
                      {this.properties.map((p) => (
                        <div
                          style={{ display: "flex", gap: "10px" }}
                          key={p.name}>
                          <p className="cell title-label input-label">
                            {p.name}
                          </p>
                          <input
                            type={p.type}
                            id={`e${p.name}${item.id}`}
                            style={{ width: "100%" }}
                            defaultValue={
                              Object.entries(item).find(
                                (x) => x[0] === p.name
                              )?.[1]
                            }
                          />
                        </div>
                      ))}

                      {/*EDIT CONTROLS -----------------------------------------------------*/}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          gap: "10px",
                        }}>
                        <button
                          onClick={(e) => {
                            this.closeEdit(item.id);
                          }}>
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            let entries = this.properties.map((p) => {
                              let value = /**@type {HTMLInputElement}*/ (
                                document.querySelector(`#e${p.name}${item.id}`)
                              ).value;
                              return [
                                p.name,
                                p.type === "number" ? parseFloat(value) : value,
                              ];
                            });

                            BookFetch.put(
                              Object.fromEntries(entries),
                              item.id
                            ).then(() => {
                              this.closeEdit(item.id);
                              this.refresh();
                            });
                          }}>
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/*DELETE OPTIONS --------------------------------------*/}
                <div style={{ gridColumn: "1 / 1", gridRow: "1 / 1" }}>
                  <div
                    id={"delete-options" + item.id}
                    style={{
                      padding: "0px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: "scale(0)",
                      transition: "all 0.5s ease",
                    }}>
                    <button
                      style={{
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        BookFetch.deleteById(item.id).then((res) => {
                          this.refresh();
                        });
                      }}>
                      Yes
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        this.closeDeleteView(item.id);
                      }}>
                      No
                    </button>
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
            height: "0px",
            opacity: "0",
            gap: "10px",
            flexGrow: "0",
            marginTop: "-50px",
            transition: "all 0.4s ease",
          }}>
          {/*INPUT ROW -----------------------------------------------*/}
          {this.properties.map((p) => (
            <div style={{ display: "flex", gap: "10px" }} key={p.name}>
              <p className="cell title-label input-label">{p.name}</p>
              <input
                type={p.type}
                name={p.name}
                defaultValue={p.type === "number" ? "0" : "test"}
              />
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}>
            <button
              onClick={() => {
                this.closeAddBook();
              }}>
              Cancel
            </button>
            <button
              onClick={() => {
                let entries = this.properties.map((p) => {
                  let value = /**@type {HTMLInputElement}*/ (
                    document.querySelector(`input[name=${p.name}]`)
                  ).value;
                  return [
                    p.name,
                    p.type === "number" ? parseFloat(value) : value,
                  ];
                });
                BookFetch.post(Object.fromEntries(entries)).then(() =>
                  this.refresh()
                );
                this.closeAddBook();
              }}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BookPage;
