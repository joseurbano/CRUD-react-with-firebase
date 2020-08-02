import React from "react";
import FormProduct from "../form_product/formProduct";

export default (props) => {
  const index = props.index;
  console.log(`index ${props.index}`);
  const product = {
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
  };
  return (
    <div className="card">
      <div className="card-header" id="headingOne">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">Produto: {product.name}</div>
            <div className="col-sm-3">Preço: R$ {product.price}</div>
            <div className="col-sm-3 text-right d-flex">
              <button
                className="btn btn-primary text-white text-center mr-2"
                type="button"
                data-toggle="collapse"
                data-target={"#collapse" + index}
                aria-expanded="true"
                aria-controls={"collapse" + index}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => props.onDeleted(product)}
                className="btn btn-danger text-white text-center ml-2"
                type="button"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id={"collapse" + index}
        className="collapse"
        aria-labelledby="headingOne"
        data-parent="#accordionExample"
      >
        <div className="card-body">
          <FormProduct index={index} product={product} onClickPrimaryButton={(name, price) => props.onUpdated(name,price,product.id)}>Atualizar Produto</FormProduct>
        </div>
      </div>
    </div>
  );
};
