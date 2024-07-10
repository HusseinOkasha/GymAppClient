import { useNavigate } from "react-router-dom";
enum ActionType {
  CREATE_OWNER_ACCOUNT,
  GET_ALL_OWNER_ACCOUNTS,
}

function OwnerAccountManagerComponent() {
  const navigate = useNavigate();

  let action: ActionType;

  const actionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    action = parseInt(event.target.value) as ActionType;
  };
  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (action == ActionType.CREATE_OWNER_ACCOUNT) {
      navigate("/owner-account-manager/create-owner-account");
    } else {
      navigate("/owner-account-manager/get-all-owners");
    }
  }

  return (
    <div className="mt-3">
      <div className="container d-flex justify-content-center mb-3">
        <header> Owner Account Manager</header>
      </div>
      <div className="container d-flex justify-content-center">
        <form className="row mb-3" onSubmit={onSubmitHandler}>
          <fieldset className="row mb-3">
            <label className="col-form-label col-m-2 pt-0">Actions</label>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value={ActionType.CREATE_OWNER_ACCOUNT}
                  onChange={actionChangeHandler}
                />
                <label className="form-check-label">Create owner account</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value={ActionType.GET_ALL_OWNER_ACCOUNTS}
                  onChange={actionChangeHandler}
                />
                <label className="form-check-label">
                  Get all owner accounts
                </label>
              </div>
            </div>
          </fieldset>

          <button type="submit" className="btn btn-secondary">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default OwnerAccountManagerComponent;
