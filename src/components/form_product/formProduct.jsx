import React, { useState, useEffect } from "react";

export default function FormProduct(props) {
  const index = props.index;
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    if (props.product) {
      setName(props.product.name);
      setPrice(props.product.price);
    }
    console.log("loop");
  }, [props.product]);

  function clear() {
    setName("");
    setPrice(0);
  }

  return (
    <div className="container-md my-3">
      <form>
        <div className="row">
          <div className="col-md-10">
            <label>Nome do Produto</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="form-control"
              placeholder="Digite o nome..."
            />
          </div>
          <div className="col-md-2">
            <label>Preço </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              className="form-control"
              placeholder="R$"
              min="0"
            />
          </div>
        </div>
        <div
          className="mt-3 text-right"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn btn-primary mr-2"
            onClick={() => {
              props.onClickPrimaryButton(name, price);
              clear();
            }}
            data-toggle="collapse"
            data-target={"#collapse" + index}
            aria-expanded="true"
            aria-controls={"collapse" + index}
          >
            {props.children}
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => (!props.product ? clear() : null)}
            data-toggle="collapse"
            data-target={"#collapse" + index}
            aria-expanded="true"
            aria-controls={"collapse" + index}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
