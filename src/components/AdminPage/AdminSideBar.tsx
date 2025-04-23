"use client";
import { signOut /*  useSession  */ } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MdCategory,
  MdDashboard,
  MdManageAccounts,
  MdMessage,
  MdOutlineAddShoppingCart,
  MdPayments,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { IoIosListBox, IoMdLogOut } from "react-icons/io";

const AdminSideBar = () => {
  /* const { data: session } = useSession(); */
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex-shrink-0 w-74 h-full bg-base-300">
      {/* <div className="flex flex-col items-center justify-center">
        {session && (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-40 rounded-full">
                  <Image
                    alt="Profile"
                    src={session.user?.image || "/default-profile.png"}
                    height="100"
                    width="100"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/admin/settings">Settings</Link>
                </li>
              </ul>
            </div>
            <div className="text-center mt-2">
              <p className="font-semibold">{session.user?.name}</p>
              <p className="text-sm text-gray-600">{session.user?.email}</p>
            </div>
          </>
        )}
      </div> */}

      <ul className="menu max-h-screen overflow-y-auto">
        <li>
          <Link
            href="/admin"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <MdDashboard className="mr-2 text-2xl text-sky-800" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/admin/profile"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <CgProfile className="mr-2 text-2xl text-sky-8S00" />
            Profile
          </Link>
        </li>

        <li>
          <Link
            href="/admin/productmanagement"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <IoIosListBox className="mr-2 text-2xl text-sky-800" />
            Products List
          </Link>
        </li>
        <li>
          <Link
            href="/admin/productmanagement"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <MdCategory className="mr-2 text-2xl text-sky-800" />
            Category
          </Link>
        </li>

        <li>
          <Link
            href="/admin/productmanagement"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <MdProductionQuantityLimits className="mr-2 text-2xl text-sky-800" />
            Product Management
          </Link>
        </li>
        <li>
          <Link
            href="/admin/addproduct"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <MdOutlineAddShoppingCart className="mr-2 text-2xl text-sky-800" />
            Add Product
          </Link>
        </li>
        <li>
          <Link
            href="/admin/user-managements"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <MdManageAccounts className="mr-2 text-2xl text-sky-800" />
            User Account
          </Link>
        </li>
        <li>
          <Link
            href="/admin/orderlist"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <GoListOrdered className="mr-2 text-2xl text-sky-800" />
            Order View
          </Link>
        </li>
        <li>
          <Link
            href="/admin/paymentrecord"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <MdPayments className="mr-2 text-2xl text-sky-800" />
            Payment Record
          </Link>
        </li>
        <li>
          <Link
            href="/admin/paymentrecord"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <MdMessage className="mr-2 text-2xl text-sky-800" />
            Meassage
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-red-700 hover:text-red-800 transition duration-300"
          >
            <IoMdLogOut className="mr-2 text-2xl text-red-500" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
