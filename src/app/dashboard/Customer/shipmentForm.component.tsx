"use client";
import React, { useContext, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import QueryApi from "@/shared/query-api";
import AuthService from "@/shared/services/authentication/authentication.service";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import { useQuery } from "react-query";
import QUERY_KEYS from "@/static/app.querykeys";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen); // Toggles isOpen between true and false
    console.log("isOpen ->", isOpen);
  };

  const handleSubmit = async (values, actions) => {
    console.log(values);
    const response = await QueryApi.createShipment(values, token as string);
    actions.setSubmitting(false);
  };

  return (
    <div>
      <button
        className="bg-slate-800 cursor-pointer rounded-xl inline-block py-2 px-2 text-white "
        onClick={() => toggleForm()}
      >
        Create Shipment
      </button>
      {isOpen && (
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
          onSubmit={handleSubmit} // Use handleSubmit function here
        >
          {({ setFieldValue, values }) => (
            <Form className="">
              <Field
                name="customer_id"
                className="m-2 p-1 bg-gray-200 rounded-xl"
                type="text"
                placeholder="Customer ID"
              />
              <Field
                className="m-2 p-1 bg-gray-200 rounded-xl"
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
              <Field
                className="m-2 p-1 bg-gray-200 rounded-xl"
                name="origin"
                type="text"
                placeholder="Origin"
              />
              <Field
                className="m-2 p-1 bg-gray-200 rounded-xl"
                name="destination"
                type="text"
                placeholder="Destination"
              />
              <Field
                className="m-2 p-1 bg-gray-200 rounded-xl"
                name="shipmentDate"
                type="date"
              />
              <Field
                className="m-2 p-1 bg-gray-200 rounded-xl"
                name="expectedDeliveryDate"
                type="date"
              />
              <Field
                as="select"
                name="status"
                className="m-2 p-1 bg-gray-200 rounded-xl"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </Field>
              <Field
                className="m-2 p-1 bg-gray-200 rounded-xl fle"
                name="warehouseID"
                type="text"
                placeholder="Warehouse ID"
              />
              <div className="border p-2">
                <p className="font-bold">Items :</p>
                <FieldArray name="items">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.items.length === 0 ? (
                        <p className="font-semibold pl-4 py-2">No Items yet!</p>
                      ) : (
                        values.items.map((item, index) => (
                          <div key={index} className="border-b">
                            <Field
                              className="m-2 p-1 bg-gray-200 rounded-xl"
                              name={`items.${index}.name`}
                              placeholder="Item Name"
                            />
                            <Field
                              className="m-2 p-1 bg-gray-200 rounded-xl"
                              name={`items.${index}.quantity`}
                              placeholder="Quantity"
                              type="number"
                            />
                            <label>
                              <Field
                                className="m-2 p-1 bg-gray-200 rounded-xl border"
                                name={`items.${index}.isSensitive`}
                                type="checkbox"
                              />
                              Is Sensitive
                            </label>

                            <Button
                              variant="destructive"
                              className="bg-red-500 text-white m-1 ml-16 rounded-xl hover:bg-red-300"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))
                      )}

                      <Button
                        variant="default"
                        className="bg-slate-800 text-white m-1 px-2 py-1 rounded-xl hover:bg-slate-500"
                        type="button"
                        onClick={() =>
                          push({ name: "", quantity: 0, isSensitive: false })
                        }
                      >
                        Add Item
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <Button
                variant="default"
                className="bg-slate-800 text-white m-1 px-2 py-1 rounded-xl hover:bg-slate-500"
                type="submit" // Change the type to "submit"
              >
                Submit Shipment
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default ShipmentForm;
