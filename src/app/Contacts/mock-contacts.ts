import { ContactInterface } from "./contact.interface";

export const CONTACTS: ContactInterface[] = [
  {
    _id: "c1a9f3b2",
    name: "Alice Johnson",
    phoneNumber: 9876543210,
    tags: ["Lead", "Important"],
    workspaceId: "w1",
    createdBy: "u1"
  },
  {
    _id: "c2b7d5e4",
    name: "Brian Smith",
    phoneNumber: 9123456780,
    tags: ["Prospect"],
    workspaceId: "w1",
    createdBy: "u1"
  },
  {
    _id: "c3c6a7f8",
    name: "Carla Mendes",
    phoneNumber: 9988776655,
    tags: ["Client", "VIP"],
    workspaceId: "w2",
    createdBy: "u2"
  },
  {
    _id: "c4d8b9a1",
    name: "David Lee",
    phoneNumber: 9871234560,
    tags: ["Lead"],
    workspaceId: "w2",
    createdBy: "u2"
  },
  {
    _id: "c5e2f3c4",
    name: "Emily Clark",
    phoneNumber: 9765432109,
    tags: ["Prospect", "Follow-up"],
    workspaceId: "w1",
    createdBy: "u1"
  },
  {
    _id: "c6f4a5d6",
    name: "Frank Turner",
    phoneNumber: 9654321789,
    tags: ["Client"],
    workspaceId: "w2",
    createdBy: "u2"
  }
];

 