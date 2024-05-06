"use client";
import React, { useContext } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import QueryApi from "@/shared/query-api";
import AuthService from "@/shared/services/authentication/authentication.service";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import { useQuery } from "react-query";
import QUERY_KEYS from "@/static/app.querykeys";

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
    })
  ),
});

const ShipmentForm = () => {
  const authSvc = useContext<AuthService>(AuthenticationSvcContext);
  const token = authSvc.token;
  const id = authSvc?.userId;

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
          shipmentDate: formatDate(new Date()),
          warehouseID: "",
          items: [{ name: "", quantity: "", isSensitive: false }],
        }}
        validationSchema={ShipmentSchema}
        onSubmit={async (values, actions) => {
          console.log(values);
          const response = await QueryApi.createShipment(
            values,
            token as string
          );
          console.log("Create Shipment Response:", response);

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
    </div>
  );
};

export default ShipmentForm;
