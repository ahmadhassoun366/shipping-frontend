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
  shipmentDate: Yup.date().required("Shipment date is required"),
  expectedDeliveryDate: Yup.date().required(
    "Expected delivery date is required"
  ),
  status: Yup.string()
    .oneOf(["Pending", "Completed", "Failed"])
    .required("Status is required"),
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
  const {
    data: receivers,
    isLoading,
    error,
  } = useQuery(QUERY_KEYS.GET_RECEIVERS, () => QueryApi.getReceivers());
  console.log("receivers", receivers);

  return (
    <div>
      <h1>Create Shipment</h1>
      <Formik
        initialValues={{
          customer_id: "",
          receiver_id: "",
          origin: "",
          destination: "",
          shipmentDate: "",
          expectedDeliveryDate: "",
          status: "",
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
          actions.setSubmitting(false);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Field name="customer_id" type="text" placeholder="Customer ID" />
            <Field
              as="select"
              name="receiver_id"
              onChange={(e :any) => setFieldValue("receiver_id", e.target.value)}
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
            <Field name="shipmentDate" type="date" />
            <Field name="expectedDeliveryDate" type="date" />
            <Field as="select" name="status">
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </Field>
            <Field name="warehouseID" type="text" placeholder="Warehouse ID" />
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
