import { connection } from "../connection";

import {
  getUserByUserIdWithAddressTemplate,
  selectCountOfUsersTemplate,
  selectUsersWithAddressesTemplate,
} from "./query-templates";

import { User, UserAddress, UserWithAddressRow } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<UserWithAddressRow>(
      selectUsersWithAddressesTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }

        const usersMap = new Map<string, User>();

        results.forEach((row) => {
          if (!usersMap.has(row.id)) {
            const user: User = {
              id: row.id,
              name: row.name,
              username: row.username,
              email: row.email,
              phone: row.phone,
              address: null,
            };

            if (row.address_id !== null) {
              const address: UserAddress = {
                id: row.address_id,
                user_id: row.user_id!,
                street: row.street!,
                state: row.state!,
                city: row.city!,
                zipcode: row.zipcode!,
              };
              user.address = address;
            }

            usersMap.set(row.id, user);
          }
        });

        resolve(Array.from(usersMap.values()));
      }
    );
  });

export const getUserByUserId = (userId: string): Promise<User> =>
  new Promise((resolve, reject) => {
    connection.get<UserWithAddressRow>(
      getUserByUserIdWithAddressTemplate,
      [userId],
      (error, row) => {
        if (error) {
          reject(error);
          return;
        }

        if (!row) {
          reject(new Error("User not found"));
          return;
        }

        const user: User = {
          id: row.id,
          name: row.name,
          username: row.username,
          email: row.email,
          phone: row.phone,
          address: null,
        };

        if (row.address_id !== null) {
          const address: UserAddress = {
            id: row.address_id,
            user_id: row.user_id!,
            street: row.street!,
            state: row.state!,
            city: row.city!,
            zipcode: row.zipcode!,
          };
          user.address = address;
        }

        resolve(user);
      }
    );
  });
