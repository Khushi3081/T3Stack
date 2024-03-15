import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/Input";
import { Button } from "../components/Button";
import passwordHidden from "../../../public/password-hidden.svg";
import passwordShow from "../../../public/password-vissibles.svg";
import bcrypt from "bcryptjs";
import { useQuery } from "urql";
import { GetUserData } from "~/gql/graphql";
import { api } from "~/utils/api";

const Login = () => {
  interface LoginInterface {
    id: any;
    updated_at: Date;
    created_at: Date;
    email: string;
    password: string;
    full_name: string;
  }
  const router = useRouter();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [viewPassword, setPassword] = useState<boolean>(false);
  const [pauseFlag, setPauseFlag] = useState<boolean>(false);
  const executeMutation = api.user.loginUser.useMutation();

  const schema = z.object({
    full_name: z.string().nonempty(),
    password: z
      .string()
      .nonempty()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{8,}$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<LoginInterface>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const formValues = watch();

  const handleSignUp = async () => {
    try {
      setButtonLoader(true);
      setPauseFlag(false);
      await executeMutation.mutate(formValues);
      if (executeMutation) {
        router.push("/dashboard");
      } else {
        setError("password", { message: "Password does not match" });
      }
      setButtonLoader(false);
    } catch (error) {
      console.log(error);
      setButtonLoader(false);
    }
  };

  return (
    <div className="before:bg-bg-Gradient relative w-full before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:bg-cover before:bg-left-top before:bg-no-repeat before:content-['']">
      <div className="mt-76px md:mt-85px container mx-auto flex p-5 py-16 md:py-24 lg:py-36 xl:py-32">
        <div className="rounded-20px  shadow-primary-shadow bg-white mx-auto flex w-full sm:w-3/4">
          <div className="xxl:p-30px w-full p-5 sm:p-8  xl:w-1/2 xl:p-5 xl:pl-3 ">
            <div className="min-h-400px sm:min-h-360px bg-white relative w-full xl:h-full ">
              <h2 className="text-26px text-center font-bold text-darkgrey ">
                {"Login"}
              </h2>
              <form
                className="mt-5 space-y-4 md:space-y-6 lg:mt-8"
                onSubmit={handleSubmit(handleSignUp)}
              >
                <div className="relative">
                  <Input
                    errors={errors}
                    id="full_name"
                    register={register}
                    type="text"
                    placeholder={"Enter Username"}
                    style="bg-white border border-black/10 focus:ring-0 focus:outline-none text-gray-900 placeholder:text-black/30 placeholder:font-medium text-sm rounded-xl block w-full py-3 leading-6 px-4 "
                    required={true}
                    label={"Username"}
                  />
                </div>

                <div className="relative">
                  <Input
                    errors={errors}
                    id="password"
                    register={register}
                    type={"text"}
                    placeholder="••••••••"
                    style="bg-white border border-black/10 focus:ring-0 focus:outline-none text-gray-900 placeholder:text-black/30 placeholder:font-medium text-sm rounded-xl block w-full py-3 leading-6 px-4 "
                    required={true}
                    label={"Password"}
                  />
                </div>

                <div className="!mt-8 w-full xl:!mt-8">
                  <Button
                    loader={buttonLoader}
                    text={"Login"}
                    type="submit"
                    onClick={handleSignUp}
                    className="bg-white hover:text-white w-full rounded-xl border-2 border-secondaryOrange px-5 py-2 text-center text-sm font-bold text-darkgreen text-darkgreen hover:bg-secondaryOrange focus:outline-0 focus:ring-0 md:py-3"
                  ></Button>
                </div>

                <div className="mt-5">
                  <p className="text-black text-center text-sm font-normal">
                    {"Don't have an Account?"}
                    <span
                      className="ml-1 cursor-pointer font-semibold text-primarycolor rtl:ml-1 rtl:mr-1"
                      onClick={() => router.push("/signup")}
                    >
                      {" "}
                      {"sign up"}
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
