import { useState } from "react";

interface Credentials {
  username: string;
  password: string;
}

enum AccountType {
  OWNER = "owner",
  COACH = "coach",
  CLIENT = "client",
}

const Login = function () {
  /*
     States  
  */
  // state for username, and password
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  // state for the account type
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.OWNER
  );

  // state for error message
  const [errorMessage, setErrorMessage] = useState<string>("");

  // state isLoading: true incase we are waiting for response, false: incase we aren't waiting for response.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // variables
  let errorAlert = (
    <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  );

  /*
    Event Handlers  
  */
  // handles change in the username or password.
  function credentialsChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // updates the credentials state with the current credentials.
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  // handles change of the account type.
  function accountTypeChangeHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // updates the accountType state with the currently selected account type.
    setAccountType(event.target.value as AccountType);
  }

  // handles login form submit
  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
     * the url is created dynamically according to the account type
     * Incase of OWNER  => http://localhost:8080/api/login/owner"
     * Incase of COACH  => http://localhost:8080/api/login/coach"
     * Incase of CLIENT => http://localhost:8080/api/login/client"
     */
    const url = "http://localhost:8080/api/login/" + accountType;
    const options = {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + btoa(credentials.username + ":" + credentials.password),
      },
    };

    try {
      // update is loading state to disable the login button
      setIsLoading(true);
      const response = await fetch(url, options);
      setIsLoading(false);

      if (response.status === 401) {
        throw Error("Invalid credentials");
      }

      setErrorMessage("");
      console.log(await response.text());
    } catch (error) {
      setErrorMessage(error.message);
    }
    errorAlert = errorMessage ? (
      <div className="alert alert-secondary" role="alert">
        {errorMessage}
      </div>
    ) : (
      <></>
    );
  }
  //{errorMessage !== "" ? errorAlert : <></>}
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        {errorMessage && errorAlert}
        <div className="form-group">
          <label>Email address / phone number</label>
          <input
            name="username"
            className="form-control"
            id="username"
            placeholder="Enter email / phone number"
            onChange={credentialsChangeHandler}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={credentialsChangeHandler}
          />
        </div>
        <div>
          <p> Account Type </p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={AccountType.OWNER}
              onChange={accountTypeChangeHandler}
            />
            <label className="form-check-label">Owner</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value={AccountType.COACH}
              onChange={accountTypeChangeHandler}
            />
            <label className="form-check-label">Coach </label>
          </div>
          <div className="form-check">
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

        <button disabled={isLoading} type="submit" className="btn btn-primary">
          {isLoading ? "loading" : "login"}
        </button>
      </form>
    </>
  );
};

export default Login;
