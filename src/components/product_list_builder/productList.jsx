import React, { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import ListTile from "../list_tile/listTile";

export default function ProductList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    const user = firebase.auth().currentUser;
    if (user != null) {
      var unsubscribe = firebase
        .firestore()
        .collection("products")
        .where("owner", "==", user.uid)
        .onSnapshot(function (result) {
          var listAux = [];
          result.docs.forEach((doc) => {
            listAux.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setList(listAux);
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);

  function deleteProduct(product) {
    firebase
      .firestore()
      .collection("products")
      .doc(product.id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }

  function update(name, price, id) {
    firebase.firestore().collection("products").doc(id).update({
      name: name,
      price: price,
    });
  }

  console.log("calling Firebase");

  return (
    <div className="container">
      <h2>Seus produtos</h2>
      <div className="accordion" id="accordionExample">
        {list.map((product, index) => (
          <ListTile
            key={index}
            index={index}
            product={product}
            onDeleted={(product) => deleteProduct(product)}
            onUpdated={(name, price, id) => update(name, price, id)}
          />
        ))}
      </div>
    </div>
  );
}
