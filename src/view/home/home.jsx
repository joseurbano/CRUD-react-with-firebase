import React from "react";
import "./home.css";
import Nav from "../../components/nav/nav";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import FormProduct from "../../components/form_product/formProduct";
import ProductList from "../../components/product_list_builder/productList";
import { Redirect } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const user = firebase.auth().currentUser
  //Verificando se usuário continua logado
  firebase.auth().onAuthStateChanged((state) => {
    if (state) {
      dispatch({
        type: "LOG_IN",
        userEmail: state.email
      });
    } else {
      dispatch({ type: "LOG_OUT" });
    }
  });

  function save(name, price) {
     firebase.firestore()
      .collection("products")
      .add({ name: name, price: price, owner: user.uid });
  }

  return (
    <React.Fragment>
      {
        useSelector((state) => state.userIsLogged) === 0 ? (
        <Redirect to="/login" />
        ) : null
      }
      <Nav></Nav>
      <FormProduct onClickPrimaryButton={(name,price) => save(name,price)}> Adicionar Produto</FormProduct>
      <ProductList></ProductList>
    </React.Fragment>
  );
}
