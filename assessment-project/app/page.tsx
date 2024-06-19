"use client";

import React, { useState } from "react";
import InquiryForm, { FormData } from "./components/InquiryForm";
import Image from "next/image";

interface BranchInfo {
  name: string;
  address: string;
  phone: string;
  services: string[];
  zipCodes: string[];
}

const branches: Record<string, BranchInfo> = {
  MenloPark: {
    name: "MenloPark",
    address: "890 Santa Cruz Ave, Menlo Park, CA 94025",
    phone: "(650) 328-1001",
    services: ["Assisted Living", "Home Care"],
    zipCodes: ["94025", "94026"],
  },
  Campbell: {
    name: "Campbell",
    address: "419 E Hamilton Ave, Campbell, CA 95008",
    phone: "(844) 824-6480",
    services: ["Assisted Living", "Home Care"],
    zipCodes: [
      "95008",
      "95009",
      "95011",
      "95032",
      "95117",
      "95125",
      "95128",
      "95130",
    ],
  },
  SanMateo: {
    name: "San Mateo",
    address: "102 S El Camino Real, San Mateo, CA 94401",
    phone: "(844) 824-6480",
    services: ["Assisted Living", "Home Care"],
    zipCodes: ["94010", "94401", "94402", "94403", "94404", "94497"],
  },
  SanFrancisco: {
    name: "San Francisco",
    address: "50 California Street, Suite 1500, San Francisco, CA 94111",
    phone: "(650) 328-1001",
    services: ["Assisted Living", "Home Care"],
    zipCodes: [
      "94101",
      "94102",
      "94103",
      "94104",
      "94105",
      "94106",
      "94107",
      "94108",
      "94109",
      "94110",
      "94111",
      "94112",
      "94114",
      "94115",
      "94116",
      "94117",
      "94118",
      "9119",
      "94120",
      "94121",
      "94122",
      "94123",
      "94124",
      "94126",
      "94127",
      "94129",
      "94130",
      "94131",
      "94132",
      "94133",
      "94134",
      "94135",
      "94136",
      "94137",
      "94138",
      "94139",
      "94141",
      "94142",
      "94143",
      "94144",
      "94145",
      "94146",
      "94147",
      "94150",
      "94152",
      "94153",
      "94154",
      "94155",
      "94156",
      "94157",
      "94158",
      "94159",
      "94160",
      "94161",
      "94162",
      "94163",
      "94164",
      "94165",
      "94166",
      "94167",
      "94168",
      "94169",
      "94170",
      "94171",
      "94172",
      "94175",
      "94177",
      "94188",
      "94199",
    ],
  },
  PaloAlto: {
    name: "Palo Alto",
    address: "228 Hamilton Avenue, 3rd Floor, Palo Alto, CA 94301",
    phone: "(844) 824-6480",
    services: ["Assisted Living", "Home Care"],
    zipCodes: [
      "94020",
      "94022",
      "94024",
      "94028",
      "94301",
      "94302",
      "94303",
      "94304",
      "94306",
      "95033",
    ],
  },
  WalnutCreek: {
    name: "Walnut Creek",
    address: "2121 North California Blvd., Suite 290, Walnut Creek, CA 94596",
    phone: "(844) 824-6480",
    services: ["Assisted Living", "Home Care"],
    zipCodes: ["94507", "94518", "94521", "94595", "94596", "94597", "94598"],
  },
  SanJose: {
    name: "San Jose",
    address: "358 S Redwood Ave, San Jose, CA 95128",
    phone: "(844) 824-6480",
    services: ["Assisted Living", "Home Care"],
    zipCodes: [
      "95101",
      "95102",
      "95103",
      "95106",
      "95108",
      "95109",
      "95111",
      "95112",
      "95113",
      "95114",
      "95115",
      "95116",
      "95117",
      "95118",
      "95119",
      "95120",
      "95121",
      "95122",
      "95123",
      "95124",
      "95125",
      "95126",
      "95127",
      "95128",
      "95129",
      "95130",
      "95131",
      "95132",
      "95133",
      "95134",
      "95135",
      "95136",
      "95137",
      "95138",
      "95139",
      "95140",
      "95141",
      "95142",
      "95148",
      "95150",
      "95151",
      "95152",
      "95153",
      "95154",
      "95155",
      "95156",
      "95157",
      "95158",
      "95159",
      "95160",
      "95161",
      "95162",
      "95163",
      "95164",
      "95165",
      "95166",
      "95167",
      "95168",
      "95169",
      "95170",
      "95171",
      "95172",
      "95173",
    ],
  },
};

interface NearestBranch {
  branchName: string;
  branchInfo: BranchInfo;
}

const getNearestBranch = (zipCode: string): NearestBranch | null => {
  // Function to find the nearest branch based on zip code
  for (const branchKey in branches) {
    const branch = branches[branchKey];
    if (branch.zipCodes.includes(zipCode)) {
      return { branchName: branchKey, branchInfo: branch };
    }
  }
  return null;
};

const Home: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<
    (FormData & { nearestBranch: NearestBranch }) | null
  >(null);

  const handleFormSubmit = (formData: FormData) => {
    const nearestBranch = getNearestBranch(formData.zipCode);
    if (nearestBranch) {
      const data = { ...formData, nearestBranch };
      setSubmittedData(data);

      // Send data to webhook
      fetch("https://webhook.site/a3d2c3a0-0be4-4179-9915-14475a00af1e", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send data to webhook");
          }
          console.log("Data sent successfully to webhook:", data);
        })
        .catch((error) => {
          console.error("Error sending data to webhook:", error.message);
          // Handle error
        });
    } else {
      // Handle case where no branch matches the zip code
      console.error("No branch found for the zip code:", formData.zipCode);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-2 bg-[#FFD6BF] ">
      {!submittedData ? (
        <div className="flex flex-col max-w-md text-black w-full space-y-8 p-10 bg-white rounded-xl shadow-lg lg:w-1/2 ">
          <Image
            className="justify-center items-center"
            src="/images/CareIndeed_Logo.png"
            alt="Care Indeed Logo"
            height={100}
            width={100}
          />
          <h3 className="mt-6 text-center text-xl font-semibold text-[#993B00]">
            Inquiry Form
          </h3>
          <InquiryForm onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <div className="max-w-md text-[#993B00] w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#027073] ">
            Hey, {submittedData.name}!
          </h2>
          <p>These services are available around your area!</p>
          <p>{submittedData.staffingType.join(", ")}</p>
          <p>
            Inquire in our {submittedData.nearestBranch.branchName} Branch
            located at {submittedData.nearestBranch.branchInfo.address}
          </p>
          <p>or</p>
          <p className=" text-[#027073]">
            <strong>Call:</strong>{" "}
            {submittedData.nearestBranch.branchInfo.phone}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
