/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

// Define types for your component props
type AddToCartProps = {
  params: {
    id: string;
  };
};

// Define type for the service (you may need to adjust this based on your service structure)
type Service = {
  name: string;
  image: string;
  price: number;
  _id: string;
};

// Define the response type from the booking API
type BookingResponse = {
  message: string;
};

const AddToCart = ({ params }: AddToCartProps) => {
  const { data } = useSession();
  const [service, setService] = useState<Service>({} as Service);
  const [total, setTotal] = useState<number>(0);

  // Function to load service details
  const loadService = async () => {
    try {
      const response = await axios.get<{ service: Service }>(
        `/api/services/${params.id}`
      );
      const serviceDetails = response.data.service;
      setService(serviceDetails);

      // Calculate total amount
      const totalAmount = calculateTotal(serviceDetails.price || 0);
      setTotal(totalAmount);
    } catch (error) {
      console.error("Failed to load service details", error);
      toast.error("Failed to load service details.");
    }
  };

  const iva = 0.19; // 19% IVA
  const shippingCharge = 17200;

  // Function to calculate total price with VAT and shipping
  const calculateTotal = (price: number): number => {
    const vatAmount = price * iva;
    return price + vatAmount + shippingCharge;
  };

  const { name, image, price = 0, _id } = service;

  // Handle booking form submission
  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      address: { value: string };
      phone: { value: string };
      date: { value: string };
    };

    const newBooking = {
      email: data?.user?.email,
      name: data?.user?.name,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
      productName: name,
      ProductID: _id,
      price,
    };

    try {
      const response = await axios.post<BookingResponse>(
        `${process.env.NEXTAUTH_URL}/checkout/api/new-booking`,
        newBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message); // Now you can safely access response.data
      form.reset();
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("There was an error with your booking.");
    }
  };

  useEffect(() => {
    loadService(); // Load service details on component mount
  }, [params]); // Include `params` in the dependency array to reload when `params` changes

  return (
    <div className="checkout-container flex flex-col md:flex-row max-w-6xl mx-auto mt-20 p-6 space-y-6 md:space-y-0 gap-8">
      <div className="flex flex-col space-y-4 md:w-2/3">
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6 hover:shadow-2xl transition-shadow duration-300">
          <Image
            src={image || "/default-image.jpg"} // Use a default image if `image` is missing
            alt={name || "Service Image"}
            width={96} // Set fixed width
            height={96} // Set fixed height
            className="rounded-lg object-cover border border-gray-200"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
            <p className="text-gray-500 text-sm">Disponible: En stock</p>
            <h3 className="text-lg text-blue-600 font-semibold mt-2">
              ${price}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 transition duration-200">
              -
            </button>
            <span className="text-lg font-semibold">1</span>
            <button className="p-2 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 transition duration-200">
              +
            </button>
            <button className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition duration-200">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-80 bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Resumen del pedido
        </h2>
        <div className="space-y-2">
          {data?.user?.name}
          {data?.user?.email}
          <hr />
          <p>
            Cantidad de producto - <span className="font-bold">$ {price}</span>
          </p>
          <p>
            IVA (19%) - <span className="font-bold">$ {price * iva}</span>
          </p>
          <p>
            Envío - <span className="font-bold">$ {shippingCharge}</span>
          </p>
          <p className="font-bold text-lg">
            Monto total: <span className="text-blue-600">$ {total}</span>
          </p>
        </div>
        <form onSubmit={handleBooking}>
          <input
            type="text"
            name="address"
            placeholder="Ingresa tu dirección"
            className="p-2 border rounded-md w-full mb-3"
          />
          <input
            type="text"
            name="phone"
            placeholder="Ingresa tu número de teléfono"
            className="p-2 border rounded-md w-full mb-3"
          />
          <input
            type="date"
            name="date"
            className="p-2 border rounded-md w-full mb-3"
          />
          <button
            type="submit"
            className="w-full p-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Realizar pedido
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToCart;
