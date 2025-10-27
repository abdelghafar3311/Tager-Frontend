import { env } from "./env";

const base = env.API_URL;

// 🟢 Auth
export const AuthRoutes = {
  customer: {
    register: `${base}/api/auth/register`,
    login: `${base}/api/auth/login`,
  },
  owner: {
    register: `${base}/api/owner/auth/register`,
    login: `${base}/api/owner/auth/login`,
  },
};

// 🟢 Customer
export const CustomerRoutes = {
  update: `${base}/api/customer/update`,
  get: `${base}/api/customer/get`,
  profile: {
    add: `${base}/api/customer/profile/add`,
    get: `${base}/api/customer/profile`,
    update: `${base}/api/customer/profile/update`,
    delete: `${base}/api/customer/profile/delete`,
    avatar: {
      upload: `${base}/api/customer/profile/image/upload`,
      delete: `${base}/api/customer/profile/image/delete`,
    },
  },
};

// 🟢 Money
export const MoneyRoutes = {
  push: `${base}/api/money/control/push`,
  update: `${base}/api/money/control/update`,
};

// 🟢 Buys
export const BuysRoutes = {
  buyProduct: `${base}/api/buys/product`,
  buyProducts: `${base}/api/buys/products`,
};

// 🟢 Sells
export const SellsRoutes = {
  sellProduct: (id: string) => `${base}/api/sells/${id}`,
  sellProducts: `${base}/api/sells/count`,
};

// 🟢 Products
export const ProductRoutes = {
  getAll: `${base}/api/product/route`,
  getById: (id: string) => `${base}/api/product/route/${id}`,
  update: (id: string) => `${base}/api/product/route/${id}`,
  search: `${base}/api/product/route/search`,
  delete: (id: string) => `${base}/api/delete_product/${id}`,
};

// 🟢 Reports
export const ReportRoutes = {
  getAll: `${base}/api/report`,
  deleteAll: `${base}/api/report/delete`,
};

// 🟢 Owner
export const OwnerRoutes = {
  update: `${base}/api/owner/update`,
  get: `${base}/api/owner/get`,
  profile: {
    add: `${base}/api/owner/profile/add`,
    get: `${base}/api/owner/profile`,
    update: `${base}/api/owner/profile/update`,
    delete: `${base}/api/owner/profile/delete`,
    avatar: {
      upload: `${base}/api/owner/profile/image/upload`,
      delete: `${base}/api/owner/profile/image/delete`,
    },
  },
};

// 🟢 Area
export const AreaRoutes = {
  create: `${base}/api/owner/area/create`,
  getAll: `${base}/api/owner/area?q`,
  getOne: (id: string) => `${base}/api/owner/area/one/${id}`,
  update: (id: string) => `${base}/api/owner/area/update/${id}`,
  delete: (id: string) => `${base}/api/owner/area/delete/${id}`,
};

// 🟢 Room
export const RoomRoutes = {
  create: `${base}/api/room/create`,
  getOwnerRooms: `${base}/api/room/owner/rooms`,
  getOneFromOwner: (id: string) => `${base}/api/room/owner/rooms/${id}`,
  getCustomerRooms: `${base}/api/room/customer/rooms`,
  update: (id: string) => `${base}/api/room/update/${id}`,
  delete: (id: string) => `${base}/api/room/delete/${id}`,
};

// 🟢 Rental
export const RentalRoutes = {
  create: `${base}/api/rental/sug-subscript`,
  getAll: `${base}/api/rental`,
  getRequests: `${base}/api/rental/request`,
  updateSubscription: (id: string) =>
    `${base}/api/rental/updateSubscription/${id}`,
  acceptOrReject: (id: string) => `${base}/api/rental/request/${id}`,
  deleteCustomer: (id: string) =>
    `${base}/api/rental/delete_subscription/${id}`,
  deleteOwner: (id: string) => `${base}/api/rental/owner/delete/${id}`,
};

// 🟢 Notifications
export const NotificationRoutes = {
  getAll: `${base}/api/notify/get`,
  delete: `${base}/api/notify/delete`,
  read: `${base}/api/notify/read`,
};

// Transfer money
export const TransferMoneyRoutes = {
  transfer: `${base}/api/money/transfer`,
};
