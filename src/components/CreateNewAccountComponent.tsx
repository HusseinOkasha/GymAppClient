import { useRef, useState } from "react";

enum AccountType {
  OWNER = "owner",
  COACH = "coach",
  CLIENT = "client",
}

interface Feedbacks {
  firstName: string;
  secondName: string;
  thirdName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
}

function CreateNewAccountComponent() {
  const [feedbacks, setFeedbacks] = useState<Feedbacks>({
    firstName: "",
    secondName: "",
    thirdName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
  });

  /**
   * States
   *
   */
  // state for the account type
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.OWNER
  );

  // state for error message
  const [errorMessage, setErrorMessage] = useState<string>("");

  //state for success message
  const [successMessage, setSuccessMessage] = useState<string>("");

  // state isLoading: true incase we are waiting for response, false: incase we aren't waiting for response.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Refs
   */
  const firstNameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const secondNameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const thirdNameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const emailRef: React.RefObject<HTMLInputElement> = useRef(null);
  const phoneNumberRef: React.RefObject<HTMLInputElement> = useRef(null);
  const passwordRef: React.RefObject<HTMLInputElement> = useRef(null);
  const confirmPasswordRef: React.RefObject<HTMLInputElement> = useRef(null);
  const birthDateRef: React.RefObject<HTMLInputElement> = useRef(null);

  /**
   * Event Handlers
   */

  // handles change of the account type.
  function accountTypeChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // updates the accountType state with the currently selected account type.
    setAccountType(event.target.value as AccountType);
  }

  // handles changes on the firstName input field
  function firstNameChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      setFeedbacks({ ...feedbacks, firstName: "first name is required" });
    } else {
      setFeedbacks({ ...feedbacks, firstName: "" });
    }
  }

  // handles changes on the secondName input field
  function secondNameChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      setFeedbacks({ ...feedbacks, secondName: "second name is required" });
    } else {
      setFeedbacks({ ...feedbacks, secondName: "" });
    }
  }

  // handles changes on the thirdName input field
  function thirdNameChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      setFeedbacks({ ...feedbacks, thirdName: "third name is required" });
    } else {
      setFeedbacks({ ...feedbacks, thirdName: "" });
    }
  }

  // handles changes on the email input field
  function emailChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      setFeedbacks({ ...feedbacks, email: "email is required" });
    } else {
      setFeedbacks({ ...feedbacks, email: "" });
    }
  }

  // handles changes on the phoneNumber input field
  function phoneNumberChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.value.length === 0) {
      setFeedbacks({ ...feedbacks, phoneNumber: "phone number is required" });
    } else {
      setFeedbacks({ ...feedbacks, phoneNumber: "" });
    }
  }

  // handles changes on the password input field
  function passwordChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      setFeedbacks({ ...feedbacks, password: "password is required" });
    } else {
      setFeedbacks({ ...feedbacks, password: "" });
    }
  }

  // handles changes on the confirmPassword input field
  function confirmPasswordChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const confirmPassword: string = event.target.value;
    if (confirmPassword.length === 0) {
      setFeedbacks({
        ...feedbacks,
        confirmPassword: "confirm password is required",
      });
    } else if (confirmPassword !== passwordRef.current?.value) {
      setFeedbacks({ ...feedbacks, confirmPassword: "passwords must match" });
    } else {
      setFeedbacks({ ...feedbacks, confirmPassword: "" });
    }
  }

  // handles changes on the birth date input field
  function birthDateChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length === 0) {
      setFeedbacks({ ...feedbacks, birthDate: "birth date is required" });
    } else {
      setFeedbacks({ ...feedbacks, birthDate: "" });
    }
  }

  // It handles the submission of create account form.
  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
     * the url is created dynamically according to the account type
     * Incase of OWNER  => http://localhost:8080/api/owner-account-manager"
     * Incase of COACH  => http://localhost:8080/api/coach-account-manager"
     * Incase of CLIENT => http://localhost:8080/api/client-account-manager"
     */
    const url = `http://localhost:8080/api/${accountType}-account-manager`;
    const isClientAccount = accountType === AccountType.CLIENT;
    const newAccountAttributes = {
      firstName: firstNameRef.current?.value,
      secondName: secondNameRef.current?.value,
      thirdName: thirdNameRef.current?.value,
      email: emailRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
      password: passwordRef.current?.value,
    };
    const body = isClientAccount
      ? {
          createAccountDto: { ...newAccountAttributes },
          birthDate: birthDateRef.current?.value,
        }
      : { ...newAccountAttributes };
    const accessToken =
      "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiMiIsImV4cCI6MTcyMTIxNzIyMywiaWF0IjoxNzIxMjEzNjIzLCJzY29wZSI6Ik9XTkVSIn0.XcItRwAUqP620zuxrMFJ3Dy5BbVFLXqVi0MC1dE5EyyAzGugjmZq9Zo4dMDzYjEAreonkwOePerRHbSFWYcaQHXlSoirBy2tWeWafk0R3oLcebzvUnS5a1BPDTcwdt4NmXxLA9qsm3Tas_lxGap8m-NFT22ZbzL-ML8K3M5d3HRMXWVOfXbfj5lvc7xJPprMxHqiKQAqyUrNISAaS9lanx89CfV6GYykqZ7ZA7PLB6dyofHOm8qDhrXJgnnx5fuFQVOmKGGxkh7dt-AHJJVkuuhP3zGhkKbRW_bE0sJipVHAEG_zA9Wdqb23f6DoESqWREOh4BjUHKQIaQzxv93J8A";
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    };

    try {
      // update is loading state to disable the login button
      setIsLoading(true);
      setSuccessMessage("");
      setErrorMessage("");
      const response = await fetch(url, options);

      if (response.status === 401) {
        throw Error("Please, login and try again");
      }
      if (response.status === 403) {
        throw Error(
          "You are unauthorized to create account of type " + accountType
        );
      }
      setSuccessMessage(accountType + " is created sucessfully");
      setErrorMessage("");

      console.log(await response.text());
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1> Create new Account </h1>
      </div>
      <div className="row justify-content-center my-1">
        <form className="col-xl-6" onSubmit={onSubmitHandler}>
          {errorMessage && (
            <div className="alert alert-danger "> {errorMessage}</div>
          )}
          {successMessage && (
            <div className="alert alert-success"> {successMessage}</div>
          )}
          <div className="row my-2">
            <div className="col">
              <label>Account Type</label>
            </div>
            <div className="col">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                value={AccountType.OWNER}
                onChange={accountTypeChangeHandler}
              />
              <label className="form-check-label">Owner</label>
            </div>
            <div className="col">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                value={AccountType.COACH}
                onChange={accountTypeChangeHandler}
              />

              <label className="form-check-label">Coach </label>
            </div>
            <div className="col">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                value={AccountType.CLIENT}
                onChange={accountTypeChangeHandler}
              />
              <label className="form-check-label">Client </label>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label>First name</label>
              <input
                name="firstname"
                className="form-control"
                id="firstname"
                placeholder="first name"
                ref={firstNameRef}
                onChange={firstNameChangeHandler}
              />
              {feedbacks.firstName && (
                <p className="text-danger">{feedbacks.firstName}</p>
              )}
            </div>
            <div className="col-4">
              <label>Second name</label>
              <input
                name="secondname"
                className="form-control"
                id="secondname"
                placeholder="second name"
                ref={secondNameRef}
                onChange={secondNameChangeHandler}
              />
              {feedbacks.secondName && (
                <p className="text-danger">{feedbacks.secondName}</p>
              )}
            </div>
            <div className="col-4">
              <label>Third name</label>
              <input
                name="thirdname"
                className="form-control"
                id="thirdname"
                placeholder="third name"
                ref={thirdNameRef}
                onChange={thirdNameChangeHandler}
              />
              {feedbacks.thirdName && (
                <p className="text-danger">{feedbacks.thirdName}</p>
              )}
            </div>
          </div>

          <label>Email</label>
          <input
            name="email"
            className="form-control"
            id="email"
            placeholder="email"
            type="email"
            ref={emailRef}
            onChange={emailChangeHandler}
          />
          {feedbacks.email && <p className="text-danger">{feedbacks.email}</p>}

          <label>Phone number</label>
          <input
            name="Phone number"
            className="form-control"
            id="phoneNumber"
            placeholder="phone number"
            ref={phoneNumberRef}
            onChange={phoneNumberChangeHandler}
          />
          {feedbacks.phoneNumber && (
            <p className="text-danger">{feedbacks.phoneNumber}</p>
          )}

          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            ref={passwordRef}
            onChange={passwordChangeHandler}
          />
          {feedbacks.password && (
            <p className="text-danger">{feedbacks.password}</p>
          )}

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            className="form-control"
            id="confirmPassword"
            placeholder="re-enter password"
            ref={confirmPasswordRef}
            onChange={confirmPasswordChangeHandler}
          />
          {feedbacks.confirmPassword && (
            <p className="text-danger">{feedbacks.confirmPassword}</p>
          )}

          {accountType == AccountType.CLIENT && (
            <>
              <label>Birth Date</label>
              <input
                type="date"
                name="birth_date"
                className="form-control"
                id="birth_date"
                ref={birthDateRef}
                onChange={birthDateChangeHandler}
              />

              {feedbacks.birthDate && (
                <p className="text-danger">{feedbacks.birthDate}</p>
              )}
            </>
          )}

          <button
            disabled={isLoading}
            type="submit"
            className="my-1 btn btn-secondary"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewAccountComponent;
