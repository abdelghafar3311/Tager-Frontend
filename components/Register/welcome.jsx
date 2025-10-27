"use client";
// react
import { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

// styles && UI
import styles from "./Register.module.scss";
import Btn from "../../UI/BTN/Btn";
import Inp from "@/UI/input/Inp";
export default function WelcomeComponent() {
  const [choose, setChoose] = useState({
    owner: false,
    customer: true,
  });
  return (
    <div className="p-12">
      <h1 className="text-[36px] font-extrabold text-[#097] text-center">
        Create Account As
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 h-[60vh] justify-around items-center">
        <div
          onClick={() => setChoose({ owner: false, customer: true })}
          className={`${styles.choose} ${
            choose.customer ? styles.active : ""
          } text-[16px] w-[90%] lg:w-[40%] lg:text-[36px]`}
        >
          Customer
        </div>
        <div
          onClick={() => setChoose({ owner: true, customer: false })}
          className={`${styles.choose} ${
            choose.owner ? styles.active : ""
          } text-[16px] w-[90%] lg:w-[40%] lg:text-[36px]`}
        >
          Owner
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          href={
            choose.customer
              ? "/Auth/Register/re-customer"
              : "/Auth/Register/re-owner"
          }
        >
          <Btn isLight className="">
            Next{">>"}
          </Btn>
        </Link>
      </div>
    </div>
  );
}
