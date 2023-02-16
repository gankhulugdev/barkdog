import "./App.css";
import React, { useReducer } from "react";
import Dog from "./components/dogs";

export const ACTIONS = {
  NEUTERED_SPRAYED: "neuteredSprayed",
  BANNED: "banned",
  MEMBERSHIP: "memberShip",
  VACCINATION: "vaccination",
};

const reducer = (curr, action) => {
  console.log(action);

  switch (action.type) {
    case ACTIONS.NEUTERED_SPRAYED:
      return {
        ...curr,
        ownerDogs: curr.ownerDogs.map((dog) => {
          return dog.id === action.data
            ? { ...dog, requireNeuteredSpayed: !dog.requireNeuteredSpayed }
            : dog;
        }),
      };
    case ACTIONS.BANNED:
      return {
        ...curr,
        ownerDogs: curr.ownerDogs.map((dog) => {
          return dog.id === action.data
            ? { ...dog, isBanned: !dog.isBanned }
            : dog;
        }),
      };
    case ACTIONS.MEMBERSHIP:
      return {
        ...curr,
        ownerDogs: curr.ownerDogs.map((dog) => {
          return dog.id === action.data
            ? {
                ...dog,
                subscription: {
                  ...dog.subscription,
                  status:
                    dog.subscription.status === "Active"
                      ? "Inactive"
                      : "Active",
                },
              }
            : dog;
        }),
      };
    case ACTIONS.VACCINATION:
      return {
        ...curr,
        ownerDogs: curr.ownerDogs.map((dog) => {
          return dog.id === action.data.dogId
            ? {
                ...dog,
                vaccinations: dog.vaccinations.map((v) => {
                  return v.vaccinationId === action.data.vaccinationId
                    ? {
                        ...v,
                        status:
                          v.status === "Verified" ? "Expired" : "Verified",
                      }
                    : v;
                }),
              }
            : dog;
        }),
      };
    default:
      return curr;
  }
};

function App() {
  const [dogs, updateDogs] = useReducer(reducer, {
    ownerInfo: null,
    ownerDogs: [
      {
        id: 31,
        name: "Chika",
        ownerId: 4,
        ownerName: "Badi Owner",
        imageUrl: "https://bark-backend.azurewebsites.net/api/dog/image/517",
        dob: "2018-05-19T00:00:00",
        freeGroupId: null,
        isBanned: true,
        requireNeuteredSpayed: false,
        breed: "Affen Border Terrier",
        vaccinations: [
          {
            vaccinationId: 4,
            vaccinationName: "Distemper",
            status: "Verified",
          },
          {
            vaccinationId: 6,
            vaccinationName: "Influenza",
            status: "Verified",
          },
          {
            vaccinationId: 7,
            vaccinationName: "Leptospirosis",
            status: "Verified",
          },
        ],
        subscription: {
          id: 54,
          membershipName: "Annual Membership",
          status: "Active",
          statusDescription: "active",
          note: "stripe",
          paymentMethod: null,
          isExpired: false,
          expireDate: null,
        },
        status: "Red",
      },
      {
        id: 108,
        name: "Snoopy",
        ownerId: 4,
        ownerName: "Badi Owner",
        imageUrl: "https://bark-backend.azurewebsites.net/api/dog/image/460",
        dob: "2023-01-04T00:00:00",
        freeGroupId: 20,
        isBanned: false,
        requireNeuteredSpayed: true,
        breed: "Adronicus Mastiff",
        vaccinations: [
          {
            vaccinationId: 4,
            vaccinationName: "Distemper",
            status: "Verified",
          },
          { vaccinationId: 6, vaccinationName: "Influenza", status: "Missing" },
          {
            vaccinationId: 7,
            vaccinationName: "Leptospirosis",
            status: "Expired",
          },
        ],
        subscription: null,
        status: "Red",
      },
      {
        id: 118,
        name: "Banhar",
        ownerId: 4,
        ownerName: "Badi Owner",
        imageUrl: "https://bark-backend.azurewebsites.net/api/dog/image/555",
        dob: "2023-01-10T00:00:00",
        freeGroupId: null,
        isBanned: false,
        requireNeuteredSpayed: true,
        breed: "Adronicus Mastiff",
        vaccinations: [
          {
            vaccinationId: 4,
            vaccinationName: "Distemper",
            status: "Verified",
          },
          {
            vaccinationId: 6,
            vaccinationName: "Influenza",
            status: "Verified",
          },
          {
            vaccinationId: 7,
            vaccinationName: "Leptospirosis",
            status: "Verified",
          },
        ],
        subscription: {
          id: 65,
          membershipName: "Annual Membership",
          status: "Inactive",
          statusDescription: "active",
          note: "234",
          paymentMethod: null,
          isExpired: false,
          expireDate: null,
        },
        status: "Brown",
      },
    ],
  });
  return (
    <div className="App" style={{ display: "flex", padding: "15px" }}>
      {dogs.ownerDogs.map((dog, idx) => {
        return <Dog updateDogs={updateDogs} dog={dog} key={idx} />;
      })}
    </div>
  );
}

export default App;

// functionality requirements:
/**
 * 1. When clicked on the red "x" in circles, it should change it to green
 */

/**
 * Colors:
 * status red: #e3e8ee
 * status blue: #d6ecff
 * times red: #ec4758
 * check green: #1ab394
 * text-color: #337ab7
 * bg-secondary: #e7eaec
 */
