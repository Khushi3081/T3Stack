import { ChangeEvent } from "react";
import clsx from "clsx";

import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label?: React.ReactNode;
  id?: Path<T>;
  type: string;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors | any;
  disabled?: boolean;
  placeholder?: string;
  style?: string;
  value?: string | number;
  readonly?: boolean;
  errorKey?: string;
  checked?: boolean;
  HandleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  HandleBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: Path<T>;
  isChatInput?: boolean;
  fixDecimal?: boolean;
  handleClick?: any;
}

const Input = <T extends FieldValues>({
  label,
  id,
  errors,
  register,
  type,
  disabled,
  required,
  placeholder,
  style,
  value,
  readonly,
  errorKey,
  HandleChange,
  HandleBlur,
  name,
  checked,
  isChatInput,
  fixDecimal,
  handleClick,
}: InputProps<T>) => {
  let errorMessage: { message: string } | undefined = undefined;
  if (Object.keys(errors).length) {
    if (errorKey) {
      const getError = (err: any, errorKeyArr: string[]): any => {
        const tempKeys = [...errorKeyArr];
        const currentKey = tempKeys.shift();

        if (err && currentKey) {
          if (tempKeys.length === 0) {
            return err[currentKey];
          }
          return getError(err[currentKey], tempKeys);
        }
        return;
      };

      errorMessage = getError(errors, errorKey.split("."));
    } else {
      errorMessage = errors[id];
    }
  }
  const handleDecimalValidation = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/[^\d.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/(\.[\d]{2})./g, "$1");
  };

  return (
    <>
      {label && (
        <>
          <label
            className={`${
              isChatInput
                ? "hidden"
                : "text-black mb-3 inline-block text-sm font-medium "
            }`}
            htmlFor={id}
          >
            {label && (
              <>
                {label} {required && <span className="text-red-600">*</span>}
              </>
            )}
          </label>
        </>
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name ? name : (id as Path<T>), {
          required,
          onChange: HandleChange
            ? (e) => {
                HandleChange(e);
              }
            : undefined,
          onBlur: HandleBlur ? (e) => HandleBlur(e) : undefined,
        })}
        defaultValue={value}
        readOnly={readonly}
        className={clsx(
          style
            ? style
            : `border-black/10 bg-white text-gray-900 placeholder:text-black/30 block w-full rounded-xl border px-4 py-3 text-sm leading-[22px] accent-primarycolor  placeholder:font-medium focus:outline-none focus:ring-0`,
          disabled && `cursor-default`,
        )}
        name={name ? name : id}
        checked={checked}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          if (fixDecimal) {
            handleDecimalValidation(e);
          }
        }}
        onClick={handleClick}
      />

      {errorMessage && errorMessage?.message ? (
        <small className="text-red-500 mt-1 block w-full text-sm font-semibold">
          {errorMessage?.message as string}
        </small>
      ) : null}
    </>
  );
};

export default Input;
