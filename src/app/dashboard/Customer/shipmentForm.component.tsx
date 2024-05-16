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
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Create Shipment</h1>
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
          <Form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field
                name="origin"
                type="text"
                placeholder="Origin"
                className="input form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
              <Field
                name="destination"
                type="text"
                placeholder="Destination"
                className="input form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field
                as="select"
                name="receiver_id"
                className="input form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                as="select"
                name="warehouseID"
                className="input form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="">Select Warehouse</option>
                {warehouses &&
                  warehouses.data.map((warehouse: any) => (
                    <option key={warehouse._id} value={warehouse._id}>
                      {warehouse.name}
                    </option>
                  ))}
              </Field>
            </div>
            <FieldArray name="items">
              {({ remove, push }) => (
                <div>
                  {values.items.length > 0 &&
                    values.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center space-x-2 border-b-2 pt-8"
                      >
                        <div className="flex flex-col space-y-2 w-full">
                          <div className="flex gap-4">
                            <Field
                              name={`items[${index}].name`}
                              placeholder="Item Name"
                              className="input form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                            <Field
                              name={`items[${index}].quantity`}
                              placeholder="Quantity"
                              type="number"
                              className="input form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center justify-center gap-4 py-2 ">
                            <div className="w-2/4">
                              <Field
                                as="select"
                                name={`items[${index}].type`}
                                className="input form-input block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              >
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
                            </div>
                            <div className="w-1/4 px-10">
                              <label className="flex items-center space-x-2">
                                <Field
                                  type="checkbox"
                                  name={`items[${index}].isSensitive`}
                                  className=""
                                />
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Is Sensitive
                                </span>
                              </label>
                            </div>
                            <div className="w-1/4">
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Remove Item
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between px-10 py-2"></div>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ name: "", quantity: 1, isSensitive: false })
                    }
                    className="mt-4 w-44 text-blue-500"
                  >
                    + Item
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="w-full flex justify-center items-center">
              <button type="submit" className="w-44 bg-gray-200 py-2 rounded">
                Submit Shipment
              </button>
            </div>
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
