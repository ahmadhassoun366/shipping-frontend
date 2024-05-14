"use client";
import React, { useContext, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import QueryApi from "@/shared/query-api";
import AuthService from "@/shared/services/authentication/authentication.service";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import { useQuery } from "react-query";
import QUERY_KEYS from "@/static/app.querykeys";
import Modal from "./modal.component";
// Yup validation schema
const ShipmentSchema = Yup.object().shape({
  customer_id: Yup.string().required("Customer ID is required"),
  receiver_id: Yup.string().required("Receiver ID is required"),
  origin: Yup.string().required("Origin is required"),
  destination: Yup.string().required("Destination is required"),
  warehouseID: Yup.string().required("Warehouse ID is required"),
  items: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Item name is required"),
      quantity: Yup.number()
        .positive()
        .integer()
        .required("Quantity is required"),
      isSensitive: Yup.boolean().required("Is sensitive is required"),
      type: Yup.string()
        .oneOf([
          "Electronics",
          "Clothing",
          "Furniture",
          "Pharmaceuticals",
          "Food",
          "Other",
        ])
        .required("Item type is required"),
    })
  ),
});

const ShipmentForm = () => {
  const authSvc = useContext<AuthService>(AuthenticationSvcContext);
  const token = authSvc.token;
  const id = authSvc?.userId;
  const [showModal, setShowModal] = useState(false);
  const [totalFee, setTotalFee] = useState(0);
  const {
    data: receivers,
    isLoading,
    error,
  } = useQuery(QUERY_KEYS.GET_RECEIVERS, () => QueryApi.getReceivers());

  const { data: warehouses } = useQuery(QUERY_KEYS.GET_WAREHOUSES, () =>
    QueryApi.getWarehouses()
  );

  const formatDate = (date: any) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      <h1>Create Shipment</h1>
      <Formik
        initialValues={{
          customer_id: id,
          receiver_id: "",
          origin: "",
          destination: "",
          expectedDeliveryDate: "",
          shipmentDate: formatDate(new Date()),
          warehouseID: "",
          items: [{ name: "", quantity: 1, isSensitive: false, type: "" }],
        }}
        validationSchema={ShipmentSchema}
        onSubmit={async (values, actions) => {
          console.log(values);
          const response = await QueryApi.createShipment(
            values,
            token as string
          );
          console.log("Create Shipment Response:", response);
          if (response.status === 201) {
            setTotalFee(response.data.totalFee);
            setShowModal(true);
          }
          actions.setSubmitting(false);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Field
              as="select"
              name="receiver_id"
              onChange={(e: any) =>
                setFieldValue("receiver_id", e.target.value)
              }
            >
              <option value="">Select a Receiver</option>
              {receivers &&
                receivers.data.map((receiver: any) => (
                  <option key={receiver._id} value={receiver._id}>
                    {receiver.name}
                  </option>
                ))}
            </Field>
            <Field name="origin" type="text" placeholder="Origin" />
            <Field name="destination" type="text" placeholder="Destination" />
            <Field as="select" name="warehouseID">
              <option value="">Select Warehouse</option>
              {warehouses &&
                warehouses.data.map((warehouse: any) => (
                  <option key={warehouse._id} value={warehouse._id}>
                    {warehouse.name}
                  </option>
                ))}
            </Field>
            <FieldArray name="items">
              {({ insert, remove, push }) => (
                <div>
                  {values.items.length > 0 &&
                    values.items.map((item, index) => (
                      <div key={index}>
                        <Field
                          name={`items.${index}.name`}
                          placeholder="Item Name"
                        />
                        <Field
                          name={`items.${index}.quantity`}
                          placeholder="Quantity"
                          type="number"
                        />
                        <Field as="select" name={`items.${index}.type`}>
                          <option value="">Select Type</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Pharmaceuticals">
                            Pharmaceuticals
                          </option>
                          <option value="Food">Food</option>
                          <option value="Other">Other</option>
                        </Field>
                        <label>
                          <Field
                            name={`items.${index}.isSensitive`}
                            type="checkbox"
                          />
                          Is Sensitive
                        </label>
                        <br />
                        <button type="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ name: "", quantity: 0, isSensitive: false })
                    }
                  >
                    Add Item
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Submit Shipment</button>
          </Form>
        )}
      </Formik>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="text-center">
            <h2 className="text-lg">Total Fee: ${totalFee}</h2>
            {/* message to tell the user to send the fee using OMT  */}
            <h1>
              Please send the total fee to the following OMT number: 71 123 456
            </h1>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShipmentForm;
