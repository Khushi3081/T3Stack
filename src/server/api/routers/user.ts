import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  GetUserData,
  InsertUserData,
  InsertUserDataMutation,
  InsertUserDataMutationVariables,
} from "~/gql/graphql";
import { client } from "~/urql/urqlClientSeup";
import bcrypt from "bcrypt";
export const userRouter = createTRPCRouter({
  signInUser: publicProcedure
    .input(
      z.object({
        full_name: z.string().nonempty(),
        email: z.string().nonempty().email(),
        password: z
          .string()
          .nonempty()
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{8,}$/,
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character ",
          ),
      }),
    )
    .mutation(async (input: any) => {
      const userData = input.rawInput;
      const response = await client.mutation<
        InsertUserDataMutation,
        InsertUserDataMutationVariables
      >(InsertUserData, { object: userData });
      return response.data;
    }),

  loginUser: publicProcedure
    .input(
      z.object({
        full_name: z.string().nonempty(),
        password: z
          .string()
          .nonempty()
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{8,}$/,
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
          ),
      }),
    )
    .mutation(async (input) => {
      const userData = input.input;
      const response = await client.query(GetUserData, {
        full_name: { _similar: userData.full_name },
      });

      const result = await bcrypt.compare(
        userData.password,
        response.data.user_data[0].password,
      );
      return result;
    }),
});
